const ACTIONS = {
  SET_PRODUCT_SEND_FOR_EDIT: 'set-product-send-for-edit',
  NEGATE_EDIT_WINDOW_STATE: 'negate-edit-window-state',
  UPDATE_SAVED_PRODUCTS_LIST: 'update-saved-products-list',
  LOAD_PREDEFINED_PRODUCTS_LIST_FROM_LOCAL_STORAGE:
    'load-predefined-products-list-from-local-storage',
  SET_IS_ADD_BUTTON_DISABLED: 'set-is-add-button-disabled',
};

const initialState = {
  savedProductList: [
    {
      id: 0,
      name: 'Cottage cheese',
      weight: 100,
      proteins: 20,
      fats: 10,
      carbs: 15,
      kcal: 250,
    },
    {
      id: 1,
      name: 'Skyr',
      weight: 100,
      proteins: 20,
      fats: 0,
      carbs: 12,
      kcal: 100,
    },
    {
      id: 2,
      name: 'Potatos',
      weight: 100,
      proteins: 9,
      fats: 2,
      carbs: 80,
      kcal: 126,
    },
    {
      id: 3,
      name: 'Coca Cola',
      weight: 100,
      proteins: 0,
      fats: 0,
      carbs: 100,
      kcal: 400,
    },
    {
      id: 4,
      name: 'Banana',
      weight: 100,
      proteins: 5,
      fats: 3,
      carbs: 52,
      kcal: 173,
    },
  ],

  productSendForEdit: {
    id: 0,
    name: '',
    weight: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
    kcal: 0,
  },
  isEditWindowOpened: false,
  isAddButtonDisabled: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_PREDEFINED_PRODUCTS_LIST_FROM_LOCAL_STORAGE: {
      return { ...state, savedProductList: [...action.payload] };
    }

    case ACTIONS.NEGATE_EDIT_WINDOW_STATE: {
      return { ...state, isEditWindowOpened: !state.isEditWindowOpened };
    }

    case ACTIONS.SET_PRODUCT_SEND_FOR_EDIT: {
      return {
        ...state,
        productSendForEdit: {
          id: action.payload.id,
          name: action.payload.name,
          weight: action.payload.weight,
          proteins: action.payload.proteins,
          fats: action.payload.fats,
          carbs: action.payload.carbs,
          kcal: action.payload.kcal,
        },
      };
    }

    case ACTIONS.UPDATE_SAVED_PRODUCTS_LIST: {
      const newSavedProductList = state.savedProductList;
      newSavedProductList[action.payload.index] = action.payload.newProduct;
      return { ...state, savedProductList: newSavedProductList };
    }

    case ACTIONS.SET_IS_ADD_BUTTON_DISABLED: {
      return { ...state, isAddButtonDisabled: action.payload };
    }

    default:
      return state;
  }
}
