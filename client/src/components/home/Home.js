import React, { memo, useEffect, useReducer } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import './home.css';

import MenuItem from '../left/left';
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

import {
  updateMealSummary,
  updateDailySummary,
  updateGauges,
  updateDateIds,
  changePageTitle,
  handleMenu,
  saveSettingsToLocalStorage,
  loadSettings,
} from '../../actions/homeActions';

function Home({
  auth,
  home,
  updateMealSummary,

  updateGauges,
  updateDateIds,

  handleMenu,
  saveSettingsToLocalStorage,
  loadSettings,
}) {
  const MENU_CATEGORIES = ['Nutrition', 'Training', 'Settings'];

  useEffect(() => {
    console.log('Gauge clicked');
    updateGauges(home);
  }, [home.dateIds]);

  // EFFECT WHICH CHECKS IS SETTINGS ARE SAVED IN LOCAL STORAGE
  useEffect(() => {
    loadSettings(home);
  }, []);

  useEffect(() => {
    if (Object.keys(localStorage).length > 2) loadSettings(home);
    else saveSettingsToLocalStorage(home);

    updateGauges(home);
  }, []);

  const { isAuthenticated, loading, user } = auth;

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
              <h3 className="center-section__top__title">{home.pageTitle}</h3>

              {(home.pageTitle === 'Dashboard' ||
                home.pageTitle === 'Training') && (
                <DateChanger changeDate={updateDateIds} />
              )}
            </section>

            <section className="center-section__main">
              {home.pageTitle === 'Training' &&
                home.settingsData.training.selectedExercises.map(
                  (selectedExerciseId) => {
                    return (
                      <Exercise
                        key={selectedExerciseId}
                        updateGauges={updateGauges}
                        exerciseId={selectedExerciseId}
                        dateIds={home.dateIds}
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

              {home.pageTitle === 'Dashboard' &&
                Object.values(home.settingsData.nutrition.namesOfMeals).map(
                  (meal, index) => {
                    if (home.settingsData.nutrition.numberOfMeals > index)
                      return (
                        <Meal
                          key={index}
                          name={meal}
                          mealId={index}
                          dateIds={home.dateIds}
                          home
                          updateGauges={updateMealSummary}
                        />
                      );
                  }
                )}

              {home.pageTitle === 'Settings' && (
                <>
                  <Settings
                    category="Nutrition"
                    home
                    initialData={home.settingsData.nutrition}
                    updateGauges={updateGauges}
                    // pageTitle={home.pageTitle}
                  />
                  <Settings
                    category="Training"
                    initialData={home.settingsData.training}
                    updateGauges={updateGauges}
                    // pageTitle={home.pageTitle}
                  />
                </>
              )}
            </section>
          </main>

          <aside className="right-section">
            <Gauge
              amount={home.gaugesData.kcal.eaten}
              name="kcal"
              percent={home.gaugesData.kcal.percent}
              left={home.gaugesData.kcal.left}
              isKcal={true}
            />

            <Gauge
              amount={home.gaugesData.proteins.eaten}
              name="proteins"
              percent={home.gaugesData.proteins.percent}
              left={home.gaugesData.proteins.left}
            />

            <Gauge
              amount={home.gaugesData.fats.eaten}
              name="fats"
              percent={home.gaugesData.fats.percent}
              left={home.gaugesData.fats.left}
            />

            <Gauge
              amount={home.gaugesData.carbs.eaten}
              name="carbohydrates"
              percent={home.gaugesData.carbs.percent}
              left={home.gaugesData.carbs.left}
            />
          </aside>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  home: state.home,
});

export default connect(mapStateToProps, {
  updateMealSummary,
  updateDailySummary,
  updateGauges,
  updateDateIds,
  changePageTitle,
  handleMenu,
  saveSettingsToLocalStorage,
  loadSettings,
})(Home);
