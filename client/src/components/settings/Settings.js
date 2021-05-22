import { React, useReducer, useEffect, useState } from 'react';
import { exercises } from '../../exercisesList';
import '../../components/product_removing_window/styles/productRemovingWindow.css';
import '../../components/product_adding_window/styles/productAddingWindow.css';
import { connect } from 'react-redux';

import axios from 'axios';

import {
  handleOpening,
  resetOptionsStates,
  saveSettingsToDatabase,
  restoreSettingFromDatabase,
  confirmClearAllProducts,
  cancelClearAllProducts,
  confirmClearAllSeries,
  cancelClearAllSeries,
  handleSettingsSaved,
  handleSettingsCanceled,
  handleExerciseChoosing,
  handleSettingOnChange,
  updateTrainingList,
  setSettingsChangedState,
} from '../../actions/settingsAction';

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

function Settings(props) {
  let state = props.settings;

  const {
    handleOpening,
    resetOptionsStates,
    saveSettingsToDatabase,
    restoreSettingFromDatabase,
    confirmClearAllProducts,
    cancelClearAllProducts,
    confirmClearAllSeries,
    cancelClearAllSeries,
    handleSettingsSaved,
    handleSettingsCanceled,
    handleExerciseChoosing,
    handleSettingOnChange,
    updateTrainingList,
    setSettingsChangedState,
  } = props;
  const initialOptionsStates = {
    'clear-all-products': false,
    'reset-nutrition-to-initial': false,
    'clear-all-series': false,
    'reset-training-to-initial': false,
  };

  const [optionsStates, setOptionsStates] = useState(initialOptionsStates);

  // EFFECT WHICH CHECKS IS SETTINGS ARE SAVED IN LOCAL STORAGE
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    restoreSettingFromDatabase();
  }, []);

  useEffect(() => {
    const uniqueList = [];
    state.settingsData.training.selectedExercises.forEach((id) => {
      if (id == 3 || id == 4 || !uniqueList.includes(id)) {
        uniqueList.push(id);
      }
    });
    updateTrainingList(uniqueList);
  }, [state.settingsData.training.selectedExercises.length]);

  // EFFECT WHICH ENABLE POINTER EVENTS AFTER OPENING CONFIRM WINDOW
  useEffect(() => {
    if (state.clearAllProducts || state.clearAllSeries) {
      const confirmWindow = document.querySelector('.removing-window__confirm');
      confirmWindow.style.pointerEvents = 'auto';
    }
  }, [state.clearAllProducts, state.clearAllSeries]);

  // DISABLES POINTER EVENTS WHEN ONE OF FORM WINDOWS IS OPENED
  useEffect(() => {
    const changePointerEvents = (value) => {
      const meals = document.querySelectorAll('.meal');
      const wrapper = document.querySelector('.wrapper');
      const center = document.querySelector('.center-section');

      meals.forEach((meal) => {
        let buttons = meal.querySelector('.meal__buttons-section');
        buttons.style.pointerEvents = value;
        wrapper.style.pointerEvents = value;

        // DISABLING SCROLL AT CENTER SECTION
        value === 'none'
          ? (center.style.overflowY = 'hidden')
          : (center.style.overflowY = 'auto');
      });
    };

    state.clearAllProducts || state.clearAllSeries
      ? changePointerEvents('none')
      : changePointerEvents('auto');
  }, [state.clearAllProducts, state.clearAllSeries]);

  useEffect(() => {
    props.updateGauges(props.home);
  }, [state.settingsData]);

  // EFFECT WHICH CHECKS IS SETTINGS ARE CHANGED
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.get('/api/setting');

    const databaseSettings = response.data.setting.setting;

    const currentSettings = JSON.stringify(state.settingsData);

    if (databaseSettings === currentSettings) setSettingsChangedState(false);
    else setSettingsChangedState(true);
  }, [state.settingsData]);

  // const resetCheckbox = (idOfCheckbox) => {
  //   document.querySelector('#' + idOfCheckbox).checked = false;
  // };

  const handleCheckboxOnClick = (e) => {
    setOptionsStates((prevOptions) => {
      return { ...prevOptions, [e.target.id]: !optionsStates[e.target.id] };
    });
  };

  return (
    <>
      <div
        className="meal"
        style={
          ((state.category == 'Nutrition') & state.isCategoryOpenedNutrition) |
          ((state.category == 'Training') & state.isCategoryOpenedTraining)
            ? { left: '-10px' }
            : { left: '0px' }
        }
      >
        <section
          className="meal__top-section"
          onClick={() => {
            handleOpening(props.category);
          }}
        >
          <h2 className="meal__top-section__meal-title">{props.category}</h2>
        </section>

        <section
          className="meal__products-section meal__products-section--settings"
          style={
            (state.isCategoryOpenedNutrition &
              (props.category === 'Nutrition')) |
            (state.isCategoryOpenedTraining & (props.category === 'Training'))
              ? { display: 'flex' }
              : { display: 'none' }
          }
        >
          {props.category === 'Nutrition' && (
            <section className="center-section__main__settings">
              {state.clearAllProducts && (
                <section className="removing-window__confirm">
                  <h1 className="removing-window__title">Clear all?</h1>

                  <h3 className="removing-window__confirm__subtitle">
                    Are you sure you want to clear all products?
                  </h3>

                  <section
                    className="removing-window__main__list__buttons-section"
                    style={{ justifyContent: 'flex-end' }}
                  >
                    <div>
                      <button
                        className="removing-window__main__list__buttons-section__secondary"
                        onClick={cancelClearAllProducts}
                      >
                        Cancel
                      </button>
                      <button
                        className="removing-window__main__list__buttons-section__primary"
                        onClick={() => {
                          confirmClearAllProducts(props);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </section>
                </section>
              )}

              <form
                className="adding-window__main__form"
                onSubmit={(e) => {
                  handleSettingsSaved(e, optionsStates, props, state);
                }}
              >
                <section className="adding-window__main__form adding-window__main__form--daily-demand">
                  <h3 className="adding-window__main__form__title">
                    Daily demand
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div className="adding-window__main__form__line adding-window__main__form__line--short">
                      <label
                        className="adding-window__main__form__line__label"
                        htmlFor="proteins"
                      >
                        Proteins
                      </label>
                      <input
                        className="adding-window__main__form__line__input"
                        type="text"
                        id="proteins"
                        value={
                          state.settingsData.nutrition.dailyDemand.proteins
                        }
                        onChange={(e) => {
                          handleSettingOnChange(e, props);
                        }}
                        placeholder="Proteins"
                        maxLength="4"
                      ></input>
                      <span className="adding-window__main__form__line__decoration">
                        g
                      </span>
                      {/*<p className="adding-window__main__form__line__warning">{ props.warning[1] === 'weight' ? props.warning[0] : null }</p>*/}
                    </div>

                    <div className="adding-window__main__form__line adding-window__main__form__line--short">
                      <label
                        className="adding-window__main__form__line__label"
                        htmlFor="fats"
                      >
                        Fats
                      </label>
                      <input
                        className="adding-window__main__form__line__input"
                        type="text"
                        id="fats"
                        value={state.settingsData.nutrition.dailyDemand.fats}
                        onChange={(e) => {
                          handleSettingOnChange(e, props);
                        }}
                        placeholder="Fats"
                        maxLength="4"
                      ></input>
                      <span className="adding-window__main__form__line__decoration">
                        g
                      </span>
                      {/*<p className="adding-window__main__form__line__warning">{ props.warning[1] === 'weight' ? props.warning[0] : null }</p>*/}
                    </div>

                    <div className="adding-window__main__form__line adding-window__main__form__line--short">
                      <label
                        className="adding-window__main__form__line__label"
                        htmlFor="Carbs"
                      >
                        Carbs
                      </label>
                      <input
                        className="adding-window__main__form__line__input"
                        type="text"
                        id="Carbs"
                        value={state.settingsData.nutrition.dailyDemand.carbs}
                        onChange={(e) => {
                          handleSettingOnChange(e, props);
                        }}
                        placeholder="Carbs"
                        maxLength="4"
                      ></input>
                      <span className="adding-window__main__form__line__decoration">
                        g
                      </span>
                      {/*<p className="adding-window__main__form__line__warning">{ props.warning[1] === 'weight' ? props.warning[0] : null }</p>*/}
                    </div>

                    <div className="adding-window__main__form__line adding-window__main__form__line--short">
                      <label
                        className="adding-window__main__form__line__label"
                        htmlFor="kcal"
                      >
                        Calories
                      </label>
                      <input
                        className="adding-window__main__form__line__input"
                        type="text"
                        id="kcal"
                        value={state.settingsData.nutrition.dailyDemand.kcal}
                        onChange={(e) => {
                          handleSettingOnChange(e, props);
                        }}
                        placeholder="Calories"
                        maxLength="4"
                      ></input>
                      <span className="adding-window__main__form__line__decoration">
                        kcal
                      </span>
                      {/*<p className="adding-window__main__form__line__warning">{ props.warning[1] === 'weight' ? props.warning[0] : null }</p>*/}
                    </div>
                  </div>
                </section>

                <section className="adding-window__main__form adding-window__main__form--meals">
                  <h3 className="adding-window__main__form__title">Meals</h3>

                  <div className="adding-window__main__form__line adding-window__main__form__line--short">
                    <label
                      className="adding-window__main__form__line__label"
                      htmlFor="setMealsNumber"
                    >
                      Number of meals
                    </label>

                    <input
                      className="adding-window__main__form__line__input"
                      type="text"
                      id="setMealsNumber"
                      value={state.settingsData.nutrition.numberOfMeals}
                      onChange={(e) => {
                        handleSettingOnChange(e, props);
                      }}
                      maxLength="1"
                    ></input>
                    <span className="adding-window__main__form__line__decoration">
                      meals
                    </span>
                    {/*<p className="adding-window__main__form__line__warning">{ props.warning[1] === 'weight' ? props.warning[0] : null }</p>*/}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    {Object.values(
                      state.settingsData.nutrition.namesOfMeals
                    ).map((meal, index) => {
                      if (state.settingsData.nutrition.numberOfMeals > index) {
                        return (
                          <div
                            key={index}
                            className="adding-window__main__form__line adding-window__main__form__line--normal"
                          >
                            <label
                              className="adding-window__main__form__line__label"
                              htmlFor="editMealName"
                            >{`Meal no. ${index + 1} name: `}</label>
                            <input
                              className="adding-window__main__form__line__input"
                              data-key={index}
                              type="text"
                              id="editMealName"
                              value={
                                state.settingsData.nutrition.namesOfMeals[index]
                              }
                              onChange={(e) => {
                                handleSettingOnChange(e, props);
                              }}
                              required
                            ></input>
                            {/*<p className="adding-window__main__form__line__warning">{ props.warning[1] === 'weight' ? props.warning[0] : null }</p>*/}
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </section>

                <section className="adding-window__main__form adding-window__main__form--options">
                  <h3 className="adding-window__main__form__title">Options</h3>

                  <div className="adding-window__main__form__line adding-window__main__form__line--checkbox">
                    <label
                      className="adding-window__main__form__line__label adding-window__main__form__line__label--options"
                      htmlFor="clearAllProducts"
                    >
                      Clear all products
                    </label>
                    <button
                      className="adding-window__main__form__background"
                      id="clear-all-products"
                      type="button"
                      onClick={handleCheckboxOnClick}
                    >
                      <div
                        className="adding-window__main__form__background__checked"
                        id="clear-all-products"
                        style={
                          optionsStates['clear-all-products']
                            ? { backgroundColor: '#08c096' }
                            : { backgroundColor: 'transparent' }
                        }
                      ></div>
                    </button>
                  </div>

                  <div className="adding-window__main__form__line adding-window__main__form__line--checkbox">
                    <label
                      className="adding-window__main__form__line__label adding-window__main__form__line__label--options"
                      htmlFor="resetNutritionSettingsToInitial"
                    >
                      Reset nutrition settings to initial
                    </label>
                    <button
                      className="adding-window__main__form__background"
                      id="reset-nutrition-to-initial"
                      type="button"
                      onClick={handleCheckboxOnClick}
                    >
                      <div
                        className="adding-window__main__form__background__checked"
                        id="reset-nutrition-to-initial"
                        style={
                          optionsStates['reset-nutrition-to-initial']
                            ? { backgroundColor: '#08c096' }
                            : { backgroundColor: 'transparent' }
                        }
                      ></div>
                    </button>
                  </div>
                </section>

                <section
                  className="meal__buttons-section meal__buttons-section--settings"
                  style={
                    (state.isCategoryOpenedNutrition &
                      (props.category === 'Nutrition')) |
                    (state.isCategoryOpenedTraining &
                      (props.category === 'Training'))
                      ? { display: 'flex' }
                      : { display: 'none' }
                  }
                >
                  <div>
                    <button
                      className={
                        state.isSettingsChanged
                          ? 'meal__buttons-section__remove-button'
                          : 'meal__buttons-section__remove-button meal__buttons-section__remove-button--disabled'
                      }
                      onClick={(e) => {
                        handleSettingOnChange(e, props);
                      }}
                      type="button"
                      disabled={state.isSettingsChanged ? false : true}
                    >
                      Cancel
                    </button>

                    <button
                      className="meal__buttons-section__add-button"
                      type="submit"
                      value="Save"
                      id="saveSettings"
                    >
                      Save
                    </button>
                  </div>
                </section>
              </form>
            </section>
          )}

          {props.category === 'Training' && (
            <section className="center-section__main__settings">
              {state.clearAllSeries && (
                <section className="removing-window__confirm">
                  <h1 className="removing-window__title">Clear all?</h1>

                  <h3 className="removing-window__confirm__subtitle">
                    Are you sure you want to clear all series?
                  </h3>

                  <section
                    className="removing-window__main__list__buttons-section"
                    style={{ justifyContent: 'flex-end' }}
                  >
                    <div>
                      <button
                        className="removing-window__main__list__buttons-section__secondary"
                        onClick={cancelClearAllSeries}
                      >
                        Cancel
                      </button>
                      <button
                        className="removing-window__main__list__buttons-section__primary"
                        onClick={confirmClearAllSeries}
                      >
                        Remove
                      </button>
                    </div>
                  </section>
                </section>
              )}

              <form
                className="center-section__main__settings__form"
                onSubmit={(e) => {
                  handleSettingsSaved(e, optionsStates, props, state);
                }}
              >
                <section className="adding-window__main__form adding-window__main__form--exercises">
                  <h3 className="adding-window__main__form__title">
                    Choose exercises
                  </h3>
                  {exercises.map((exercise) => {
                    return (
                      <div
                        key={exercise.id}
                        className="adding-window__main__form__line adding-window__main__form__line--checkbox"
                      >
                        <label
                          className="adding-window__main__form__line__label adding-window__main__form__line__label--options"
                          htmlFor={'exercise' + exercise.id}
                        >
                          {exercise.name}:
                        </label>
                        <button
                          className="adding-window__main__form__background"
                          id={'exercise' + exercise.id}
                          type="button"
                          onClick={handleExerciseChoosing}
                        >
                          <div
                            className="adding-window__main__form__background__checked"
                            id={'exercise' + exercise.id}
                            style={
                              state.settingsData.training.selectedExercises.includes(
                                exercise.id
                              )
                                ? { backgroundColor: '#08c096' }
                                : { backgroundColor: 'transparent' }
                            }
                          ></div>
                        </button>
                      </div>
                    );
                  })}
                </section>

                <section className="adding-window__main__form adding-window__main__form--options">
                  <h3 className="adding-window__main__form__title">Options</h3>

                  <div className="adding-window__main__form__line adding-window__main__form__line--checkbox">
                    <label
                      className="adding-window__main__form__line__label adding-window__main__form__line__label--options"
                      htmlFor="clear-all-series"
                    >
                      Clear all series
                    </label>
                    <button
                      className="adding-window__main__form__background"
                      id="clear-all-series"
                      type="button"
                      onClick={handleCheckboxOnClick}
                    >
                      <div
                        className="adding-window__main__form__background__checked"
                        id="clear-all-series"
                        style={
                          optionsStates['clear-all-series']
                            ? { backgroundColor: '#08c096' }
                            : { backgroundColor: 'transparent' }
                        }
                      ></div>
                    </button>
                  </div>

                  <div className="adding-window__main__form__line adding-window__main__form__line--checkbox">
                    <label
                      className="adding-window__main__form__line__label adding-window__main__form__line__label--options"
                      htmlFor="reset-training-to-initial"
                    >
                      Reset training settings to initial
                    </label>
                    <button
                      className="adding-window__main__form__background"
                      id="reset-training-to-initial"
                      type="button"
                      onClick={handleCheckboxOnClick}
                    >
                      <div
                        className="adding-window__main__form__background__checked"
                        id="reset-training-to-initial"
                        style={
                          optionsStates['reset-training-to-initial']
                            ? { backgroundColor: '#08c096' }
                            : { backgroundColor: 'transparent' }
                        }
                      ></div>
                    </button>
                  </div>
                </section>

                <section
                  className="meal__buttons-section meal__buttons-section--settings"
                  style={
                    (state.isCategoryOpenedNutrition &
                      (props.category === 'Nutrition')) |
                    (state.isCategoryOpenedTraining &
                      (props.category === 'Training'))
                      ? { display: 'flex' }
                      : { display: 'none' }
                  }
                >
                  <div>
                    <button
                      className={
                        state.isSettingsChanged
                          ? 'meal__buttons-section__remove-button'
                          : 'meal__buttons-section__remove-button meal__buttons-section__remove-button--disabled'
                      }
                      onClick={(e) => {
                        handleSettingsCanceled(e, props, optionsStates);
                      }}
                      type="button"
                      disabled={state.isSettingsChanged ? false : true}
                    >
                      Cancel
                    </button>

                    <button
                      className="meal__buttons-section__add-button"
                      type="submit"
                      value="Save"
                      id="saveSettings"
                    >
                      Save
                    </button>
                  </div>
                </section>
              </form>
            </section>
          )}
        </section>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  home: state.home,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  handleOpening,
  resetOptionsStates,
  saveSettingsToDatabase,
  restoreSettingFromDatabase,
  confirmClearAllProducts,
  cancelClearAllProducts,
  confirmClearAllSeries,
  cancelClearAllSeries,
  handleSettingsSaved,
  handleSettingsCanceled,
  handleExerciseChoosing,
  handleSettingOnChange,
  updateTrainingList,
  setSettingsChangedState,
})(Settings);
