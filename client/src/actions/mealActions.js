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
  ADD_NEW_PRODUCT: 'add-new-product',
  CHANGE_NEW_PRODUCT_DATA: 'change-new-product-data',
};

export const dispatchThis = (action) => (dispatch) => {
  dispatch({ type: action });
};
export const addProductToProductList = (value) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_PRODUCT_TO_PRODUCTLIST,
    payload: value,
  });
};
export const clear_product_list = () => (dispatch) => {
  dispatch({ type: ACTIONS.CLEAR_PRODUCTLIST_BEFORE_DAY_CHANGING });
};

export const add_new_list = (uniqueList) => (dispatch) => {
  dispatch({ type: ACTIONS.ADD_NEW_LISTS, payload: uniqueList });
};
export const handleMealOpening = () => (dispatch) => {
  dispatch({ type: ACTIONS.NEGATE_MEAL_STATE });
};

export const handleAddingToSummary = (object) => (dispatch) => {
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

export const handleSubstractingFromSummary = (object) => (dispatch) => {
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

export const handleAddWindow = () => (dispatch) => {
  dispatch({ type: ACTIONS.NEGATE_ADDING_WINDOW_STATE });
};

export const handleRemoveWindow = () => (dispatch) => {
  dispatch({ type: ACTIONS.NEGATE_REMOVING_WINDOW_STATE });
};

// Here (props)
export const handleProductAdding = (e, props) => (dispatch) => {
  e.preventDefault();
  setTimeout(() => {
    dispatch({ type: ACTIONS.ADD_PRODUCT, payload: props });
  }, 10);
  dispatch({ type: ACTIONS.NEGATE_ADDING_WINDOW_STATE });
};

export const addNewProduct = (props) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_NEW_PRODUCT,
    payload: {
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
  });
};
// Here (props)
export const handlePredefinedProductsAdding =
  (selectedProducts, props) => (dispatch) => {
    selectedProducts.forEach((product) => {
      // TIMEOUT TO PREVENT DOUBLED IDS
      setTimeout(() => {
        Object.keys(product).forEach((key) => {
          dispatch({
            type: ACTIONS.CHANGE_NEW_PRODUCT_DATA,
            payload: { key: key, value: product[key] },
          });
        });

        dispatch({ type: ACTIONS.ADD_PRODUCT, payload: props });
      }, 10);
    });

    dispatch({ type: ACTIONS.NEGATE_ADDING_WINDOW_STATE });
  };

export const handleProductRemoving = (checkedIdsList) => (dispatch) => {
  dispatch({ type: ACTIONS.REMOVE_PRODUCT, payload: checkedIdsList });
  dispatch({ type: ACTIONS.NEGATE_REMOVING_WINDOW_STATE });
};

export const handleFormClearing = (setPlaceholderState) => (dispatch) => {
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

export const handleOnChange = (e) => (dispatch) => {
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
