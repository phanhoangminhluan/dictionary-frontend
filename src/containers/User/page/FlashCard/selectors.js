import { createSelector } from 'reselect';
import { get, getOr } from 'lodash/fp';

import { key } from './constants';

const selectFlashCard = state => get(key, state);

const makeSelectStudiableCards= () =>
  createSelector(
    selectFlashCard,
    state => getOr([], 'studiableCards')(state)
  )

const makeSelectListRemembers= () =>
  createSelector(
    selectFlashCard,
    state => getOr([], 'listRemembers')(state)
  )

const makeSelectListForgets= () =>
  createSelector(
    selectFlashCard,
    state => getOr([], 'listForgets')(state)
  )

const makeSelectCardSetSessionId = () =>
  createSelector(
    selectFlashCard,
    state => getOr('', 'cardSetSessionId')(state)
  )

const makeSelectCardSetId = () =>
  createSelector(
    selectFlashCard,
    state => getOr('', 'cardSetId')(state)
  )

const makeSelectFetching = () =>
  createSelector(
    selectFlashCard,
    state => getOr(false, 'fetching')(state)
  )

const makeSelectMessage = () =>
  createSelector(
    selectFlashCard,
    state => getOr('', 'message')(state)
  )

const makeSelectError = () =>
  createSelector(
    selectFlashCard,
    state => getOr(false, 'error')(state)
  )

export {
  selectFlashCard,
  makeSelectStudiableCards,
  makeSelectListRemembers,
  makeSelectListForgets,
  makeSelectCardSetSessionId,
  makeSelectCardSetId,
  makeSelectFetching,
  makeSelectMessage,
  makeSelectError
};
