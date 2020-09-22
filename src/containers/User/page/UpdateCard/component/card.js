/* eslint-disable react/prop-types */

import React, { useState, useCallback, useEffect } from "react";
import { Input, Row, Col, Card, Typography, Button, notification, Spin } from 'antd';
import * as _ from 'lodash/fp';
import * as action from '../action';

const { Paragraph } = Typography;
const { TextArea } = Input;

export function CardSet({ dispatch, listCardSet, idCard, nameCard, fleching, message, error }) {
  const [list, setList] = useState([{}]);
  const [listNew, setListNew] = useState([]);
  const [name, setName] = useState('This is an editable text');

  useEffect(() => {
    setName(nameCard)
  }, [nameCard])

  useEffect(() => {
    setList(listCardSet)
  }, [listCardSet])

  useEffect(() => {
    if (message && message.length) {
      notification.success({
        message: 'Successful',
        description: message
      });
    }
  }, [message, error])

  useEffect(() => {
    if (error)
      notification.error({
        message: 'Some thing error',
      });
  }, [error])

  const onChange = (name) => {
    setName(name)
  }
  const handleChangeTerm = useCallback((term, index) => {
    const newList = _.set(`${index}.term`, term.target.value)(list);
    setList(newList)

    if (index >= listCardSet.length) {
      const newListNew = _.set(`${index - listCardSet.length}.term`, term.target.value)(listNew);
      setListNew(newListNew)
    }
  }, [list])

  const handleChangeDefinition = useCallback((definition, index) => {
    const newList = _.set(`${index}.definition`, definition.target.value)(list);
    setList(newList)

    if (index >= listCardSet.length) {
      const newListNew = _.set(`${index - listCardSet.length}.definition`, definition.target.value)(listNew);
      setListNew(newListNew)
    }
  }, [list])

  const handleAddCard = useCallback(() => {
    setList([...list, {}])
    setListNew([...listNew, {}])
  }, [list])

  const handleSubmit = () => {
    // addManyCard && addManyCard(name, list)
    // console.log(listNew);
    dispatch(action.addMoreCard(idCard, listNew))
  }

  const handleUpdate = (index, type) => (value) => {
    if (index < listCardSet.length) {
      if (type === 'Term') {
        console.log(index, value.target.value);
        dispatch(action.updateACard(
          idCard, 
          _.get(`${index}.definition`, list), 
          _.get(`${index}.id`, list), 
          value.target.value ))
      } else {
        console.log(index, value.target.value);
        dispatch(action.updateACard(
          idCard, 
          value.target.value, 
          _.get(`${index}.id`, list), 
          _.get(`${index}.term`, list) ))
      }
    }
  }

  return (
    <Spin spinning={fleching}>
      <Row>
        <Card
          title={
            <div style={{ marginLeft: 15, width: '50%' }}>
              <Paragraph style={{ margin: 0 }} editable={{ onChange: onChange }}>{name}</Paragraph>
            </div>}
          extra={
            <Row>
              <Col span={11}>
                <Button type="primary" onClick={handleAddCard}>More</Button>
              </Col>
              <Col offset={2} span={11}>
                <Button type="danger" onClick={handleSubmit}>Submit</Button>
              </Col>
            </Row>
          } style={{ width: '100%' }}>
          {
            list && list.map((item, index) => (
              <Row key={index}>
                <Col span={12}>
                  <TextArea rows={4} onBlur={handleUpdate(index)} onChange={(value) => handleChangeDefinition(value, index)} value={item.definition} />
                </Col>
                <Col span={12}>
                  <TextArea rows={4} onBlur={handleUpdate(index)} onChange={(value) => handleChangeTerm(value, index)} value={item.term} />
                </Col>
              </Row>
            ))
          }
        </Card>
      </Row>
    </Spin>
  )
}

export default CardSet;