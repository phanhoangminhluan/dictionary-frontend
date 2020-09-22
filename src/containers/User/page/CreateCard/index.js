/* eslint-disable react/prop-types */
import React from "react";
import { Row } from 'antd';

import CartSet from './component/card';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { key } from './constants';
import reducer from './reducer';
import saga from './saga';


export function CreateCard() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Row>
      <CartSet/>
    </Row>
  )
}


export default CreateCard;