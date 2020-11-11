/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from "react";
import { Row, Result, Button } from 'antd';
import * as _ from 'lodash/fp';
import CardSet from './card';
import { useHistory } from "react-router-dom";

import * as action from '../action';
import { useDispatch } from "react-redux";

export function CreateCard({ studiableCards, listCardSet, cardSetSessionId }) {
  const [listRemember, setListRemember] = useState([])
  const [listForget, setListForget] = useState([])
  const [listProcess, setListProcess] = useState([])
  const [cardLearn, setCardLearn] = useState({})
  const [count, setCount] = useState(1)
  const [isFinish, setIsFinish] = useState(false)
  const [result, setResult] = useState({})
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const remembers = studiableCards.filter(item => item.remember === true);
    const forgets = studiableCards.filter(item => item.remember === false);

    setListRemember(remembers);
    setListForget(forgets);

    setProcessList(remembers, forgets)

  }, [studiableCards])

  const removeList = (listBefore) => (index, howmany) => {
    let list = listBefore;

    let evens = list.splice(index, howmany);

    return { list, evens }
  }

  const setProcessList = useCallback((paramListRemember, listForget) => {
    console.log(paramListRemember, listForget);
    let quantityItemRemember = 2;
    if(listForget.length === 0){
      quantityItemRemember = 5;
    }
    let remembers = removeList(paramListRemember)(0, quantityItemRemember);

    let quantityItemForget = 5 - remembers.evens.length

    let forgets = removeList(listForget)(0, quantityItemForget);
    console.log({ remembers, forgets });

    let process = [...remembers.evens, ...forgets.evens];
    //shuffle 
    process.map((item, index) => {
      const j = Math.floor(Math.random() * (index + 1));
      [process[index], process[j]] = [process[j], process[index]];
    })
    setListProcess(process)
    setListRemember(remembers.list)
    setListForget(forgets.list)
    if (process.length) {
      getCardLearn(process[0])
    }
  }, [])

  const getCardLearn = useCallback((cardLearn) => {
    let card = {
      cardId: '',
      term: '',
      definition: '',
      remember: false,
      rememberCount: 0,
      forgetCount: 0,
    }

    const cardSet = listCardSet.find(item => item.id === cardLearn.cardId)
    card.cardId = cardLearn.cardId
    card.remember = cardLearn.remember
    card.rememberCount = cardLearn.rememberCount
    card.forgetCount = cardLearn.forgetCount
    card.term = cardSet ? cardSet.term : ''
    card.definition = cardSet ? cardSet.definition : ''
    console.log(card);

    setCardLearn(card)
  }, [listCardSet])

  const rememberCard = () => {
    let card = cardLearn
    card.remember = true
    card.rememberCount = card.rememberCount + 1
    const { cardId, remember, rememberCount, forgetCount } = card
    console.log(card);
    
    //add to list remember
    const newRememberList = _.set(`${listRemember.length}`, { cardId, cardSetSessionId, remember, rememberCount, forgetCount })(listRemember)
    setListRemember(newRememberList)
    //delete item in list process
    let process = removeList(listProcess)(count, 1)

    setListProcess(process.list)
    finishRound(count, newRememberList, process.list)

    dispatch(action.rememberAWord(cardSetSessionId, cardId))
  }
  const forgetCard = () => {
    let card = cardLearn
    card.remember = false
    card.forgetCount = card.forgetCount + 1
    const { cardId, remember, rememberCount, forgetCount } = card
    //update item forget list process
    const process = _.set(`${count}`, { cardId, cardSetSessionId, remember, rememberCount, forgetCount })(listProcess)

    setListProcess(process)
    finishRound(count + 1, listRemember, process)

    dispatch(action.forgetAWord(cardSetSessionId, cardId))
  }

  const finishRound = (index, dummyRemember, dummyProcess) => {
    if (index === listProcess.length) {
      const forgets = [...listForget, ...dummyProcess];
      const remembers = dummyRemember;
      setResult({
        forgets: _.getOr(0, 'length')(forgets),
        remembers: _.getOr(0, 'length')(remembers)
      })
      //restart count
      setCount(0)
      setProcessList(remembers, forgets)
      console.log('finish rount');
      setIsFinish(true);
    } else {

      setCount(index)
      getCardLearn(listProcess[index])
    }
  }

  const stopLearn = () => {
    history.push('/user')
  }

  return (
    <Row>
      {isFinish ? (
        <Result 
          className="result-card"
          status="success"
          title="Successfully Learn Card"
          subTitle={`${result.forgets === 0 ? 'Your are remember all' : `Remember: ${result.remembers} and Forget: ${result.forgets}`}`}
          extra={[
            <Button key="buy" onClick={stopLearn} >Stop Learn</Button>,
            <Button type="primary" key="console" onClick={() => {setIsFinish(false)}}>
              Continues 
            </Button>,
          ]}
        />) : (< CardSet {...{ cardLearn, rememberCard, forgetCard }} />)}
    </Row>
  )
}


export default CreateCard;