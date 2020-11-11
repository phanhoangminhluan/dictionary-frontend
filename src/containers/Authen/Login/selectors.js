import { createSelector } from 'reselect';

import { key } from './constants';

const selectLogin = state => state[key] ;

const makeSelectFetching = () => 
  createSelector(
    selectLogin,
    state => state.fetching
  )

const makeSelectError = () => 
  createSelector(
    selectLogin,
    state => state.error
  )
export {selectLogin, makeSelectFetching, makeSelectError};
