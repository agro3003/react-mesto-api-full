import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouter = ({component: Comment, ...props}) => {

  return(
    <Route>
      { () => props.loggedIn ? <Comment {...props} /> : <Redirect to = './sing-in' /> }
    </Route>
  )
}

export default ProtectedRouter;