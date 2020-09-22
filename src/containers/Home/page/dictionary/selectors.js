import { createSelector } from 'reselect';
import { get, getOr } from 'lodash/fp';

import { key } from './constants';

const selectDictionary = state => get(key, state);

const makeSelectWordDetail = () => 
  createSelector(
    selectDictionary,
    state => getOr({}, 'wordDetail')(state)
  )

const makeSelectWordSuggestion = () => 
  createSelector(
    selectDictionary,
    state => getOr([], 'wordSuggestion')(state)
  )


export {
  selectDictionary, 
  makeSelectWordDetail, 
  makeSelectWordSuggestion
};
