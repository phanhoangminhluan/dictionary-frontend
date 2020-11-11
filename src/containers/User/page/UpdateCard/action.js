import * as constants from './constants';

export function getOneCardSet (id) {
  return {
    type: constants.API_GET_CARD_SET,
    param: { id }
  }
}

export function addMoreCard (id, list) {
  return {
    type: constants.API_ADD_MORE_CARD,
    param: { id, list }
  }
}

export function updateACard (cardSetId, definition, id, term) {
  return {
    type: constants.API_UPDATE_A_CARD,
    param: { cardSetId, definition, id, term }
  }
}

export function deleteACard (id) {
  return {
    type: constants.API_DELETE_A_CARD,
    param: { id }
  }
}

export function updateNameCardset (id, name) {
  return {
    type: constants.API_UPDATE_NAME_CARDSET,
    param: {
      id,
      name
    }
  }
}