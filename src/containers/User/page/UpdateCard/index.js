/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from 'antd';
import { useLocation, useParams } from "react-router-dom";
import * as _ from 'lodash/fp';

import CartSet from './component/card';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { key } from './constants';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as action from './action';

export function CreateCard() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const params = useParams();

  const listCardSet = useSelector(selectors.makeSelectListCardSet());
  const idCard = useSelector(selectors.makeSelectCardID());
  const nameCard = useSelector(selectors.makeSelectCardName());
  const fleching = useSelector(selectors.makeSelectFetching());
  const message = useSelector(selectors.makeSelectMessage());
  const error = useSelector(selectors.makeSelectError());

  useEffect(() => {
    const { id } = params;
    
    if (id){
      dispatch(action.getOneCardSet(id))
    }
  }, [params])

  return (
    <Row>
      <CartSet {...{ dispatch, listCardSet, idCard, nameCard, fleching, message, error }}/>
    </Row>
  )
}


export default CreateCard;