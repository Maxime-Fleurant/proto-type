import * as Colyseus from 'colyseus.js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  keyStroke,
  addPlayer,
  removePlayer,
  players,
  addMainPlayer,
  processOpponentInput,
  p1,
  p2,
  p3,
  p4,
  mainPlayer,
  gameState,
  addText,
  updateRoomStatus,
} from '../component/Game/gameSlice';
import Oponent from '../component/Game/Oponent';

const stateMap = { p1, p2, p3, p4 };

const Splash = () => {
  const [room, setRoom] = useState<any>();

  const dispatch = useDispatch();
  const playersRedux = useSelector(players);
  const mainPlayerRedux = useSelector(mainPlayer);
  const gameStateRedux = useSelector(gameState);

  useEffect(() => {
    const client = new Colyseus.Client('ws://localhost:2567');

    const matchRoom = async () => {
      const myId = Math.round(Math.random() * 100).toString();

      const myRoom = await client.joinOrCreate('my_room', {
        client_id: myId,
        name: 'userName',
      });

      myRoom.state.listen('text', (data) => {
        dispatch(addText([...data]));
      });

      myRoom.state.listen('room_status', (data) => {
        dispatch(updateRoomStatus(data));
      });

      myRoom.state.players.onAdd = (player, key) => {
        if (player.dbId !== myId) {
          dispatch(
            addPlayer({
              key,
              name: player.name,
              dbId: player.dbId,
              current_word: player.current_word,
              badType: player.badType,
            }),
          );
        } else {
          dispatch(
            addMainPlayer({
              key,
              name: player.name,
              dbId: player.dbId,
              current_word: player.current_word,
              badType: player.badType,
            }),
          );
        }

        player.onChange = (changes) => {
          if (player.dbId !== myId) {
            dispatch(processOpponentInput({ key, input: player.current_word, badType: player.badType }));
          }
        };
      };

      myRoom.state.players.onRemove = (player, key) => {
        dispatch(removePlayer(key));
      };

      setRoom(myRoom);
    };

    matchRoom();
  }, []);

  useEffect(() => {
    const keyHandler = (event) => {
      const { key } = event;
      room.send('input', key);
      dispatch(keyStroke(key));
    };

    if (gameStateRedux === 'ready') {
      window.addEventListener('keydown', keyHandler);
    }

    if (gameStateRedux === 'finished') {
      window.removeEventListener('keydown', keyHandler);
    }

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [gameStateRedux]);

  const playersDom = Object.entries(playersRedux)
    .filter((el) => el[1])
    .map((currentPlayer) => {
      return <Oponent key={currentPlayer[0]} stateToSubscribe={stateMap[currentPlayer[0]]} />;
    });

  return (
    <div>
      <div>{gameStateRedux}</div>
      <div>{mainPlayerRedux.key}</div>
      <div>{mainPlayerRedux.current_word}</div>
      <div>OPONENT</div>
      <div>{playersDom}</div>
    </div>
  );
};

export default Splash;
