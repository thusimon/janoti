import React from 'react';
import { VocabRowProp } from '../types'
import './vocab-card.scss';

const VocabCard = ({kana, kanji, type, trans}: VocabRowProp) => {
  const kanjiShow = kanji || '--';

  const pronounceBtnClick = () => {
    const utterThis = new SpeechSynthesisUtterance(kana);
    utterThis.lang = 'ja';
    speechSynthesis.speak(utterThis);
  }

  return (<div className='vocab-card'>
    <div className='kana-container'>
      <div className='kana'>{kana}</div>
      <button className='pronounce' onClick={pronounceBtnClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke-width="3" stroke="#004AAD">
          <polyline points="10,21 3,21 3,11 10,11 " />
          <polyline points="10,11 20,3.8 20,28.2 10,21 "/>
          <g>
            <path d="M26.4,22c1.6-1.5,2.6-3.6,2.6-6c0-2.4-1-4.5-2.6-6"/>
          </g>
          <g>
            <path d="M24,18.6c0.7-0.7,1.2-1.6,1.2-2.6s-0.4-2-1.2-2.6"/>
          </g>
        </svg>
      </button>
    </div>
    <div className='kanji'>{kanjiShow}</div>
    <div className='trans-container'>
      <span className='type'>[{type}]</span>
      <span className='trans'>{trans}</span>
    </div>
  </div>);
}

export default VocabCard;