/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback,  memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';
import { createStructuredSelector } from 'reselect';

import { makeSelectWordSuggestion } from 'containers/Home/page/dictionary/selectors';
import { getWordSuggestion } from 'containers/Home/page/dictionary/action';

const { Option } = AutoComplete;

export function Complete ({ getWordSuggestion, wordSuggestion, handleChange }) {

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    setOptions(wordSuggestion)
  }, [wordSuggestion]);

  const onSearch = searchText => {
    getWordSuggestion && getWordSuggestion(searchText)
  };

  const onSelect = useCallback((data) => {
    handleChange(data)
  }, [handleChange]);

  const onChange = data => {
    setValue(data);
  };

  const children = options.map(item => (
    <Option key={item} value={item}>
      {item}
    </Option>
  ));

  return (
    <div>
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="Type your word"
      >
        {children}
      </AutoComplete>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  wordSuggestion: makeSelectWordSuggestion(),
})

export function mapDispatchToProps(dispatch) {
  return {
    getWordSuggestion: word => dispatch(getWordSuggestion(word)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
) 

export default compose(
  withConnect,
  memo,
)(Complete);