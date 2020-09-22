/* eslint-disable react/prop-types */
import React from "react";
import { Row, Button, Card } from 'antd';

export function CreateCard({cardLearn, rememberCard, forgetCard}) {
  return (
    <Row>
       <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <Button key="next" onClick={rememberCard}>Remember</Button>,
            <Button key="prev" onClick={forgetCard}>Prev</Button>
          ]}
        >
            <p>{cardLearn.term}</p>
            <p>{cardLearn.definition}</p>
        </Card>
    </Row>
  )
}


export default CreateCard;