/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Row, Button } from 'antd';
import * as _ from 'lodash/fp';
import CardSet from './card';

export function CreateCard({studiableCards, listCardSet, cardSetSessionId, cardSetId, fleching, message, error}) {
  const [listRemember, setListRemember] = useState([])
  const [listForget, setListForget] = useState([])
  const [listProcess, setListProcess] = useState([])
  const [cardLearn, setCardLearn] = useState({})
  const [count, setCount] = useState(0)

  useEffect(() => {
    const remembers = studiableCards.filter(item => item.remember === true);
    const forgets = studiableCards.filter(item => item.remember === false);
    setListRemember(remembers);
    setListForget(forgets);
    setProcessList();
  }, [studiableCards])
  
  const removeList = (listBefore ) => (fpRemove) => {
    let list = listBefore;
    let evens = _.remove(list, fpRemove);

    return {list, evens}
  }

  const setProcessList = () => {
    let remembers = removeList(listRemember)((item, index) => index < 2);
    let forgets = removeList(listForget)((item, index) => index < 3);
    let process = [...remembers.evens, ...forgets.evens];
    //shuffle 
    process.map((item, index) => {
      const j = Math.floor(Math.random() * (index + 1)); 
      [process[index], process[j]] = [process[j], process[index]];
    })
    setListProcess(process)
    setListRemember(remembers.list)
    setListForget(forgets.list)
  }

  const getCardLearn = () => {
    let card = {
      id: '',
      term: '',
      definition: '',
      remember: false,
      rememberCount: 0,
      forgetCount: 0,
    }
    const {term, definition} = listCardSet.find(item => item.id === listProcess[count].cardId)
    card.cardId = listProcess[count].cardId
    card.remember = listProcess[count].remember
    card.rememberCount = listProcess[count].rememberCount
    card.forgetCount = listProcess[count].forgetCount
    card.term = term
    card.definition = definition
    
    setCardLearn(card)
  }

  const rememberCard = () => {
    let card = cardLearn
    card.remember = true
    card.rememberCount = card.rememberCount + 1
    const {cardId, remember, rememberCount, forgetCount} = card
    //add to list remember
    const newRememberList = _.set(`${listRemember.length}`, {cardId, cardSetSessionId, remember, rememberCount, forgetCount})(listRemember)
    setListRemember(newRememberList)
    //delete item in list process
    let process = removeList(listProcess)((item, index) => index === count)
    
    setProcessList(process.list)
    finishRound()
  }
  const forgetCard = () => {
    let card = cardLearn
    card.remember = false
    card.forgetCount = card.forgetCount + 1
    const {cardId, remember, rememberCount, forgetCount} = card
    //update item forget list process
    const process = _.set(`${count}`, {cardId, cardSetSessionId, remember, rememberCount, forgetCount})(listProcess)
    
    setProcessList(process)
    setCount(count + 1)
    finishRound()
  }

  const finishRound = () => {
    if(count === listProcess.length){
      console.log('finish rount');
    } else {
      getCardLearn()
    }
  }

  return (
    <Row>
      <CardSet {...{cardLearn, rememberCard, forgetCard}} />       
    </Row>
  )
}


export default CreateCard;