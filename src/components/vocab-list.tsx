import React, { useContext} from 'react'
import { AppContext } from '../contexts/app-context';
import VocabRow from './vocab-row';

import './vocab-list.scss';

const VocabList: React.FC = () => {
  const { state } = useContext(AppContext);
  const ja_en = state.ja_en;
  return (<div className='vocab-list'>
    <table>
      <tr>
        <th>Kana</th>
        <th>Kanji</th>
        <th>Type</th>
        <th>Translation</th>
      </tr>
      {ja_en.map(vocab => {
        return <VocabRow {...vocab}></VocabRow>;
      })}
    </table>
  </div>);
}

export default VocabList;
