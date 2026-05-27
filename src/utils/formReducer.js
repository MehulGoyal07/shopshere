export const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors,
        },
      };
    case "SET_FIELD_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case "SET_SERVER_ERROR":
      return {
        ...state,
        serverError: action.error,
      };
    case "RESET_FORM":
      return {
        values: action.initialValues,
        errors: {},
        isLoading: false,
        serverError: "",
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
        serverError: "",
      };
    default:
      return state;
  }
};

export const createInitialState = (initialValues) => ({
  values: initialValues,
  errors: {},
  isLoading: false,
  serverError: "",
});
