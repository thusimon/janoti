import React, {useEffect, useContext} from 'react'
import { VocabRowProp } from '../types';
import { AppContext } from '../contexts/app-context';
import VocabRow from './vocab-row';

const VocabList: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  console.log(7, state);
  useEffect(() => {
    
  }, []);
  const ja_en = state.ja_en;
  return (<div>
    <table>
      <th>
        <td>Kana</td>
        <td>Kanji</td>
        <td>Type</td>
        <td>Translation</td>
      </th>
      {ja_en.map(vocab => {
        return <VocabRow {...vocab}></VocabRow>
      })}
    </table>
  </div>);
}

export default VocabList;
