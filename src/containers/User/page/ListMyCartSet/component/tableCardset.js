/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from "react";
import { Table, Row, Typography, notification, Spin, Button } from 'antd';
import { useHistory } from "react-router-dom";

const { Paragraph } = Typography;

export default function TableCardset({ updateNameCardset, listCard, fleching, message, error }) {
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

  const history = useHistory();

  const onChange = useCallback((id, index) => (cardName) => {
    console.log(id, cardName);
    
    updateNameCardset(id, cardName, index)
  },[]);

  const handleUpdateCard = (id) => () => {
    console.log(id);
    
    history.push({pathname:`/user/cardset/${id}`})
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
        <Button type="primary" onClick={handleUpdateCard(record.id)}>Update</Button>
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
