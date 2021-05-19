import { warnings } from '../components/meal/meal';

const ACTIONS = {
  UPDATE_PRODUCT_DATA: 'update-product-data',
  RESET_FORM: 'reset-form',
  SET_WARNING: 'set-warning',
  CLEAR_WARNING: 'clear-warning',
  SET_INITIAL: 'set-initial',
};

const initialState = {
  productData: {
    id: '',
    name: '',
    weight: '',
    proteins: '',
    fats: '',
    carbs: '',
    kcal: '',
  },
  warning: ['', ''],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_PRODUCT_DATA: {
      switch (action.payload.key) {
        case 'name': {
          return {
            ...state,
            productData: { ...state.productData, name: action.payload.value },
          };
        }
        case 'weight': {
          return {
            ...state,
            productData: {
              ...state.productData,
              weight: action.payload.value,
            },
          };
        }
        case 'proteins': {
          return {
            ...state,
            productData: {
              ...state.productData,
              proteins: action.payload.value,
            },
          };
        }
        case 'fats': {
          return {
            ...state,
            productData: { ...state.productData, fats: action.payload.value },
          };
        }
        case 'carbs': {
          return {
            ...state,
            productData: {
              ...state.productData,
              carbs: action.payload.value,
            },
          };
        }
        case 'kcal': {
          return {
            ...state,
            productData: { ...state.productData, kcal: action.payload.value },
          };
        }
        default: {
          return state;
        }
      }
    }

    case ACTIONS.RESET_FORM: {
      const props = action.payload;
      return {
        ...state,
        productData: {
          id: props.data.id,
          name: props.data.name,
          weight: props.data.weight,
          proteins: props.data.proteins,
          fats: props.data.fats,
          carbs: props.data.carbs,
          kcal: props.data.kcal,
        },
      };
    }

    case ACTIONS.SET_WARNING: {
      if (action.payload === 'name')
        return { ...state, warning: [warnings.name, action.payload] };
      else return { ...state, warning: [warnings.weight, action.payload] };
    }

    case ACTIONS.CLEAR_WARNING: {
      return { ...state, warning: ['', action.payload] };
    }

    default:
      return state;
  }
}
