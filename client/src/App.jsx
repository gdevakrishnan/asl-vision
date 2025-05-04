import React, { Fragment, useEffect } from 'react'
import Routers from './router/Routers'
import { useUser } from '@clerk/clerk-react'

const App = () => {
  const { user, isSignedIn } = useUser();

  useEffect (() => {
    isSignedIn && user && console.log(user);
  }, [user, isSignedIn]);

  return (
    <Fragment>
      <Routers />
    </Fragment>
  )
}

export default App