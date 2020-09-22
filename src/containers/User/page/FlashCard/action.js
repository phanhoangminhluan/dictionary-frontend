import * as constants from './constants';

export function learnAFlashCard (id) {
  return {
    type: constants.API_LEARN_A_FLASHCARD,
    param: { id }
  }
}

export function rememberAWord (cardSetSessionId, cardId) {
  return {
    type: constants.API_REMEMBER_A_WORD,
    param: { cardSetSessionId, cardId }
  }
}

export function forgetAWord (cardSetSessionId, cardId) {
  return {
    type: constants.API_FORGET_A_WORD,
    param: { cardSetSessionId, cardId }
  }
}

