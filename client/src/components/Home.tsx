import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import AuthNav from './Authentication/auth-nav';

const Home = (): React.ReactElement => {
  const {user} = useAuth0();
  const {name} = user;
  return (
    <>
      <h3>Welcome {name}</h3>
      <AuthNav />
    </>
  );
};

export default Home;
