// IMPORTS

import axios from 'axios';
import { React, useState, useEffect, useReducer, memo } from 'react';
import { connect } from 'react-redux';
import AddWindow from '../product_adding_window/ProductAddingWindow';
import RemoveWindow from '../product_removing_window/ProductRemovingWindow';
import './styles/meal.css';

export const warnings = {
  name: 'Name must be a string of letters only',
  weight: 'Weight must be a positive number',
  macros: 'Macronutrient must be a number',
};

const ACTIONS = {
  ADD_NEW_LISTS: 'add_new_lists',
  NEGATE_MEAL_STATE: 'negate-meal-state',
  NEGATE_ADDING_WINDOW_STATE: 'negate-adding-window-state',
  NEGATE_REMOVING_WINDOW_STATE: 'negate-removing-window-state',
  ADD_PRODUCT: 'add-product',
  ENABLE_PLACEHOLDER: 'enable-placeholder',
  DISABLE_PLACEHOLDER: 'disable-placeholder',
  SET_WARNING: 'set-warning',
  CLEAR_WARNING: 'clear-warning',
  REMOVE_PRODUCT: 'remove-product',
  ADD_TO_SUMMARY: 'add-to-summary',
  SUB_FROM_SUMMARY: 'sub-from-summary',
  CLEAR_PRODUCTLIST_BEFORE_DAY_CHANGING:
    'clear-productlist-before-day-changing',
  ADD_PRODUCT_TO_PRODUCTLIST: 'add-product-to-productlist',
};

// COMPONENTS

