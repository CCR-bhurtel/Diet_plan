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
};

export const handleOpening = () => (dispatch) => {
  dispatch({ type: ACTIONS.NEGATE_CATEGORY_OPENED });
};

export const resetCheckbox = (idOfCheckbox) => (dispatch) => {
  document.querySelector('#' + idOfCheckbox).checked = false;
};

export const saveSettingsToLocalStorage = (state) => (dispatch) => {
  localStorage.setItem('settings', JSON.stringify(state.settingsData));
};

export const restoreSettingFromLocalStorage = () => (dispatch) => {
  dispatch({ type: ACTIONS.LOAD_SETTINGS });
};

export const confirmClearAllProducts = () => (dispatch) => {
  dispatch({ type: ACTIONS.SET_CLEAR_ALL_PRODUCTS, payload: false });

  Object.keys(localStorage).forEach((key) => {
    let value = JSON.parse(localStorage.getItem(key));
    if (value.mealId >= 0) localStorage.removeItem(key);
  });
};

export const cancelClearAllProducts = () => (dispatch) => {
  dispatch({ type: ACTIONS.SET_CLEAR_ALL_PRODUCTS, payload: false });
};

export const confirmClearAllSeries = () => (dispatch) => {
  dispatch({ type: ACTIONS.SET_CLEAR_ALL_SERIES, payload: false });

  Object.keys(localStorage).forEach((key) => {
    let value = JSON.parse(localStorage.getItem(key));
    if (value.exerciseId >= 0) localStorage.removeItem(key);
  });
};

export const cancelClearAllSeries = () => (dispatch) => {
  dispatch({ type: ACTIONS.SET_CLEAR_ALL_SERIES, payload: false });
};

export const resetOptionsStates = (optionsStates) => {
  Object.keys(optionsStates).forEach((key) => {
    optionsStates[key] = false;
  });
};
export const handleSettingsSaved = (e, optionsStates, props) => (dispatch) => {
  e.preventDefault();

  if (optionsStates['clear-all-products'])
    dispatch({ type: ACTIONS.SET_CLEAR_ALL_PRODUCTS, payload: true });
  if (optionsStates['reset-nutrition-to-initial'])
    dispatch({
      type: ACTIONS.RESET_NUTRITION_SETTINGS_TO_INITIAL,
      payload: props.initialData,
    });
  if (optionsStates['clear-all-series'])
    dispatch({ type: ACTIONS.SET_CLEAR_ALL_SERIES, payload: true });
  if (optionsStates['reset-training-to-initial'])
    dispatch({
      type: ACTIONS.RESET_TRAINING_SETTINGS_TO_INITIAL,
      payload: props.initialData,
    });

  dispatch({ type: ACTIONS.SET_SETTINGS_CHANGED_STATE, payload: false });
  saveSettingsToLocalStorage();
  resetOptionsStates();
  props.updateGauges(props.home);
};

export const handleSettingChangedState = (condition) => (dispatch) => {
  dispatch({ type: ACTIONS.SET_SETTINGS_CHANGED_STATE, payload: condition });
};

export const handleSettingsCanceled = (e, props) => {
  e.preventDefault();
  restoreSettingFromLocalStorage();
  resetOptionsStates();
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
