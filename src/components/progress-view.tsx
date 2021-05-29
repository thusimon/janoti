import React, { useContext, useState, useEffect } from 'react';
import { ActionType, VocabRowProp, SWMessageType } from '../types';
import { AppContext } from '../contexts/app-context';
import Loading from './loading';
import VocabCard from './vocab-card';

import './progress-view.scss';

const ProgressView = () => {
  const {state, dispatch} = useContext(AppContext);
  const {ja_en, progress_idx, week_view} = state;
  const [cards, setCards] = useState<Array<VocabRowProp>>([]);
  /**
   * let's arrange the words in weeks view
   * each day contains 3 vocabularies
   * ...
   * | d1 | d2 | d3 | d4 | d5 | d6 | d7 |
   * | d1 | d2 | d3 | d4 | d5 | d6 | d7 |
   * ...
   */
  const rearrangeData = (arr: Array<VocabRowProp>, width: number) => {
    const rearrangeView: Array<Array<VocabRowProp>> = [];
    let row: Array<VocabRowProp> = [];
    let idx = 0;
    do {
      row = arr.slice(idx, idx+width);
      rearrangeView.push(row);
      idx += width;
    } while (idx < arr.length);
    return rearrangeView;
  }

  const getDayCards = (weekView: VocabRowProp[][][], weekIdx: number, dayIdx: number) => {
    const weekDayView = weekView[weekIdx] ? weekView[weekIdx] : [];
    const dayView = weekDayView[dayIdx] ? weekDayView[dayIdx] : [];
    return dayView;
  }

  useEffect(() => {
    const weekView = rearrangeData(ja_en, 21);
    const weekDayView: Array<Array<Array<VocabRowProp>>> = [];
    weekView.forEach(week => {
      weekDayView.push(rearrangeData(week, 3));
    });
    dispatch({type: ActionType.SET_WEEK_VIEW, data: {week_view: weekDayView}});
    const weekIdx = Math.floor(progress_idx / 7);
    const dayIdx = Math.floor(progress_idx - weekIdx * 7);
    const cards = getDayCards(weekDayView, weekIdx, dayIdx);
    setCards(cards);
  }, [ja_en])

  useEffect(() => {
    const weekIdx = Math.floor(progress_idx / 7);
    const dayIdx = Math.floor(progress_idx - weekIdx *7);
    const cards = getDayCards(week_view, weekIdx, dayIdx);
    setCards(cards);
  }, [progress_idx, week_view])

  const arrowClick = (btnId: number) => {
    let progress_idx_update = progress_idx;
    switch(btnId) {
      case 0:
        // up arrow
        progress_idx_update -= 7; 
        break;
      case 1:
        // right arrow
        progress_idx_update += 1;
        break;
      case 2:
        // bottom arrow
        progress_idx_update += 7;
        break;
      case 3:
        // left arrow
        progress_idx_update -= 1;
        break;
      default:
        break;
    }
    // final check
    progress_idx_update = progress_idx_update >= 0 ? progress_idx_update : 0;
    progress_idx_update = progress_idx_update <= ja_en.length / 3 ? progress_idx_update : Math.floor(ja_en.length / 3);
    const dataPayload = {progress_idx: progress_idx_update};
    dispatch({type: ActionType.SET_ALL_DATA, data: dataPayload});
    navigator.serviceWorker.controller?.postMessage({type: SWMessageType.SET_DB_PROG_IDX, data: dataPayload});
  }
  return (
    <div className='progress-view-container'>
      <div className='row-edge row-top'>
        <div className='row-arrow-container'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 4" onClick={() => arrowClick(0)}>
            <g>
              <path d="M 8 0 L 16 4 0 4z"/>
            </g>
          </svg>
        </div>
      </div>
      <div className='row-middle'>
        <div className='column-edge column-left'>
          <div className='column-arrow-container'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -8 4 16" onClick={() => arrowClick(3)}>
              <g>
                <path d="M 4 -8 L 4 8 0 0z"/>
              </g>
            </svg>
          </div>
        </div>
        <div className='column-middle'>
          {
            ja_en.length > 0 ? cards.map(card => <VocabCard {...card} />) : <Loading />
          }
        </div>
        <div className='column-edge column-right'>
          <div className='column-arrow-container'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -8 4 16" onClick={() => arrowClick(1)}>
              <g>
                <path d="M 0 -8 L 0 8 4 0z"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className='row-edge row-bottom'>
        <div className='row-arrow-container'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 4" onClick={() => arrowClick(2)}>
            <g>
              <path d="M 8 4 L 16 0 0 0z"/>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ProgressView;
