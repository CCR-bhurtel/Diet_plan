import { SET_NUTRITION, SET_SETTING, SET_TRAINING } from '../actions/types';

const initialState = {
  nutrition: 'true',
  setting: 'false',
  training: 'false',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SET_NUTRITION:
      let newState = {
        nutrition: 'true',
        setting: 'true',
        training: 'true',
      };
      return newState;
    case SET_TRAINING:
      let anotherState = {
        nutrition: 'true',
        setting: 'true',
        training: 'true',
      };
      return anotherState;
    case SET_SETTING:
      let nayaState = {
        nutrition: 'true',
        setting: 'true',
        training: 'true',
      };
      return nayaState;
    default:
      return state;
  }
}
