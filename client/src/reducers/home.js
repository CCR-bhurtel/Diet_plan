const countPercentOfEatenIngredient = (eatenAmount, maxAmount) => {
  if (Number.isNaN(Math.round((eatenAmount / maxAmount) * 100))) return 0;
  else return Math.round((eatenAmount / maxAmount) * 100);
};

const countAmountOfIngredientLeft = (eatenAmount, maxAmount) => {
  if (eatenAmount >= maxAmount) return 0;
  else return maxAmount - eatenAmount;
};

const ACTIONS = {
  UPDATE_MEALS_INGREDIENTS_SUMMARY: 'update-meals-ingredients-summary',
  UPDATE_DAILY_INGREDIENTS_SUMMARY: 'update-daily-ingredients-summary',
  COUNT_GAUGES_DATA: 'count-gauges-data',
  CHANGE_DATE: 'change-date',
  CHANGE_PAGE_TITLE: 'change-page-title',
  LOAD_SETTINGS: 'load-settings',

  SET_USER_STATUS: 'set-user-status',
};

const initialState = {
  dateIds: { dayId: 0, monthId: 0, yearId: 0 },
  pageTitle: 'Dashboard',
  loadingSetting: true,

  isAddWindowsEnabled: false,
  isRemoveWindowsEnabled: false,
  isMoreWindowsEnabled: false,

  mealsIngredientsSummary: [],
  dailyIngredientsSummary: { kcal: 0, proteins: 0, fats: 0, carbs: 0 },
  gaugesData: {
    kcal: { eaten: 0, left: 0, max: 0, percent: 0 },
    proteins: { eaten: 0, left: 0, max: 0, percent: 0 },
    fats: { eaten: 0, left: 0, max: 0, percent: 0 },
    carbs: { eaten: 0, left: 0, max: 0, percent: 0 },
  },

  settingsData: {
    main: {},

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
    case ACTIONS.UPDATE_MEALS_INGREDIENTS_SUMMARY: {
      const newMealsIngredientsSummary = [...state.mealsIngredientsSummary];

      newMealsIngredientsSummary[action.payload.mealId] = {
        proteins: action.payload.data.proteins,
        fats: action.payload.data.fats,
        carbs: action.payload.data.carbs,
        kcal: action.payload.data.kcal,
      };

      return {
        ...state,
        mealsIngredientsSummary: newMealsIngredientsSummary,
      };
    }

    case ACTIONS.UPDATE_DAILY_INGREDIENTS_SUMMARY: {
      let dailyIngredientsSum = { proteins: 0, fats: 0, carbs: 0, kcal: 0 };
      let mealsIngredientsSum = { proteins: 0, fats: 0, carbs: 0, kcal: 0 };

      state.mealsIngredientsSummary.forEach((meal) => {
        mealsIngredientsSum = {
          proteins: meal.proteins,
          fats: meal.fats,
          carbs: meal.carbs,
          kcal: meal.kcal,
        };

        dailyIngredientsSum = {
          proteins: dailyIngredientsSum.proteins + mealsIngredientsSum.proteins,
          fats: dailyIngredientsSum.fats + mealsIngredientsSum.fats,
          carbs: dailyIngredientsSum.carbs + mealsIngredientsSum.carbs,
          kcal: dailyIngredientsSum.kcal + mealsIngredientsSum.kcal,
        };

        mealsIngredientsSum = { proteins: 0, fats: 0, carbs: 0, kcalS: 0 };
      });

      return { ...state, dailyIngredientsSummary: dailyIngredientsSum };
    }

    case ACTIONS.COUNT_GAUGES_DATA: {
      const ingredient = action.payload.typeOfIngredient;

      return {
        ...state,
        gaugesData: {
          ...state.gaugesData,
          [ingredient]: {
            eaten: state.dailyIngredientsSummary[ingredient],
            left: countAmountOfIngredientLeft(
              state.dailyIngredientsSummary[ingredient],
              state.settingsData.nutrition.dailyDemand[ingredient]
            ),
            max: state.settingsData.nutrition.dailyDemand[ingredient],
            percent: countPercentOfEatenIngredient(
              state.dailyIngredientsSummary[ingredient],
              state.settingsData.nutrition.dailyDemand[ingredient]
            ),
          },
        },
      };
    }

    case ACTIONS.CHANGE_DATE: {
      return {
        ...state,
        dateIds: {
          dayId: action.payload.currentDay,
          monthId: action.payload.currentMonth,
          yearId: action.payload.currentYear,
        },
      };
    }

    case ACTIONS.CHANGE_PAGE_TITLE: {
      return { ...state, pageTitle: action.payload };
    }

    case ACTIONS.LOAD_SETTINGS: {
      return {
        ...state,
        settingsData: { ...action.payload },
        loadingSetting: false,
      };
    }

    case ACTIONS.SET_USER_STATUS: {
      return { ...state, userStatus: action.payload };
    }

    default:
      return state;
  }
}
