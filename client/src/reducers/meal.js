import { warnings } from '../components/meal/meal';
import { v1 } from 'uuid';
import { memo } from 'react';

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

const initialState = {
  isMealOpened: false,
  isAddingWindowOpened: false,
  isRemovingWindowOpened: false,
  countIngredients: false,
  productList: [],
  newProduct: {},
  warning: ['', ''],
  summary: {
    proteins: 0,
    fats: 0,
    carbs: 0,
    kcal: 0,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NEW_PRODUCT:
      return { ...state, newProduct: action.payload };
    case ACTIONS.ADD_NEW_LISTS:
      return { ...state, productList: action.payload };
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
      const props = action.payload;
      state.newProduct.id = Date.now();
      state.newProduct.dateIds = props.dateIds;
      state.productList.push(state.newProduct);
      localStorage.setItem(
        state.newProduct.id,
        JSON.stringify(state.newProduct)
      );
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
        newProductList.forEach((product, index) => {
          if (Number(product.id) === Number(checkedId)) {
            newProductList.splice(index, 1);
            localStorage.removeItem(product.id);
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
      return state;
  }
};

