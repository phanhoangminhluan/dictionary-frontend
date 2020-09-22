import { createSelector } from 'reselect';
import { get, getOr } from 'lodash/fp';

import { key } from './constants';

const selectUpdateCard = state => get(key, state);

const makeSelectListCardSet = () =>
  createSelector(
    selectUpdateCard,
    state => getOr([], 'listCardSet')(state)
  )

const makeSelectCardID = () =>
  createSelector(
    selectUpdateCard,
    state => getOr('', 'idCard')(state)
  )

const makeSelectCardName = () =>
  createSelector(
    selectUpdateCard,
    state => getOr('', 'nameCard')(state)
  )

const makeSelectFetching = () =>
  createSelector(
    selectUpdateCard,
    state => getOr(false, 'fetching')(state)
  )

const makeSelectMessage = () =>
  createSelector(
    selectUpdateCard,
    state => getOr('', 'message')(state)
  )

const makeSelectError = () =>
  createSelector(
    selectUpdateCard,
    state => getOr(false, 'error')(state)
  )

export {
  selectUpdateCard,
  makeSelectListCardSet,
  makeSelectCardID,
  makeSelectCardName,
  makeSelectFetching,
  makeSelectMessage,
  makeSelectError
};
