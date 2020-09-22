/* eslint-disable react/prop-types */
import React, { memo } from "react";
import { Row, Col } from 'antd';
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from 'reselect';

import { makeSelectWordDetail } from './selectors';
import './styles.css';

export function Dictionary({ wordDetail }) {
  const { word, definitionDetails, ukPhonetic, usPhonetic } = wordDetail
  return (
    <div className="layout">
      <h1 className="title" >{word}</h1>
      <h4 className="phonetic" >(UK) Phonetic: {ukPhonetic}</h4>
      <h4 className="phonetic" >(US) Phonetic: {usPhonetic}</h4>
      <div className="definitions">
        Definitions of:
        <span className="definitions-name">{word}</span>
      </div>
      {
        definitionDetails && definitionDetails.map((item, index) => (
          <div key={index}>
            <span className="count-index">{index}.</span>
            <div className="definitions-wrap">
              <Row className="definitions-detail">
                <Col span={3}>
                  <span className="part-of-speech">
                    {item.partOfSpeech}
                  </span>
                </Col>
                <Col span={21}>
                  {item.definition}
                </Col>
              </Row>
              {
                item.synonyms && (item.synonyms.length > 0) && (
                  <Row className="synonyms-detail">
                    <Col span={3}>
                      Synonyms:
                  </Col>
                    <Col span={21}>
                      {
                        item.synonyms.map((synonymsItem, index) => {
                          if (index === 0) {
                            return <span>{synonymsItem}</span>
                          }
                          return <span key={index}>{`', '${synonymsItem}`}</span>
                        })
                      }
                    </Col>
                  </Row>
                )
              }
              {
                item.examples && (item.examples.length > 0) && (
                  <Row className="synonyms-detail">
                    <Col span={3}>
                      Examples:
                  </Col>
                    <Col span={21}>
                      {
                        item.examples.map((examples, index) => {
                          if (index === 0) {
                            return <span>{examples}</span>
                          }
                          return <span key={index}>{`', '${examples}`}</span>
                        })
                      }
                    </Col>
                  </Row>
                )
              }
            </div>
          </div>
        ))
      }

    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  wordDetail: makeSelectWordDetail(),
})

export function mapDispatchToProps(dispatch) { }

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(Dictionary);