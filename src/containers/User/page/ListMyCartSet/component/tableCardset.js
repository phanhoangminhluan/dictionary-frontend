/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from "react";
import { Table, Row, Typography, message as popupMessage, Spin, Button } from 'antd';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {deleteCardset} from '../action';
const { Paragraph } = Typography;

export default function TableCardset({ updateNameCardset, listCard, fleching, message, error }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (message && message.length) {
      popupMessage.success(message);
    }
  }, [message, error])

  useEffect(() => {
    if (error)
      popupMessage.error('Some thing error');
  }, [error])

  const history = useHistory();

  const onChange = useCallback((id, index) => (cardName) => {
    console.log(id, cardName);
    
    updateNameCardset(id, cardName, index)
  },[]);

  const handleUpdateCard = (id) => () => {
    history.push({pathname:`/user/cardset/${id}`})
  }

  const handleLearnCard = (id) => () => {
    history.push({pathname:`/user/flash-card/${id}`})
  }
  
  const handleDeleteCard = (id) => () => {
    dispatch(deleteCardset(id))
  }

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (text, row, index) => (
        <Paragraph editable={{ onChange: onChange(row.id, index) }}>
          {text}
        </Paragraph>
      )
    },
    {
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      key: 'update',
      render: (text, record) => (
        <div>
          <Button style={{marginRight: 20}} type="primary" ghost onClick={handleLearnCard(record.id)}>Learn</Button>
          <Button style={{marginRight: 20}} type="primary" ghost onClick={handleUpdateCard(record.id)}>Update</Button>
          <Button type="danger" ghost onClick={handleDeleteCard(record.id)}>Delete</Button>
        </div>
      ),
    },
  ]

  return (
    <Spin spinning={fleching}>
      <Row>
        <Table rowKey={(record, index) => index} columns={columns} dataSource={listCard} />
      </Row>
    </Spin>
  )
}
