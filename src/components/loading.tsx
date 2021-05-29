import React from 'react';

import './loading.scss';

const Loading = () => {
  return (<div className='spinner-container'>
    <div className='lds-ripple'>
      <div></div>
      <div></div>
    </div>
  </div>);
}

export default Loading;
