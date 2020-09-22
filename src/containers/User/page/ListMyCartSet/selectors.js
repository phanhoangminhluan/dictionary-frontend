import { createSelector } from 'reselect';
import { get, getOr } from 'lodash/fp';

import { key } from './constants';

const selectCreateCard = state => get(key, state);

const makeSelectListCard = () => 
  createSelector(
    selectCreateCard,
    state => getOr([], 'listAllCardset')(state)
  )

const makeSelectFetching = () => 
  createSelector(
    selectCreateCard,
    state => getOr(false, 'fetching')(state)
  )

const makeSelectMessage = () => 
  createSelector(
    selectCreateCard,
    state => getOr('', 'message')(state)
  )

const makeSelectError= () => 
  createSelector(
    selectCreateCard,
    state => getOr(false, 'error')(state)
  )

export {
  selectCreateCard, 
  makeSelectListCard, 
  makeSelectFetching,
  makeSelectMessage,
  makeSelectError
};
