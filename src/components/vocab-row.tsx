import React from 'react'
import { VocabRowProp } from '../types';

const VocabRow: React.FC<VocabRowProp> = ({kana, kanji, type, trans}) => {
  return (<tr>
    <td>{kana}</td>
    <td>{kanji}</td>
    <td>{type}</td>
    <td>{trans}</td>
  </tr>)
}

export default VocabRow;