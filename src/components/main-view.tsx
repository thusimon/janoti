import React, {useContext} from 'react'
import { AppContext } from '../contexts/app-context';
import VocabList from './vocab-list';
import ProgressView from './progress-view';

import './main-view.scss';

const MainView = () => {
  const { state } = useContext(AppContext);

  const nav_opt = state.nav_opt;
  return (
    <div className='main-view'>
      {nav_opt === 0 ? <ProgressView /> : <VocabList />}
    </div>
  );
}

export default MainView;