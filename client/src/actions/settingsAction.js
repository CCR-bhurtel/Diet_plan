import axios from 'axios';

const ACTIONS = {
  NEGATE_CATEGORY_OPENED: 'negate-category-opened',
  CHANGE_SETTINGS_DATA: 'change-settings-data',
  LOAD_SETTINGS: 'load-settings',
  SET_CLEAR_ALL_PRODUCTS: 'set-clear-all-products',
  SET_CLEAR_ALL_SERIES: 'set-clear-all-series',
  ADD_EXERCISE_TO_SELECTEDEXERCISES: 'add-exercise-to-selectedexercises',
  REMOVE_EXERCISE_FROM_SELECTEDEXERCISES:
    'remove-exercise-from-selectedexercises',
  SET_SETTINGS_CHANGED_STATE: 'set-settings-changed-state',
  RESET_NUTRITION_SETTINGS_TO_INITIAL: 'reset-nutrition-settings-to-initial',
  RESET_TRAINING_SETTINGS_TO_INITIAL: 'reset-training-settings-to-initial',
  UPDATE_TRAINING_LIST: 'update-training-list',
};

export const updateTrainingList = (uniqueList) => (dispatch) => {
  dispatch({ type: ACTIONS.UPDATE_TRAINING_LIST, payload: uniqueList });
};

export const setSettingsChangedState = (cState) => (dispatch) => {
  dispatch({ type: ACTIONS.SET_SETTINGS_CHANGED_STATE, payload: cState });
};

export const handleOpening = (category) => (dispatch) => {
  console.log(category);
  dispatch({ type: ACTIONS.NEGATE_CATEGORY_OPENED, payload: category });
};

export const resetOptionsStates = (optionsStates) => {
  Object.keys(optionsStates).forEach((key) => {
    optionsStates[key] = false;
  });
};

export const saveSettingsToDatabase = (state) => async (dispatch) => {
  const response = await axios.put('/api/setting', {
    setting: JSON.stringify(state.settingsData),
  });
};

export const restoreSettingFromDatabase = () => async (dispatch) => {
  const response = await axios.get('/api/setting');

  const newSettings = JSON.parse(response.data.setting.setting);
  dispatch({ type: ACTIONS.LOAD_SETTINGS, payload: newSettings });
};

export const confirmClearAllProducts = (props) => async (dispatch) => {
  dispatch({ type: ACTIONS.SET_CLEAR_ALL_PRODUCTS, payload: false });
  // props.clearAllProducts();
  props.updateGauges(props.home);

  const response = await axios.get('/api/item');

  const items = response.data.items;

  items.forEach((item) => {
    let value = JSON.parse(item.item);
    if (value.mealId >= 0) axios.put('/api/item', { itemId: value.id });
  });
};

export const cancelClearAllProducts = () => (dispatch) => {
  dispatch({ type: ACTIONS.SET_CLEAR_ALL_PRODUCTS, payload: false });
};

export const confirmClearAllSeries = () => async (dispatch) => {
  const response = await axios.get('/api/item');

  const items = response.data.items;

  items.forEach((item) => {
    let value = JSON.parse(item.item);
    if (value.exerciseId >= 0) axios.put('/api/item', { itemId: value.id });
  });

  dispatch({ type: ACTIONS.SET_CLEAR_ALL_SERIES, payload: false });
};

export const cancelClearAllSeries = () => (dispatch) => {
  dispatch({ type: ACTIONS.SET_CLEAR_ALL_SERIES, payload: false });
};

export const handleSettingsSaved =
  (e, optionsStates, props, state) => (dispatch) => {
    e.preventDefault();

    if (optionsStates['clear-all-products'])
      dispatch({ type: ACTIONS.SET_CLEAR_ALL_PRODUCTS, payload: true });
    if (optionsStates['reset-nutrition-to-initial'])
      dispatch({
        type: ACTIONS.RESET_NUTRITION_SETTINGS_TO_INITIAL,
        payload: props,
      });
    if (optionsStates['clear-all-series'])
      dispatch({ type: ACTIONS.SET_CLEAR_ALL_SERIES, payload: true });
    if (optionsStates['reset-training-to-initial'])
      dispatch({
        type: ACTIONS.RESET_TRAINING_SETTINGS_TO_INITIAL,
        payload: props,
      });

    dispatch({ type: ACTIONS.SET_SETTINGS_CHANGED_STATE, payload: false });
    dispatch(saveSettingsToDatabase(state));
    resetOptionsStates(optionsStates);
    props.updateGauges(props.home);
    props.updateHome(state.settingsData);
  };

export const handleSettingsCanceled =
  (e, props, optionsStates) => (dispatch) => {
    e.preventDefault();
    dispatch(restoreSettingFromDatabase());
    resetOptionsStates(optionsStates);
    props.updateGauges(props.home);
  };

export const handleExerciseChoosing = (e) => (dispatch) => {
  if (e.target.style.backgroundColor) {
    if (e.target.style.backgroundColor === 'transparent')
      dispatch({
        type: ACTIONS.ADD_EXERCISE_TO_SELECTEDEXERCISES,
        payload: Number(e.target.id[e.target.id.length - 1]),
      });
    else
      dispatch({
        type: ACTIONS.REMOVE_EXERCISE_FROM_SELECTEDEXERCISES,
        payload: Number(e.target.id[e.target.id.length - 1]),
      });
  } else {
    if (e.target.children[0].style.backgroundColor === 'transparent')
      dispatch({
        type: ACTIONS.ADD_EXERCISE_TO_SELECTEDEXERCISES,
        payload: Number(e.target.id[e.target.id.length - 1]),
      });
    else
      dispatch({
        type: ACTIONS.REMOVE_EXERCISE_FROM_SELECTEDEXERCISES,
        payload: Number(e.target.id[e.target.id.length - 1]),
      });
  }
};

export const handleSettingOnChange = (e, props) => (dispatch) => {
  const isNumber = /[0-9]/;
  const isZero = /^[0]{1}/;

  e.preventDefault();

  if (e.target.id === 'editMealName') {
    dispatch({
      type: ACTIONS.CHANGE_SETTINGS_DATA,
      payload: {
        key: e.target.id,
        index: Number(e.target.attributes['data-key'].value),
        value: e.target.value,
      },
    });
  }

  if (isNumber.test(e.target.value[e.target.value.length - 1])) {
    if (isZero.test(e.target.value))
      dispatch({
        type: ACTIONS.CHANGE_SETTINGS_DATA,
        payload: { key: e.target.id, value: 1 },
      });
    else
      dispatch({
        type: ACTIONS.CHANGE_SETTINGS_DATA,
        payload: { key: e.target.id, value: e.target.value },
      });
  } else
    dispatch({
      type: ACTIONS.CHANGE_SETTINGS_DATA,
      payload: { key: e.target.id, value: '' },
    });

  props.updateGauges(props.home);
};
