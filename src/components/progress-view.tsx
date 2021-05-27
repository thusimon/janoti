import React, { useContext, useState, useEffect } from 'react';
import { VocabRowProp } from '../types';
import { AppContext } from '../contexts/app-context';
import VocabCard from './vocab-card';

import './progress-view.scss';

const ProgressView = () => {
  const {state} = useContext(AppContext);
  const {ja_en, progress_idx} = state;
  const [cards, setCards] = useState<Array<VocabRowProp>>([]);
  const [weekView, setWeekView] = useState<Array<Array<Array<VocabRowProp>>>>([]);
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

  useEffect(() => {
    const weekView = rearrangeData(ja_en, 21);
    const weekDayView: Array<Array<Array<VocabRowProp>>> = [];
    weekView.forEach(week => {
      weekDayView.push(rearrangeData(week, 3));
    });
    setWeekView(weekDayView);
    const weekIdx = Math.floor(progress_idx / 21);
    const dayIdx = Math.floor((progress_idx - weekIdx * 21) / 3);
    const cards = weekDayView[weekIdx][dayIdx];
    setCards(cards);
  }, [ja_en, progress_idx])

  

  const tableClick = (evt: React.MouseEvent) => {
    console.log(evt);
    const cell = evt.target as HTMLTableCellElement;
    if (cell) {
      const row = cell.closest('tr');
      if (row) {
        console.log("Row: " + row.rowIndex + " | Column: " + cell.cellIndex);
      }
    }
  }
  const arrowClick = (arrowIdx: number) => {
    console.log(arrowIdx);
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
            cards.map(card => <VocabCard {...card} />)
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
