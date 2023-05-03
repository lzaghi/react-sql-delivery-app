import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  useEffect(() => {
    history.push('/login');
  }, [history]);

  return (
    <div>Loading...</div>
  );
}

export default Home;
