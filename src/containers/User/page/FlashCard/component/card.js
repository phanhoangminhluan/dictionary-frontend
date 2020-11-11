/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Row, Button, Card } from 'antd';

export function CreateCard({ cardLearn, rememberCard, forgetCard }) {
  const [key, setKey] = useState('term')
  const [typeKey, setTypeKey] = useState(false)
  const [animation, setAnimation] = useState('')
  const [isLearn, setIsLearn] = useState(false)

  useEffect(() => {
    setKey('term')
    setTypeKey(false)
    setAnimation('')
    setIsLearn(false)
  }, [cardLearn])

  const setCardContent = () => {
    setIsLearn(true)
    setTypeKey(!typeKey)
    setAnimation('animation-card')
    setTimeout(() => {
      typeKey ? setKey('term') : setKey('definition')
    }, 900)
    setTimeout(() => {
      setAnimation('')
    }, 2000)
  }

  const onLearch = (action) => () => {
    if(isLearn){
      action()
    }
  }

  return (
    <Row>
      <Card
        className="card-item"
        style={{ width: "70%", margin: "16px auto" }}
        actions={[
          <Button className={ `card-button ${!isLearn ? `disable` : ''}` } key="next" onClick={onLearch(rememberCard)}>Remember</Button>,
          <Button className={ `card-button ${!isLearn ? `disable` : ''}` } key="prev" onClick={onLearch(forgetCard)}>Forget</Button>
        ]}
      >
        <div className={`card-content ${animation}`} onClick={setCardContent} >
          <p>{cardLearn[key]}</p>
        </div>
      </Card>
    </Row>
  )
}


export default CreateCard;