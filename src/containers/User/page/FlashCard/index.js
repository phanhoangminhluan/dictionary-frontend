/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Result, Button } from 'antd';
import { useParams, useHistory } from "react-router-dom";
// import * as _ from 'lodash/fp';

import LearnCard from './component/learnCard';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { key } from './constants';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as action from './action';

import { key as keyUpdateCard } from '../UpdateCard/constants';
import reducerUpdateCard from '../UpdateCard/reducer';
import sagaUpdateCard from '../UpdateCard/saga';
import * as selectorsUpdateCard from '../UpdateCard/selectors';
import * as actionUpdateCard from '../UpdateCard/action';
import './style.css';

export function CreateCard() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useInjectReducer({ key: keyUpdateCard, reducer: reducerUpdateCard });
  useInjectSaga({ key: keyUpdateCard, saga: sagaUpdateCard });

  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const studiableCards = useSelector(selectors.makeSelectStudiableCards());
  const cardSetSessionId = useSelector(selectors.makeSelectCardSetSessionId());
  const cardSetId = useSelector(selectors.makeSelectCardSetId());
  const fleching = useSelector(selectors.makeSelectFetching());
  const message = useSelector(selectors.makeSelectMessage());
  const error = useSelector(selectors.makeSelectError());

  const listCardSet = useSelector(selectorsUpdateCard.makeSelectListCardSet());
  // const nameCard = useSelector(selectorsUpdateCard.makeSelectCardName());
  // const flechingUpdateCard = useSelector(selectorsUpdateCard.makeSelectFetching());
  // const messageUpdateCard = useSelector(selectorsUpdateCard.makeSelectMessage());
  // const errorUpdateCard = useSelector(selectorsUpdateCard.makeSelectError());

  useEffect(() => {
    const { id } = params;

    if (id) {
      dispatch(action.learnAFlashCard(id))
      dispatch(actionUpdateCard.getOneCardSet(id))
    }
  }, [params])

  const backHome = () => {
    history.push('/user')
  }

  return (studiableCards.length && listCardSet.length) ? (
    <Row>
      <LearnCard {...{
        studiableCards,
        cardSetSessionId,
        cardSetId,
        fleching,
        message,
        error,
        listCardSet
      }} />
    </Row>
  ) : (
      <Result
        status="404"
        title="Card set Is Empty"
        subTitle="Do not have any card to learn"
        extra={<Button type="primary" onClick={backHome}>Back Home</Button>}
      />
    )
}


export default CreateCard;