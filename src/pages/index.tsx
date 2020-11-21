import * as Colyseus from 'colyseus.js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addPlayer,
  removePlayer,
  players,
  addMainPlayer,
  processOpponentInput,
  p1,
  p2,
  p3,
  p4,
} from '../component/Game/gameSlice';
import Oponent from '../component/Game/Oponent';

const stateMap = { p1, p2, p3, p4 };

const Splash = () => {
  const [room, setRoom] = useState<any>();

  const dispatch = useDispatch();
  const playersRedux = useSelector(players);

  useEffect(() => {
    const client = new Colyseus.Client('ws://localhost:2567');

    const matchRoom = async () => {
      const myId = Math.round(Math.random() * 100).toString();

      const myRoom = await client.joinOrCreate('my_room', {
        client_id: myId,
        name: 'userName',
      });

      myRoom.state.players.onAdd = (player, key) => {
        if (player.dbId !== myId) {
          dispatch(addPlayer({ key, name: player.name, dbId: player.dbId, current_word: player.current_word }));
        } else {
          dispatch(addMainPlayer({ key, name: player.name, dbId: player.dbId, current_word: player.current_word }));
        }

        player.onChange = (changes) => {
          if (player.dbId !== myId) {
            dispatch(processOpponentInput({ key, input: player.current_word }));
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

  const handler = () => {
    room.send('input', 'a');
  };

  const playersDom = Object.entries(playersRedux)
    .filter((el) => el[1])
    .map((currentPlayer) => {
      return <Oponent key={currentPlayer[0]} stateToSubscribe={stateMap[currentPlayer[0]]} />;
      console.log(currentPlayer);
    });

  return (
    <div>
      <button onClick={handler}>dd</button>
      <div>{playersDom}</div>
    </div>
  );
};

export default Splash;
