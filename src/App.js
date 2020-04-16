import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import "./App.css";
import "antd/dist/antd.css";
import { ConfigProvider } from 'antd';
import esES from 'antd/es/locale/es_ES';
// eslint-disable-next-line
import momentLocale from 'moment/locale/es';

import {
  Header,
  Firebase
} from './components'

import {
  FirebaseContext,
  UserContext
} from './context'

import {
  Home,
  Login,
  Logout,
  ForgotPassword,
  Register,
  NotFound
} from './screens'
import PrivateRoute from './components/PrivateRoute';
import PrivatePage from './screens/PrivatePage';

const firebase = new Firebase()

const App = () => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => { u ? setAuthUser(u) : setAuthUser(null) })
  }, [])

  return (
    <ConfigProvider locale={esES}>
      <FirebaseContext.Provider value={firebase}>
        <UserContext.Provider value={authUser}>
          <BrowserRouter>
            <Header authUser={authUser} />
            <Switch>
              <PrivateRoute path="/private" component={PrivatePage} exact />
              <Route path="/auth/login" component={Login} exact />
              <Route path="/auth/logout" component={Logout} exact />
              <Route path="/auth/forgot-password" component={ForgotPassword} exact />
              <Route path="/auth/register" component={Register} exact />
              <Route path="/" component={Home} exact />
              <Route path="" component={NotFound} />
            </Switch>
          </BrowserRouter>
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </ConfigProvider>
  );
}

export default App;