const Meal = (props) => {
  // REDUCER STUFF
  const initialState = {
    isMealOpened: false,
    isAddingWindowOpened: false,
    isRemovingWindowOpened: false,
    countIngredients: false,
    productList: [],
    newProduct: {
      id: 0,
      mealId: props.mealId,
      dateIds: { dayId: 0, monthId: 0, yearId: 0 },
      name: '',
      weight: '',
      proteins: '',
      fats: '',
      carbs: '',
      kcal: '',
    },
    warning: ['', ''],
    summary: {
      proteins: 0,
      fats: 0,
      carbs: 0,
      kcal: 0,
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.ADD_NEW_LISTS:
        return {
          ...state,
          productList: [...action.payload],
        };
      case ACTIONS.NEGATE_MEAL_STATE:
        return { ...state, isMealOpened: !state.isMealOpened };

      case ACTIONS.NEGATE_ADDING_WINDOW_STATE:
        return { ...state, isAddingWindowOpened: !state.isAddingWindowOpened };

      case ACTIONS.NEGATE_REMOVING_WINDOW_STATE:
        return {
          ...state,
          isRemovingWindowOpened: !state.isRemovingWindowOpened,
        };

      case ACTIONS.CHANGE_NEW_PRODUCT_DATA: {
        // eslint-disable-next-line default-case
        switch (action.payload.key) {
          case 'name':
            return {
              ...state,
              newProduct: { ...state.newProduct, name: action.payload.value },
            };
          case 'weight':
            return {
              ...state,
              newProduct: { ...state.newProduct, weight: action.payload.value },
            };
          case 'proteins':
            return {
              ...state,
              newProduct: {
                ...state.newProduct,
                proteins: action.payload.value,
              },
            };
          case 'fats':
            return {
              ...state,
              newProduct: { ...state.newProduct, fats: action.payload.value },
            };
          case 'carbs':
            return {
              ...state,
              newProduct: { ...state.newProduct, carbs: action.payload.value },
            };
          case 'kcal':
            return {
              ...state,
              newProduct: { ...state.newProduct, kcal: action.payload.value },
            };
        }
      }

      // eslint-disable-next-line no-fallthrough
      case ACTIONS.ADD_PRODUCT: {
        return {
          ...state,
          newProduct: {
            id: 0,
            mealId: props.mealId,
            dateIds: { dayId: 0, monthId: 0, yearId: 0 },
            name: '',
            weight: '',
            proteins: '',
            fats: '',
            carbs: '',
            kcal: '',
          },
        };
      }

      // eslint-disable-next-line no-fallthrough
      case ACTIONS.SET_WARNING: {
        switch (action.payload) {
          case 'name':
            return { ...state, warning: [warnings.name, action.payload] };
          case 'weight':
            return { ...state, warning: [warnings.weight, action.payload] };
          default:
            return { ...state, warning: [warnings.macros, action.payload] };
        }
      }

      case ACTIONS.CLEAR_WARNING: {
        return { ...state, warning: ['', action.payload] };
      }

      case ACTIONS.REMOVE_PRODUCT: {
        let newProductList = state.productList;
        let checkedIdList = action.payload;

        checkedIdList.forEach((checkedId) => {
          newProductList.forEach(async (product, index) => {
            if (Number(product.id) === Number(checkedId)) {
              newProductList.splice(index, 1);
              const response = await axios.put('/api/item', {
                itemId: product.id,
              });
            }
          });
        });
        return { ...state, productList: newProductList };
      }

      case ACTIONS.ADD_TO_SUMMARY: {
        // eslint-disable-next-line default-case
        switch (action.payload.ingredient) {
          case 'proteins':
            return {
              ...state,
              summary: {
                ...state.summary,
                proteins: state.summary.proteins + Number(action.payload.value),
              },
            };
          case 'fats':
            return {
              ...state,
              summary: {
                ...state.summary,
                fats: state.summary.fats + Number(action.payload.value),
              },
            };
          case 'carbs':
            return {
              ...state,
              summary: {
                ...state.summary,
                carbs: state.summary.carbs + Number(action.payload.value),
              },
            };
          case 'kcal':
            return {
              ...state,
              summary: {
                ...state.summary,
                kcal: state.summary.kcal + Number(action.payload.value),
              },
            };
        }
      }

      // eslint-disable-next-line no-fallthrough
      case ACTIONS.SUB_FROM_SUMMARY: {
        // eslint-disable-next-line default-case
        switch (action.payload.ingredient) {
          case 'proteins':
            return {
              ...state,
              summary: {
                ...state.summary,
                proteins: state.summary.proteins - Number(action.payload.value),
              },
            };
          case 'fats':
            return {
              ...state,
              summary: {
                ...state.summary,
                fats: state.summary.fats - Number(action.payload.value),
              },
            };
          case 'carbs':
            return {
              ...state,
              summary: {
                ...state.summary,
                carbs: state.summary.carbs - Number(action.payload.value),
              },
            };
          case 'kcal':
            return {
              ...state,
              summary: {
                ...state.summary,
                kcal: state.summary.kcal - Number(action.payload.value),
              },
            };
        }
      }

      // eslint-disable-next-line no-fallthrough
      case ACTIONS.ADD_PRODUCT_TO_PRODUCTLIST: {
        return {
          ...state,
          productList: [...state.productList, action.payload],
        };
      }

      case ACTIONS.CLEAR_PRODUCTLIST_BEFORE_DAY_CHANGING: {
        return { ...state, productList: [] };
      }

      default:
        return console.error(`Unknown action type: ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPlaceholderEnabled, setPlaceholderState] = useState(false);

  // LOADS DATA FROM LOCAL STORAGE AFTER DAY CHANGE
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.get('/api/item');

    const items = response.data.items;

    items.forEach((item) => {
      let value = JSON.parse(item.item);
      if (
        value.mealId === props.mealId &&
        value.dateIds.dayId === props.dateIds.dayId &&
        value.dateIds.monthId === props.dateIds.monthId &&
        value.dateIds.yearId === props.dateIds.yearId
      )
        dispatch({
          type: ACTIONS.ADD_PRODUCT_TO_PRODUCTLIST,
          payload: value,
        });
    });
  }, [props.dateIds]);

  // CLEARS PRODUCTLIST AFTER DAY CHANGE
  useEffect(() => {
    return () =>
      dispatch({ type: ACTIONS.CLEAR_PRODUCTLIST_BEFORE_DAY_CHANGING });
  }, [props.dateIds]);

  useEffect(() => {
    const uniqueListIds = [];
    const uniqueList = [];
    state.productList.map(async (product) => {
      if (!uniqueListIds.includes(product.id)) {
        uniqueListIds.push(product.id);
        uniqueList.push(product);
      }
      dispatch({ type: ACTIONS.ADD_NEW_LISTS, payload: uniqueList });
    });
  }, [state.productList.length]);
  // CLOSES WINDOWS AFTER DAY CHANGE
  useEffect(() => {
    const disableVisibilityIfEnabled = (state, action) => {
      if (state) dispatch({ type: action });
    };

    disableVisibilityIfEnabled(state.isMealOpened, ACTIONS.NEGATE_MEAL_STATE);
    disableVisibilityIfEnabled(
      state.isAddingWindowOpened,
      ACTIONS.NEGATE_ADDING_WINDOW_STATE
    );
    disableVisibilityIfEnabled(
      state.isRemovingWindowOpened,
      ACTIONS.NEGATE_REMOVING_WINDOW_STATE
    );
  }, [props.dateIds]);

  // SENDS DATA FROM MEAL TO GAUGES
  useEffect(() => {
    props.updateGauges(state.summary, props.mealId, props.home);
  }, [state.summary, props.home.dateIds]);

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

    state.isAddingWindowOpened || state.isRemovingWindowOpened
      ? changePointerEvents('none')
      : changePointerEvents('auto');
  }, [state.isAddingWindowOpened, state.isRemovingWindowOpened]);

  const handleMealOpening = () => {
    dispatch({ type: ACTIONS.NEGATE_MEAL_STATE });
  };

  const handleAddingToSummary = (object) => {
    Object.keys(object).forEach((key) => {
      dispatch({
        type: ACTIONS.ADD_TO_SUMMARY,
        payload: {
          ingredient: key,
          value: object[key],
        },
      });
    });
  };

  const handleSubstractingFromSummary = (object) => {
    Object.keys(object).forEach((key) => {
      dispatch({
        type: ACTIONS.SUB_FROM_SUMMARY,
        payload: {
          ingredient: key,
          value: object[key],
        },
      });
    });
  };

  const handleAddWindow = () => {
    dispatch({ type: ACTIONS.NEGATE_ADDING_WINDOW_STATE });
  };

  const handleRemoveWindow = () => {
    dispatch({ type: ACTIONS.NEGATE_REMOVING_WINDOW_STATE });
  };

  const handleProductAdding = async (e) => {
    e.preventDefault();

    state.newProduct.id = Date.now() * Math.random() * 100;
    state.newProduct.dateIds = props.dateIds;
    state.productList.push(state.newProduct);

    await axios.post('/api/item', {
      itemId: state.newProduct.id,
      item: JSON.stringify(state.newProduct),
    });
    dispatch({ type: ACTIONS.ADD_PRODUCT });

    dispatch({ type: ACTIONS.NEGATE_ADDING_WINDOW_STATE });
  };

  const handlePredefinedProductsAdding = (selectedProducts) => {
    selectedProducts.forEach(async (product) => {
      // TIMEOUT TO PREVENT DOUBLED IDS

      Object.keys(product).forEach((key) => {
        dispatch({
          type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
          payload: { key: key, value: product[key] },
        });
      });

      let id = Date.now() * Math.random() * 100;

      const newProduct = {
        ...product,
        id,
        dateIds: props.dateIds,
        mealId: props.mealId,
      };

      axios.post('/api/item', {
        itemId: id,
        item: JSON.stringify(newProduct),
      });
      state.productList.push(newProduct);

      dispatch({ type: ACTIONS.ADD_PRODUCT });
    });

    // eslint-disable-next-line no-lone-blocks

    dispatch({ type: ACTIONS.NEGATE_ADDING_WINDOW_STATE });
  };

  const handleProductRemoving = (checkedIdsList) => {
    dispatch({ type: ACTIONS.REMOVE_PRODUCT, payload: checkedIdsList });
    dispatch({ type: ACTIONS.NEGATE_REMOVING_WINDOW_STATE });
  };

  const handleFormClearing = () => {
    dispatch({
      type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
      payload: { key: 'name', value: '' },
    });
    dispatch({
      type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
      payload: { key: 'weight', value: '' },
    });
    dispatch({
      type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
      payload: { key: 'proteins', value: '' },
    });
    dispatch({
      type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
      payload: { key: 'fats', value: '' },
    });
    dispatch({
      type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
      payload: { key: 'carbs', value: '' },
    });
    dispatch({
      type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
      payload: { key: 'kcal', value: '' },
    });
    setPlaceholderState(false);
  };

  const handleOnChange = (e) => {
    const isNumber = /[0-9]/;
    const isWord = /[a-z\s]/i;
    const isZero = /^[0]{1}/;

    const setValueAsZero = () => {
      dispatch({
        type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
        payload: { key: e.target.id, value: '0' },
      });
      dispatch({ type: ACTIONS.CLEAR_WARNING, payload: e.target.id });
    };

    const setValueAsNull = () => {
      dispatch({
        type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
        payload: { key: e.target.id, value: '' },
      });
      dispatch({ type: ACTIONS.SET_WARNING, payload: e.target.id });
    };

    const setValueAsCorrect = () => {
      dispatch({
        type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
        payload: { key: e.target.id, value: e.target.value },
      });
      dispatch({ type: ACTIONS.CLEAR_WARNING, payload: e.target.id });
    };

    if (e.target.id === 'name') {
      isWord.test(e.target.value[e.target.value.length - 1])
        ? setValueAsCorrect()
        : setValueAsNull();
    } else {
      if (isNumber.test(e.target.value[e.target.value.length - 1])) {
        if (isZero.test(e.target.value))
          e.target.id === 'weight' ? setValueAsNull() : setValueAsZero();
        else setValueAsCorrect();
      } else {
        setValueAsNull();
      }
    }
  };

  return (
    <div
      className="meal"
      style={state.isMealOpened ? { left: '-10px' } : { left: '0px' }}
    >
      <section className="meal__top-section" onClick={handleMealOpening}>
        <h2 className="meal__top-section__meal-title">{props.name}</h2>

        <ul className="meal__top-section__meal-stats-list">
          <li className="meal__top-section__meal-stats-list__item">
            {state.summary.proteins} g
          </li>
          <li className="meal__top-section__meal-stats-list__item">
            {state.summary.fats} g
          </li>
          <li className="meal__top-section__meal-stats-list__item">
            {state.summary.carbs} g
          </li>
          <li className="meal__top-section__meal-stats-list__item">
            {state.summary.kcal} kcal
          </li>
        </ul>
      </section>

      {state.productList.length !== 0 ? (
        <section
          className="meal__products-section"
          style={state.isMealOpened ? { display: 'flex' } : { display: 'none' }}
        >
          {state.productList.map((product) => {
            return (
              <Product
                key={product.id}
                name={product.name}
                weight={product.weight}
                proteins={product.proteins}
                fats={product.fats}
                carbs={product.carbs}
                kcal={product.kcal}
                addIngredientsFunction={handleAddingToSummary}
                subIngredientsFunction={handleSubstractingFromSummary}
              ></Product>
            );
          })}
        </section>
      ) : null}

      <section
        className="meal__buttons-section"
        style={state.isMealOpened ? { display: 'flex' } : { display: 'none' }}
      >
        <div>
          <button
            className={
              state.productList.length
                ? 'meal__buttons-section__remove-button'
                : 'meal__buttons-section__remove-button--disabled'
            }
            onClick={state.productList.length ? handleRemoveWindow : null}
            disabled={
              state.isAddingWindowOpened || state.isRemovingWindowOpened
                ? true
                : false
            }
          >
            Remove
          </button>

          <button
            className="meal__buttons-section__add-button"
            onClick={handleAddWindow}
            disabled={
              state.isAddingWindowOpened || state.isRemovingWindowOpened
                ? true
                : false
            }
          >
            Add
          </button>
        </div>
      </section>

      {state.isAddingWindowOpened ? (
        <AddWindow
          data={{
            isPlaceholderEnabled: isPlaceholderEnabled,
            name: state.newProduct.name,
            weight: state.newProduct.weight,
            proteins: state.newProduct.proteins,
            fats: state.newProduct.fats,
            carbs: state.newProduct.carbs,
            kcal: state.newProduct.kcal,
          }}
          warning={state.warning}
          handleOnChange={handleOnChange}
          handleFormClearing={handleFormClearing}
          handleProductAdding={handleProductAdding}
          handleAddWindow={handleAddWindow}
          handlePredefinedProductsAdding={handlePredefinedProductsAdding}
        />
      ) : null}

      {state.isRemovingWindowOpened ? (
        <RemoveWindow
          list={state.productList}
          handleRemoving={handleProductRemoving}
          handleRemoveWindow={handleRemoveWindow}
        />
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps)(memo(Meal));

function Product(props) {
  useEffect(() => {
    let ingredients = {
      proteins: props.proteins,
      fats: props.fats,
      carbs: props.carbs,
      kcal: props.kcal,
    };
    props.addIngredientsFunction(ingredients);

    return () => {
      props.subIngredientsFunction(ingredients);
    };
  }, []);

  return (
    <div className="meal__products-section__product">
      <div className="meal__products-section__product__info">
        <h2 className="meal__products-section__product__title">{props.name}</h2>
        <p className="meal__products-section__product__weight">
          {props.weight} g
        </p>
      </div>

      <ul className="meal__products-section__product__stats-list">
        <li className="meal__products-section__product__stats-list__item">
          {props.proteins} g
        </li>
        <li className="meal__products-section__product__stats-list__item">
          {props.fats} g
        </li>
        <li className="meal__products-section__product__stats-list__item">
          {props.carbs} g
        </li>
        <li className="meal__products-section__product__stats-list__item meal__products-section__product__stats-list__item--kcal">
          {props.kcal} kcal
        </li>
      </ul>
    </div>
  );
}
