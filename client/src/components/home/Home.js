import React, { useEffect, useReducer } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import './home.css';

import { MenuItem } from '../left/left';
import DateChanger from '../center/DateChanger';
import Meal from '../meal/meal';
import Gauge from '../right/Gauge';
import Exercise from '../exercise/Exercise';
import Settings from '../settings/Settings';

// import Login from '../login/Login';
import { exercises } from '../../exercisesList';
import '../../styles/index/index.css';
import '../left/styles/left.css';
import '../center/styles/center.css';
import '../right/styles/right.css';

const ACTIONS = {
  UPDATE_MEALS_INGREDIENTS_SUMMARY: 'update-meals-ingredients-summary',
  UPDATE_DAILY_INGREDIENTS_SUMMARY: 'update-daily-ingredients-summary',
  COUNT_GAUGES_DATA: 'count-gauges-data',
  CHANGE_DATE: 'change-date',
  CHANGE_PAGE_TITLE: 'change-page-title',
  LOAD_SETTINGS: 'load-settings',

  SET_USER_STATUS: 'set-user-status',
};

const countPercentOfEatenIngredient = (eatenAmount, maxAmount) => {
  if (Number.isNaN(Math.round((eatenAmount / maxAmount) * 100))) return 0;
  else return Math.round((eatenAmount / maxAmount) * 100);
};

const countAmountOfIngredientLeft = (eatenAmount, maxAmount) => {
  if (eatenAmount >= maxAmount) return 0;
  else return maxAmount - eatenAmount;
};

