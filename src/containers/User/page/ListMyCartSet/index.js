/* eslint-disable react/prop-types */
import React, { useEffect, useCallback } from "react";
import { Row } from 'antd';
import * as action from "./action";
import * as selectors from "./selectors";

import TableCardset from './component/tableCardset';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { key } from './constants';
import reducer from './reducer';
import saga from './saga';
import { useDispatch, useSelector } from "react-redux";



export function ListMyCardSet() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  const listCard = useSelector(selectors.makeSelectListCard());
  const fleching = useSelector(selectors.makeSelectFetching());
  const message = useSelector(selectors.makeSelectMessage());
  const error = useSelector(selectors.makeSelectError());

  useEffect(() => {
    dispatch(action.getAppMyCardset())
    // getAppMyCardset && getAppMyCardset()
  }, [])
  
  const updateNameCardset = useCallback((id, name, index) => {
    dispatch(action.updateNameCardset(id, name, index))
  }, []);

  return (
    <Row>
      <TableCardset {...{ updateNameCardset, listCard, fleching, message, error }} />
    </Row>
  )
}


export default ListMyCardSet;