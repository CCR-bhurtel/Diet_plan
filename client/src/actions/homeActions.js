const ACTIONS = {
  UPDATE_MEALS_INGREDIENTS_SUMMARY: 'update-meals-ingredients-summary',
  UPDATE_DAILY_INGREDIENTS_SUMMARY: 'update-daily-ingredients-summary',
  COUNT_GAUGES_DATA: 'count-gauges-data',
  CHANGE_DATE: 'change-date',
  CHANGE_PAGE_TITLE: 'change-page-title',
  LOAD_SETTINGS: 'load-settings',
};

export const updateMealSummary = (object, mealId, state) => (dispatch) => {
  dispatch({
    type: ACTIONS.UPDATE_MEALS_INGREDIENTS_SUMMARY,
    payload: { data: object, mealId: mealId },
  });
  dispatch(updateDailySummary(state));
};

export const updateDailySummary = (state) => (dispatch) => {
  dispatch({ type: ACTIONS.UPDATE_DAILY_INGREDIENTS_SUMMARY });
  dispatch(updateGauges(state));
};

export const updateGauges = (state) => (dispatch) => {
  Object.keys(state.settingsData.nutrition.dailyDemand).forEach(
    (ingredient) => {
      dispatch({
        type: ACTIONS.COUNT_GAUGES_DATA,
        payload: { typeOfIngredient: ingredient },
      });
    }
  );
};

export const updateDateIds = (newDateIds) => (dispatch) => {
  dispatch({ type: ACTIONS.CHANGE_DATE, payload: newDateIds });
};

export const changePageTitle = (categoryTitle, state) => (dispatch) => {
  let newPageTitle = '';

  if (categoryTitle === 'Nutrition') newPageTitle = 'Dashboard';
  else newPageTitle = categoryTitle;

  dispatch({ type: ACTIONS.CHANGE_PAGE_TITLE, payload: newPageTitle });
  dispatch({ type: ACTIONS.LOAD_SETTINGS });
  dispatch(updateGauges(state));
};

export const handleMenu = (categoryTitle, state) => (dispatch) => {
  dispatch(changePageTitle(categoryTitle, state));
};

export const saveSettingsToLocalStorage = (state) => (dispatch) => {
  localStorage.setItem('settings', JSON.stringify(state.settingsData));
};

export const loadSettings = (state) => (dispatch) => {
  if (Object.keys(localStorage).length > 0) {
    dispatch({ type: ACTIONS.LOAD_SETTINGS });
  } else dispatch(saveSettingsToLocalStorage());

  dispatch(updateGauges(state));
};