function Home({ auth }) {
  const reducer = (state, action) => {
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
            proteins:
              dailyIngredientsSum.proteins + mealsIngredientsSum.proteins,
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
        let newSettings = JSON.parse(localStorage.getItem('settings'));
        return { ...state, settingsData: newSettings };
      }

      case ACTIONS.SET_USER_STATUS: {
        return { ...state, userStatus: action.payload };
      }

      default:
        return console.error(`Unknown action type: ${action.type}`);
    }
  };

  const initialState = {
    dateIds: { dayId: 0, monthId: 0, yearId: 0 },
    pageTitle: 'Dashboard',

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

  const [state, dispatch] = useReducer(reducer, initialState);

  const MENU_CATEGORIES = ['Nutrition', 'Training', 'Settings'];

  useEffect(() => {
    updateGauges();
  }, [state.dateIds]);

  // EFFECT WHICH CHECKS IS SETTINGS ARE SAVED IN LOCAL STORAGE
  useEffect(() => {
    if (Object.keys(localStorage).length !== 0)
      dispatch({ type: ACTIONS.LOAD_SETTINGS });
    else saveSettingsToLocalStorage();

    updateGauges();
  }, []);

  const updateMealSummary = (object, mealId) => {
    dispatch({
      type: ACTIONS.UPDATE_MEALS_INGREDIENTS_SUMMARY,
      payload: { data: object, mealId: mealId },
    });
    updateDailySummary();
  };

  const updateDailySummary = () => {
    dispatch({ type: ACTIONS.UPDATE_DAILY_INGREDIENTS_SUMMARY });
    updateGauges();
  };

  const updateGauges = () => {
    Object.keys(state.settingsData.nutrition.dailyDemand).forEach(
      (ingredient) => {
        dispatch({
          type: ACTIONS.COUNT_GAUGES_DATA,
          payload: { typeOfIngredient: ingredient },
        });
      }
    );
  };

  const updateDateIds = (newDateIds) => {
    dispatch({ type: ACTIONS.CHANGE_DATE, payload: newDateIds });
  };

  const changePageTitle = (categoryTitle) => {
    let newPageTitle = '';

    if (categoryTitle === 'Nutrition') newPageTitle = 'Dashboard';
    else newPageTitle = categoryTitle;

    dispatch({ type: ACTIONS.CHANGE_PAGE_TITLE, payload: newPageTitle });
    dispatch({ type: ACTIONS.LOAD_SETTINGS });
    updateGauges();
  };

  const handleMenu = (categoryTitle) => {
    changePageTitle(categoryTitle);
  };

  const saveSettingsToLocalStorage = () => {
    localStorage.setItem('settings', JSON.stringify(state.settingsData));
  };

  const setUserStatus = (newStatus) => {
    dispatch({ type: ACTIONS.SET_USER_STATUS, payload: newStatus });
  };
  console.log(auth);
  const { isAuthenticated, loading, user } = auth;
  console.log(user);

  if (loading & !user) {
    return <Spinner />;
  } else if (!isAuthenticated) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="home">
        <div className="wrapper">
          <main className="center-section">
            <div className="left-section">
              <ul className="left-section__menu-container">
                {MENU_CATEGORIES.map((category, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={category}
                      href=""
                      isActive={false}
                      linkTo={handleMenu}
                    />
                  );
                })}
              </ul>
            </div>
            <section className="center-section__top">
              <h3 className="center-section__top__title">{state.pageTitle}</h3>

              {(state.pageTitle === 'Dashboard' ||
                state.pageTitle === 'Training') && (
                <DateChanger changeDate={updateDateIds} />
              )}
            </section>

            <section className="center-section__main">
              {state.pageTitle === 'Training' &&
                state.settingsData.training.selectedExercises.map(
                  (selectedExerciseId) => {
                    return (
                      <Exercise
                        key={selectedExerciseId}
                        exerciseId={selectedExerciseId}
                        dateIds={state.dateIds}
                        name={exercises[selectedExerciseId].name}
                        difficulty={exercises[selectedExerciseId].difficulty}
                        description={exercises[selectedExerciseId].description}
                        muscles={exercises[selectedExerciseId].muscles}
                        typeOfExercise={
                          exercises[selectedExerciseId].typeOfExercise
                        }
                        properFormLink={
                          exercises[selectedExerciseId].properFormLink
                        }
                      ></Exercise>
                    );
                  }
                )}

              {state.pageTitle === 'Dashboard' &&
                Object.values(state.settingsData.nutrition.namesOfMeals).map(
                  (meal, index) => {
                    if (state.settingsData.nutrition.numberOfMeals > index)
                      return (
                        <Meal
                          key={index}
                          name={meal}
                          mealId={index}
                          dateIds={state.dateIds}
                          updateGauges={updateMealSummary}
                        />
                      );
                  }
                )}

              {state.pageTitle === 'Settings' && (
                <>
                  <Settings
                    category="Account"
                    updateGauges={updateGauges}
                    pageTitle={state.pageTitle}
                  />
                  <Settings
                    category="Nutrition"
                    initialData={initialState.settingsData.nutrition}
                    updateGauges={updateGauges}
                    pageTitle={state.pageTitle}
                  />
                  <Settings
                    category="Training"
                    initialData={initialState.settingsData.training}
                    updateGauges={updateGauges}
                    pageTitle={state.pageTitle}
                  />
                </>
              )}
            </section>
          </main>

          <aside className="right-section">
            <Gauge
              amount={state.gaugesData.kcal.eaten}
              name="kcal"
              percent={state.gaugesData.kcal.percent}
              left={state.gaugesData.kcal.left}
              isKcal={true}
            />

            <Gauge
              amount={state.gaugesData.proteins.eaten}
              name="proteins"
              percent={state.gaugesData.proteins.percent}
              left={state.gaugesData.proteins.left}
            />

            <Gauge
              amount={state.gaugesData.fats.eaten}
              name="fats"
              percent={state.gaugesData.fats.percent}
              left={state.gaugesData.fats.left}
            />

            <Gauge
              amount={state.gaugesData.carbs.eaten}
              name="carbohydrates"
              percent={state.gaugesData.carbs.percent}
              left={state.gaugesData.carbs.left}
            />
          </aside>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
