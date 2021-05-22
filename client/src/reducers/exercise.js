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

const warnings = {
  weight: 'Weight must be a positive number',
  reps: 'Reps must be a positive number',
};

const getPreviousTrainingDate = (previousDateIds) => {
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

const initialState = {
  isExerciseOpened: false,
  isAddWindowOpened: false,
  isRemoveWindowOpened: false,
  isMoreWindowOpened: false,
  lastTimeData: {
    training: { weight: 'First time', reps: 'First time' },
    serie: { weight: 'First time', reps: 'First time' },
  },
  seriesList: [],
  warning: ['', ''],
  newSerie: {
    id: 0,
    exerciseId: '',
    trainingId: 0,
    dateIds: { dayId: 0, monthId: 0, yearId: 0 },
    serieCount: '',
    weight: '',
    reps: '',
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_NEW_SERIE_LISTS:
      return { ...state, seriesList: action.payload };
    case ACTIONS.NEGATE_EXERCISE_OPENED: {
      return { ...state, isExerciseOpened: !state.isExerciseOpened };
    }

    case ACTIONS.NEGATE_ADD_WINDOW_STATE: {
      return { ...state, isAddWindowOpened: !state.isAddWindowOpened };
    }

    case ACTIONS.NEGATE_REMOVE_WINDOW_STATE: {
      return { ...state, isRemoveWindowOpened: !state.isRemoveWindowOpened };
    }

    case ACTIONS.NEGATE_MORE_WINDOW_STATE: {
      return { ...state, isMoreWindowOpened: !state.isMoreWindowOpened };
    }

    case ACTIONS.CHANGE_NEW_SERIE_DATA: {
      // eslint-disable-next-line default-case
      switch (action.payload.key) {
        case 'weight':
          return {
            ...state,
            newSerie: { ...state.newSerie, weight: action.payload.value },
          };
        case 'reps':
          return {
            ...state,
            newSerie: { ...state.newSerie, reps: action.payload.value },
          };
      }
    }

    // eslint-disable-next-line no-fallthrough
    case ACTIONS.ADD_SERIE: {
      // const updatedSeriesList = state.seriesList;
      // let serieCount = 1;

      // // ADDING SERIE TO SERIESLIST
      // state.newSerie.id = Date.now();
      // state.newSerie.dateIds = props.dateIds;
      // updatedSeriesList.push(state.newSerie);

      // // SERIE ORDER COUNTING
      // updatedSeriesList.forEach((serie) => {
      //   serie.serieCount = serieCount;
      //   serieCount++;
      // });

      // SAVING CHANGES IN LOCAL STORAGE
      // axios.post('/api/item', {
      //   itemId: state.newSerie.id,
      //   item: JSON.stringify(state.newSerie),
      // });

      // axios.post('/api/item', {
      //   itemId: state.newSerie.id,
      //   item: JSON.stringify(state.newSerie),
      // });

      return {
        ...state,
        newSerie: {
          id: 0,
          exerciseId: '',
          dateIds: { dayId: 0, monthId: 0, yearId: 0 },
          serieCount: '',
          weight: '',
          reps: '',
        },
        seriesList: [...action.payload],
      };
    }

    case ACTIONS.REMOVE_SERIE: {
      return { ...state, seriesList: action.payload };
    }

    case ACTIONS.SET_WARNING: {
      // eslint-disable-next-line default-case
      switch (action.payload) {
        case 'weight':
          return { ...state, warning: [warnings.weight, action.payload] };
        case 'reps':
          return { ...state, warning: [warnings.reps, action.payload] };
      }
    }

    // eslint-disable-next-line no-fallthrough
    case ACTIONS.CLEAR_WARNING: {
      return { ...state, warning: ['', action.payload] };
    }

    case ACTIONS.ADD_SERIE_TO_SERIESLIST: {
      return { ...state, seriesList: [...state.seriesList, action.payload] };
    }

    case ACTIONS.SORT_SERIESLIST: {
      let serieCount = 1;
      const updatedSeriesList = [];

      while (updatedSeriesList.length !== state.seriesList.length) {
        // eslint-disable-next-line no-loop-func
        state.seriesList.forEach((serie) => {
          serie.serieCount = serieCount;
          updatedSeriesList.push(serie);
        });

        serieCount++;
      }

      return { ...state, seriesList: [...updatedSeriesList] };
    }

    case ACTIONS.CLEAR_SERIESLIST_BEFORE_DAY_CHANGING: {
      return { ...state, seriesList: [] };
    }

    case ACTIONS.UPDATE_LASTTIME_DATA: {
      const props = action.payload;
      let currentlyAddingSerieNumber = 0;
      let indexOfLastSerie = 0;
      let updatedLastSerieData = {
        weight: 'First serie',
        reps: 'First serie',
      };
      let updatedLastTrainingData = {
        weight: 'First training',
        reps: 'First training',
      };

      // LAST SERIE DATA

      // SEARCHING FOR LAST SERIE NUMBER
      if (state.seriesList.length !== 0) {
        state.seriesList.forEach((serie, index) => {
          if (serie.serieCount > currentlyAddingSerieNumber) {
            currentlyAddingSerieNumber = serie.serieCount;
            indexOfLastSerie = index;
          }
        });

        updatedLastSerieData = {
          weight: state.seriesList[indexOfLastSerie].weight,
          reps: state.seriesList[indexOfLastSerie].reps,
        };
      }

      // LAST TRAINING DATA

      const potentialSeries = [];
      let previousTrainingSerie = {};
      let previousDateIds = props.dateIds;

      // FILTERING LOCAL STORAGE TO SEARCH A EXERCISE WITH CORRECT EXERCISEID AND NUMBER OF SERIE

      setTimeout(async () => {
        const response = await axios.get('/api/item');

        const items = response.data.items;
        items.forEach((item) => {
          let value = JSON.parse(item.item);

          if (value.exerciseId === props.exerciseId) {
            if (value.serieCount === currentlyAddingSerieNumber + 1) {
              if (
                (value.dateIds.dayId < props.dateIds.dayId &&
                  value.dateIds.monthId < props.dateIds.monthId &&
                  value.dateIds.yearId === props.dateIds.yearId) ||
                (value.dateIds.dayId < props.dateIds.dayId &&
                  value.dateIds.monthId === props.dateIds.monthId &&
                  value.dateIds.yearId === props.dateIds.yearId) ||
                (value.dateIds.dayId >= props.dateIds.dayId &&
                  value.dateIds.monthId < props.dateIds.monthId &&
                  value.dateIds.yearId === props.dateIds.yearId) ||
                (value.dateIds.dayId >= props.dateIds.dayId &&
                  value.dateIds.monthId >= props.dateIds.monthId &&
                  value.dateIds.yearId < props.dateIds.yearId)
              )
                potentialSeries.push(value);
            }
          }
        });

        if (potentialSeries.length !== 0) {
          while (true) {
            previousDateIds = getPreviousTrainingDate(previousDateIds);

            // eslint-disable-next-line no-loop-func
            potentialSeries.forEach((serie) => {
              if (
                JSON.stringify(previousDateIds) ===
                JSON.stringify(serie.dateIds)
              )
                previousTrainingSerie = serie;
            });

            if (previousTrainingSerie.weight !== undefined) {
              updatedLastTrainingData = {
                weight: previousTrainingSerie.weight,
                reps: previousTrainingSerie.reps,
              };
              break;
            }
          }
        }
      });

      return {
        ...state,
        lastTimeData: {
          training: updatedLastTrainingData,
          serie: updatedLastSerieData,
        },
      };
    }

    default:
      return state;
  }
}
