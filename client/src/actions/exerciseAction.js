import axios from 'axios';

const ACTIONS = {
  NEGATE_EXERCISE_OPENED: 'negate-exercise-opened',
  NEGATE_ADD_WINDOW_STATE: 'negate-add-window-state',
  NEGATE_REMOVE_WINDOW_STATE: 'negate-remove-window-state',
  NEGATE_MORE_WINDOW_STATE: 'negate-more-window-state',
  SORT_SERIESLIST: 'sort-serieslist',
  CHANGE_NEW_SERIE_DATA: 'change-new-serie-data',
  UPDATE_LASTTIME_DATA: 'update-lasttime-data',
  SET_WARNING: 'set-warning',
  CLEAR_WARNING: 'clear-warning',
  ADD_SERIE: 'add-serie',
  REMOVE_SERIE: 'remove-serie',
  ADD_SERIE_TO_SERIESLIST: 'add-serie-to-serieslist',
  CLEAR_SERIESLIST_BEFORE_DAY_CHANGING: 'clear-serieslist-before-day-change',
  ADD_NEW_SERIE_LISTS: 'add_new_serie_list',
};
export const sortSerieList = () => (dispatch) => {
  dispatch({ action: ACTIONS.SORT_SERIESLIST });
};

export const clearSerieListBeforeDayChanging = () => (dispatch) => {
  dispatch({ action: ACTIONS.CLEAR_SERIESLIST_BEFORE_DAY_CHANGING });
};
export const dispatchThis = (action) => (dispatch) => {
  dispatch({ action });
};
export const updateLastTimeData = (props) => (dispatch) => {
  dispatch({ type: ACTIONS.UPDATE_LASTTIME_DATA, payload: props });
};
export const getPreviousTrainingDate = (previousDateIds) => {
  const isLeapYear = () => {
    if (
      (previousDateIds.yearId % 4 === 0 &&
        previousDateIds.yearId % 100 !== 0) ||
      previousDateIds.yearId % 400 === 0
    )
      return true;
    else return false;
  };
  const isDayFirstInMonth = () => {
    if (previousDateIds.dayId === 1) return true;
    else return false;
  };
  const isDayFirstInJanuary = () => {
    if (previousDateIds.dayId === 1 && previousDateIds.monthId === 1)
      return true;
    else return false;
  };
  const isDayFirstInMarch = () => {
    if (previousDateIds.dayId === 1 && previousDateIds.monthId === 3)
      return true;
    else return false;
  };
  const isDayFirstIn30DayMonths = () => {
    if (
      previousDateIds.dayId === 1 &&
      (previousDateIds.monthId === 4 ||
        previousDateIds.monthId === 6 ||
        previousDateIds.monthId === 8 ||
        previousDateIds.monthId === 9 ||
        previousDateIds.monthId === 11)
    )
      return true;
    else return false;
  };

  let potentialPreviousDateIds = { dayId: 0, monthId: 0, yearId: 0 };

  if (isDayFirstInJanuary()) {
    potentialPreviousDateIds.dayId = 31;
    potentialPreviousDateIds.monthId = 12;
    potentialPreviousDateIds.yearId = previousDateIds.yearId - 1;
  } else if (isDayFirstInMarch()) {
    if (isLeapYear()) potentialPreviousDateIds.dayId = 29;
    else potentialPreviousDateIds.dayId = 28;

    potentialPreviousDateIds.monthId = 2;
    potentialPreviousDateIds.yearId = previousDateIds.yearId;
  } else if (isDayFirstIn30DayMonths()) {
    potentialPreviousDateIds.dayId = 31;
    potentialPreviousDateIds.monthId = previousDateIds.monthId - 1;
    potentialPreviousDateIds.yearId = previousDateIds.yearId;
  } else if (isDayFirstInMonth()) {
    potentialPreviousDateIds.dayId = 30;
    potentialPreviousDateIds.monthId = previousDateIds.monthId - 1;
    potentialPreviousDateIds.yearId = previousDateIds.yearId;
  } else {
    potentialPreviousDateIds.dayId = previousDateIds.dayId - 1;
    potentialPreviousDateIds.monthId = previousDateIds.monthId;
    potentialPreviousDateIds.yearId = previousDateIds.yearId;
  }

  return potentialPreviousDateIds;
};

