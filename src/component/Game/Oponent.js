import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Oponent = ({ stateToSubscribe }) => {
  const playerData = useSelector(stateToSubscribe);

  useEffect(() => {
    console.log(playerData, 'playerData');
  }, [playerData]);

  return (
    <div>
      <div>{playerData.key}</div>
      <div>{playerData.current_word}</div>
    </div>
  );
};

export default Oponent;
