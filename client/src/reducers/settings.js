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

const initialState = {
  isCategoryOpenedTraining: false,
  isCategoryOpenedNutrition: false,
  settingsData: {
    account: {},

    nutrition: {
      dailyDemand: { kcal: 2000, proteins: 120, fats: 55, carbs: 240 },
      namesOfMeals: {
        0: 'Breakfast',
        1: 'II Breakfast',
        2: 'Lunch',
        3: 'Snack',
        4: 'Dinner',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
      },
      numberOfMeals: 5,
    },

    training: {
      selectedExercises: [0, 1, 2, 3, 5],
    },
  },
  clearAllProducts: false,
  clearAllSeries: false,
  isSettingsChanged: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.NEGATE_CATEGORY_OPENED: {
      // eslint-disable-next-line default-case
      switch (action.payload) {
        case 'Training':
          return {
            ...state,
            isCategoryOpenedTraining: !state.isCategoryOpenedTraining,
          };
        case 'Nutrition':
          return {
            ...state,
            isCategoryOpenedNutrition: !state.isCategoryOpenedNutrition,
          };
        default:
          return state;
      }
    }

    case ACTIONS.UPDATE_TRAINING_LIST:
      return {
        ...state,
        settingsData: {
          ...state.settingsData,
          training: { selectedExercises: action.payload },
        },
      };
    case ACTIONS.CHANGE_SETTINGS_DATA: {
      switch (action.payload.key) {
        case 'editMealName': {
          return {
            ...state,
            settingsData: {
              ...state.settingsData,
              nutrition: {
                ...state.settingsData.nutrition,
                namesOfMeals: {
                  ...state.settingsData.nutrition.namesOfMeals,
                  [action.payload.index]: action.payload.value,
                },
              },
            },
          };
        }

        case 'setMealsNumber': {
          return {
            ...state,
            settingsData: {
              ...state.settingsData,
              nutrition: {
                ...state.settingsData.nutrition,
                numberOfMeals: action.payload.value,
              },
            },
          };
        }

        default:
          return {
            ...state,
            settingsData: {
              ...state.settingsData,
              nutrition: {
                ...state.settingsData.nutrition,
                dailyDemand: {
                  ...state.settingsData.nutrition.dailyDemand,
                  [action.payload.key]: action.payload.value,
                },
              },
            },
          };
      }
    }

    case ACTIONS.LOAD_SETTINGS: {
      return { ...state, settingsData: action.payload };
    }

    case ACTIONS.SET_CLEAR_ALL_PRODUCTS: {
      return { ...state, clearAllProducts: action.payload };
    }

    case ACTIONS.SET_CLEAR_ALL_SERIES: {
      return { ...state, clearAllSeries: action.payload };
    }

    case ACTIONS.ADD_EXERCISE_TO_SELECTEDEXERCISES: {
      const updatedSelectedExercises =
        state.settingsData.training.selectedExercises;
      updatedSelectedExercises.push(action.payload);

      return {
        ...state,
        settingsData: {
          ...state.settingsData,
          training: {
            ...state.settingsData.training,
            selectedExercises: updatedSelectedExercises,
          },
        },
      };
    }

    case ACTIONS.REMOVE_EXERCISE_FROM_SELECTEDEXERCISES: {
      const updatedSelectedExercises =
        state.settingsData.training.selectedExercises;
      const indexOfExerciseToRemoving = updatedSelectedExercises.indexOf(
        action.payload
      );
      updatedSelectedExercises.splice(indexOfExerciseToRemoving, 1);

      return {
        ...state,
        settingsData: {
          ...state.settingsData,
          training: {
            ...state.settingsData.training,
            selectedExercises: updatedSelectedExercises,
          },
        },
      };
    }

    case ACTIONS.SET_SETTINGS_CHANGED_STATE: {
      return { ...state, isSettingsChanged: action.payload };
    }

    case ACTIONS.RESET_NUTRITION_SETTINGS_TO_INITIAL: {
      const props = action.payload;
      return {
        ...state,
        settingsData: { ...state.settingsData, nutrition: props.initialData },
      };
    }

    case ACTIONS.RESET_TRAINING_SETTINGS_TO_INITIAL: {
      const props = action.payload;
      return {
        ...state,
        settingsData: { ...state.settingsData, training: props.initialData },
      };
    }

    default:
      return state;
  }
}