export const handleExerciseOpening = () => (dispatch) => {
  dispatch({ type: ACTIONS.NEGATE_EXERCISE_OPENED });
};

export const handleAddWindow = () => (dispatch) => {
  dispatch({ type: ACTIONS.NEGATE_ADD_WINDOW_STATE });
};

export const handleRemoveWindow = () => (dispatch) => {
  dispatch({ type: ACTIONS.NEGATE_REMOVE_WINDOW_STATE });
};

export const handleMoreWindow = () => (dispatch) => {
  dispatch({ type: ACTIONS.NEGATE_MORE_WINDOW_STATE });
};

export const handleFormClearing = () => (dispatch) => {
  dispatch({
    type: ACTIONS.CHANGE_NEW_SERIE_DATA,
    payload: { key: 'weight', value: '' },
  });
  dispatch({
    type: ACTIONS.CHANGE_NEW_SERIE_DATA,
    payload: { key: 'reps', value: '' },
  });
};

export const handleOnChange = (e) => (dispatch) => {
  // const newReg = /^[1-9]{1,}[.]{1}[0-9]{1,3}/
  const isNumber = /[0-9]/;
  const isZero = /^[0]{1}/;

  const setValueAsNull = () => {
    dispatch({
      type: ACTIONS.CHANGE_NEW_SERIE_DATA,
      payload: { key: e.target.id, value: '' },
    });
    dispatch({ type: ACTIONS.SET_WARNING, payload: e.target.id });
  };

  const setValueAsCorrect = () => {
    dispatch({
      type: ACTIONS.CHANGE_NEW_SERIE_DATA,
      payload: { key: e.target.id, value: e.target.value },
    });
    dispatch({ type: ACTIONS.CLEAR_WARNING, payload: e.target.id });
  };

  if (isNumber.test(e.target.value[e.target.value.length - 1])) {
    if (isZero.test(e.target.value)) setValueAsNull();
    else setValueAsCorrect();
  } else {
    setValueAsNull();
  }
};

// const countWeightPerRepsRatio = (seriesList) => {
//   return (countTotalWeight(seriesList) / countTotalReps(seriesList)).toFixed(
//     2
//   );
// };

export const handleSerieAdding = (e, state, props) => (dispatch) => {
  e.preventDefault();
  setTimeout(async () => {
    const updatedSeriesList = state.seriesList;
    let serieCount = 1;

    // ADDING SERIE TO SERIESLIST
    state.newSerie.id = Date.now();
    state.newSerie.dateIds = props.dateIds;
    updatedSeriesList.push(state.newSerie);

    // SERIE ORDER COUNTING
    updatedSeriesList.forEach((serie) => {
      serie.serieCount = serieCount;
      serieCount++;
    });

    // SAVING CHANGES IN LOCAL STORAGE
    // axios.post('/api/item', {
    //   itemId: state.newSerie.id,
    //   item: JSON.stringify(state.newSerie),
    // });

    state.newSerie.exerciseId = props.exerciseId;

    await axios.post('/api/item', {
      itemId: state.newSerie.id,
      item: JSON.stringify(state.newSerie),
    });

    dispatch({ type: ACTIONS.ADD_SERIE, payload: updatedSeriesList });
  }, 10);
  dispatch({ type: ACTIONS.NEGATE_ADD_WINDOW_STATE });
};

export const handleSerieRemoving = (checkedIdsList, state) => (dispatch) => {
  console.log(checkedIdsList);
  let updatedSeriesList = state.seriesList;

  let serieCount = 1;

  checkedIdsList.forEach((checkedId) => {
    updatedSeriesList.forEach((serie, index) => {
      axios.put('/api/item', { itemId: serie.id });
      if (Number(serie.id) === Number(checkedId))
        updatedSeriesList.splice(index, 1);
    });
    dispatch({ type: ACTIONS.SORT_SERIESLIST });
  });
  // SERIE ORDER COUNTING
  updatedSeriesList.forEach((serie) => {
    axios
      .post('/api/item', {
        itemId: serie.id,
        item: JSON.stringify({ ...serie, serieCount }),
      })
      .then(() => {
        serieCount++;
      });
  });

  dispatch({ type: ACTIONS.REMOVE_SERIE, payload: updatedSeriesList });

  dispatch({ type: ACTIONS.NEGATE_REMOVE_WINDOW_STATE });
};
