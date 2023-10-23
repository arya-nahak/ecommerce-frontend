const initialState = {
  orderData: [],
  error: null,
  isLoading: false,
  orderStatus:null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CONFIRMORDERREQUEST":
      return { ...state, isLoading: true};
    case "CONFIRMORDERSUCCESS":
      return { ...state, orderData: payload, isLoading: false ,orderStatus:payload};
    case "CONFIRMORDERFAILURE":
      return { ...state, error: payload, isLoading: false};

    // case "GETORDERREQUEST":
    //   return { ...state, isLoading: true };
    // case "GETORDERSUCCESS":
    //   return { ...state, orderData: payload, isLoading: false };
    // case "GETORDERFAILURE":
    //   return { ...state, error: payload, isLoading: false };


    default:
      return state;
  }
};
