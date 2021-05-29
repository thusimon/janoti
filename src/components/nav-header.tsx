import React, { useContext } from 'react';
import { ActionType } from '../types';
import { AppContext } from '../contexts/app-context';

import './nav-header.scss';

const NavHeader = () => {
  const { state, dispatch } = useContext(AppContext);
  const onclick = (nav_opt: number) => {
    dispatch({type: ActionType.SET_NAV_OPT, data: {nav_opt}});
  }
  const getClassName = (nav_opt: number) => {
    return state.nav_opt === nav_opt ? 'nav-link chosen' : 'nav-link';
  }
  return (
    <header>
      <nav className='App-header'>
        <a onClick={(evt) => {evt.preventDefault(); onclick(0)}} className={getClassName(0)} href='#'>My Learning Path</a>
        <span>|</span>
        <a onClick={(evt) => {evt.preventDefault(); onclick(1)}} className={getClassName(1)} href='#'>All N2 Vocabulary</a>
        <span>|</span>
      </nav>
    </header>
  );
}

export default NavHeader;