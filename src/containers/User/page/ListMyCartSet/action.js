import * as constants from './constants';

export function getAppMyCardset () {
  return {
    type: constants.API_GET_ALL_MY_CARDSET
  }
}

export function updateNameCardset (id, name, index) {
  return {
    type: constants.API_UPDATE_NAME_CARDSET,
    param: {
      id,
      name,
      index
    }
  }
}

export function deleteCardset (id) {
  return {
    type: constants.API_DELETE_CARDSET,
    param: {
      id
    }
  }
}
