import React, { useContext, useEffect } from 'react';
import { VocabRowProp } from '../types';
import { AppContext } from '../contexts/app-context';

import './progress-view.scss';

const ProgressView = () => {
  const { state } = useContext(AppContext);
  const { ja_en, progress_idx } = state;

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

  let weekView = rearrangeData(ja_en, 7 * 3);
  let weekDayView: Array<Array<Array<VocabRowProp>>> = [];
  weekView.forEach(week => {
    weekDayView.push(rearrangeData(week, 3));
  });

  console.log(40, weekView, weekDayView);

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
  return (
    <div className='pregress-view-container'>
      <table onClick={tableClick}>
        <tr>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Tur</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
        {
          weekDayView.map(week => {
            return (<tr>
              {
                week.map((day, idx) => {
                  return (<td>Day {idx+1}</td>)
                })
              }
            </tr>)
          })
        }
      </table>
    </div>
  );
}

export default ProgressView;
