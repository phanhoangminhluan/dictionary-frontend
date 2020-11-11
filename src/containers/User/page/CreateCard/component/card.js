/* eslint-disable react/prop-types */

import React, { memo, useState, useCallback, useEffect } from "react";
import { Input, Row, Col, Card, Typography, Button, notification, Spin } from 'antd';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import * as _ from 'lodash/fp';

import * as action from "../action";
import * as selectors from "../selectors";
// import { makeSelectWordDetail } from './selectors';

const { Paragraph } = Typography;
const { TextArea } = Input;

export function CardSet({ addManyCard, fleching, message, error }) {
  const [list, setList] = useState([{}]);
  const [name, setName] = useState('This is an editable text');

  useEffect(() => {
    if (message && message.length ) {
      notification.success({
        message: 'Successful',
        description: message
      });
    }
  }, [message, error])

  useEffect(() => {
    console.log(error);
    
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
  }, [list])

  const handleChangeDefinition = useCallback((definition, index) => {
    const newList = _.set(`${index}.definition`, definition.target.value)(list);
    setList(newList)
  }, [list])

  const handleAddCard = () => {
    setList([...list, {}])
    console.log(list);
  }
  const handleSubmit = () => {
    addManyCard && addManyCard(name, list)
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
                  <TextArea rows={4} onChange={(value) => handleChangeTerm(value, index)} value={item.term} />
                </Col>
                <Col span={12}>
                  <TextArea rows={4} onChange={(value) => handleChangeDefinition(value, index)} value={item.definition} />
                </Col>
              </Row>
            ))
          }
        </Card>
      </Row>
    </Spin>
  )
}

const mapStateToProps = createStructuredSelector({
  listCard: selectors.makeSelectListCard(),
  fleching: selectors.makeSelectFetching(),
  message: selectors.makeSelectMessage(),
  error: selectors.makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    addManyCard: (name, list) => dispatch(action.addManyCard(name, list)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(CardSet);