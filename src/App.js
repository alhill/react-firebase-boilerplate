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
} from './components'

import {
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
import firebase from 'firebase'


const App = () => {
  const [authUser, setAuthUser] = useState(null)

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTO_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  }

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => { 
      if(u){
        setAuthUser(u)
        localStorage.setItem("auth", JSON.stringify(u))
      }
      else{
        setAuthUser(null) 
        localStorage.setItem("auth", null)
      }
    })
  }, [])

  return (
    <ConfigProvider locale={esES}>
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
    </ConfigProvider>
  );
}

export default App;
