import { createSelector } from 'reselect';

import { key } from './constants';

const selectLogin = state => state[key] ;

const makeSelectFetching = () => 
  createSelector(
    selectLogin,
    state => state.fetching
  )

export {selectLogin, makeSelectFetching};
