import { useFetchUser } from '../lib/user';

const Test = () => {
  const { user, loading } = useFetchUser({ required: true });

  return <div>{user && user.nickname}</div>;
};

export default Test;
