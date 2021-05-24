import React, { useEffect, useReducer } from 'react';
import './App.css';
import { ActionType, SWMessageType } from './types'
import { AppContext, initialState } from './contexts/app-context';
import { appReducer } from './contexts/app-reducer';
import NavHeader from './components/nav-header';
import MainView from './components/main-view';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    console.log('App loaded')
    if (!('serviceWorker' in navigator)) {
      return;
    }
    navigator.serviceWorker.controller?.postMessage({type: SWMessageType.PAGE_LOADS});

    navigator.serviceWorker.addEventListener('message', event => {
      if (!event.data) {
        return;
      }
      switch (event.data.type) {
        case SWMessageType.SEND_PAGE_INIT_DATA:{
          dispatch({ type: ActionType.SET_ALL_DATA, data: event.data.data})
          break;
        }
        default:
          break;
      }
    });
  }, []);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className='App'>
        <NavHeader />
        <div className='main'>
          <MainView />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
