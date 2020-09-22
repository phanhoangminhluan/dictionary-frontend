import * as constants from './constants';

export function addManyCard (name, list) {
  return {
    type: constants.API_ADD_MANY_CARD,
    param: { name, list }
  }
}