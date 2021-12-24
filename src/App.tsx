import React, { useEffect, useReducer } from 'react';
import './App.css';
import { ActionType, SWMessageType } from './types'
import { AppContext, initialState } from './contexts/app-context';
import { appReducer } from './contexts/app-reducer';
import NavHeader from './components/nav-header';
import MainView from './components/main-view';

const BACKGROUND_SYNC_INTERVAL = 60 * 1000; // 1h

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const prepareServiceWorker = async () => {
    if (!Notification) {
      console.log('Notification not supported.');
      return;
    }
    if (Notification.permission != 'granted') {
      const permission = await Notification.requestPermission();
      if (permission != 'granted') {
        return;
      }
    }
    if (!('PeriodicSyncManager' in window)) {
      console.log('PeriodicSyncManager not supported');
      return;
    }

    const registration: any = await navigator.serviceWorker.ready;
    await registration.periodicSync.unregister('periodic-notification')
    let tags: string[] = await registration.periodicSync.getTags();
    console.log(32, tags);
    if (tags.includes('periodic-notification')) {
      return;
    }
    await registration.periodicSync.register('periodic-notification', {
      minInterval: BACKGROUND_SYNC_INTERVAL
    });

    tags = await registration.periodicSync.getTags();
    console.log(42, tags);

    // setInterval(() => navigator.serviceWorker.getRegistration().then(reg=>{
    //   if (!reg) {
    //     return
    //   }
    //   reg.showNotification('test', {
    //       tag: 'test-tag',
    //       body: 'This notification was scheduled 1h ago',
    //       showTrigger: new TimestampTrigger(new Date().getTime() + 3600 * 1000),
    //     });
    //   }), 3600 * 1000)
  }

  useEffect(() => {
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
          console.log('get SEND_PAGE_INIT_DATA evt')
          dispatch({ type: ActionType.SET_ALL_DATA, data: event.data.data});
          prepareServiceWorker();
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
