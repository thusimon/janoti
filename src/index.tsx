import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { SWMessageType } from './types';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
const serviceWorkerConfig = {
  onUpdate: (registration: ServiceWorkerRegistration) => {
    console.log('service worker on update state');
  },
  onSuccess: (registration: ServiceWorkerRegistration) => {
    console.info('service worker on success state');
  }
}
serviceWorkerRegistration.register(serviceWorkerConfig);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.ready.then( registration => {
//     registration.active?.postMessage({type: SWMessageType.PAGE_LOADS});
//   });

//   navigator.serviceWorker.addEventListener('message', event => {
//     console.log('client get message', event);
//   });
// }
