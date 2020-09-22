import { createSelector } from 'reselect';
import { get, getOr } from 'lodash/fp';

import { key } from './constants';

const selectRegister = state => get(key, state);

const makeSelectFetching = () => 
  createSelector(
    selectRegister,
    state => getOr({}, 'fetching')(state)
  )

const makeSelectError = () => 
  createSelector(
    selectRegister,
    state => getOr({}, 'error')(state)
  )

export {
  selectRegister, 
  makeSelectFetching, 
  makeSelectError
};
