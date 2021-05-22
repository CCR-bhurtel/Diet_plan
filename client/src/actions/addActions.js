import axios from 'axios';

const ACTIONS = {
  SET_PRODUCT_SEND_FOR_EDIT: 'set-product-send-for-edit',
  NEGATE_EDIT_WINDOW_STATE: 'negate-edit-window-state',
  UPDATE_SAVED_PRODUCTS_LIST: 'update-saved-products-list',
  LOAD_PREDEFINED_PRODUCTS_LIST_FROM_DATABASE:
    'load-predefined-products-list-from-database',
  SET_IS_ADD_BUTTON_DISABLED: 'set-is-add-button-disabled',
};

export const loadPredefined = (productList) => (dispatch) => {
  dispatch({
    type: ACTIONS.LOAD_PREDEFINED_PRODUCTS_LIST_FROM_DATABASE,
    payload: productList,
  });
};

export const handleSelected = (e, state) => (dispatch) => {
  const product = document.getElementById(e.currentTarget.id);
  if (e.currentTarget.id) {
    const productName = product.querySelector(
      '.window__main__section__large-list__item__name'
    );

    // "UNSELECTING"
    if (productName.style.fontWeight === 'bold') {
      product.style.background = '#ffffff';
      productName.style.fontWeight = 'normal';
      dispatch(handleAddButtonDisabling());
    }

    // "SELECTING"
    else {
      product.style.background = '#4fddbc';
      productName.style.fontWeight = 'bold';
      dispatch(
        updateProductSendForEdit(
          state.savedProductList[getIndexOfProduct(e.currentTarget.id, state)]
        )
      );
      dispatch(handleEditingWindow());
    }
  }
};

export const updateProductSendForEdit = (selectedProduct) => (dispatch) => {
  console.log(selectedProduct);
  dispatch({
    type: ACTIONS.SET_PRODUCT_SEND_FOR_EDIT,
    payload: selectedProduct,
  });
};

export const getIndexOfProduct = (targetId, state) => {
  const productList = state.savedProductList;
  let returnedIndex = 0;

  productList.forEach((product, index) => {
    if (product.id === Number(targetId)) returnedIndex = index;
  });
  return returnedIndex;
};

export const handleProductEditing = (editedProduct, state) => (dispatch) => {
  const indexOfEditedProduct = getIndexOfProduct(editedProduct.id, state);
  dispatch({
    type: ACTIONS.UPDATE_SAVED_PRODUCTS_LIST,
    payload: { index: indexOfEditedProduct, newProduct: editedProduct },
  });

  // SAVING CHANGES TO LOCAL STORAGE
  const predefinedProductsList = state.savedProductList;

  axios.post('/api/predefined', {
    predefined: JSON.stringify(predefinedProductsList),
  });

  dispatch(handleEditingWindow());
};

export const handleEditingWindow =
  (idOfSelectedProduct = false) =>
  (dispatch) => {
    // UNSELECTING PRODUCT AFTER EDIT CANCELED
    if (Number.isInteger(idOfSelectedProduct)) {
      const product = document.getElementById(idOfSelectedProduct);
      const productName = product.querySelector(
        '.window__main__section__large-list__item__name'
      );
      product.style.background = '#ffffff';
      productName.style.fontWeight = 'normal';
    }

    dispatch({ type: ACTIONS.NEGATE_EDIT_WINDOW_STATE });
    dispatch(handleAddButtonDisabling());
  };

export const handleAddButtonDisabling = () => (dispatch) => {
  const products = document.querySelectorAll(
    '.window__main__section__large-list__item'
  );
  let returnedBoolean = false;

  for (let i = 0; i < products.length; i++) {
    const name = products[i].querySelector(
      '.window__main__section__large-list__item__name'
    );
    if (name.style.fontWeight === 'bold') {
      returnedBoolean = false;
      break;
    } else returnedBoolean = true;
  }

  dispatch({
    type: ACTIONS.SET_IS_ADD_BUTTON_DISABLED,
    payload: returnedBoolean,
  });
};
