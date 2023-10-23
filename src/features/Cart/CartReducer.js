const initialState = {
  cart: [],
  isLoading: false,
  error: null,
  isRequest: false,
};

export default (state = initialState, { type, payload }) => {
  console.log(payload, "cartreducer");

  switch (type) {
    case "GETCARTREQUEST":
      return { ...state, isLoading: true, isRequest: false };
    case "GETCARTSUCCESS":
      return { ...state, cart: payload, isLoading: false, isRequest: true };
    case "GETCARTFAILURE":
      return { ...state, error: payload, isLoading: false, isRequest: true };

    case "GETCARTREQUESTBYUSER":
      return { ...state, isRequest: false };
    case "GETCARTSUCCESSBYUSER":
      return { ...state, cart: payload, isRequest: true };
    case "GETCARTFAILUREBYUSER":
      return { ...state, error: payload, isRequest: true };

    case "GETCARTREQUESTUPDATE":
      return { ...state, isLoading: true, isRequest: false };
    case "GETCARTSUCCESSUPDATE":
      const updatedCart = state.cart.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });

      return { ...state, cart: updatedCart, isLoading: false, isRequest: true };

    case "GETCARTFAILUREUPDATE":
      return { ...state, error: payload, isLoading: false, isRequest: true };

    case "GETCARTREQUESTDELETE":
      return { ...state, isLoading: true, isRequest: false };
    case "GETCARTSUCCESSDELETE":
      return {
        ...state,
        cart: state.cart.filter((fil) => fil.id !== payload.id),
        // cart: payload,
        isLoading: false,
        isRequest: true,
      };
    case "GETCARTFAILUREDELETE":
      return { ...state, error: payload, isLoading: false, isRequest: true };

    case "GETCARTREQUESTCARTDELETE":
      return { ...state, isLoading: true};
    case "GETCARTSUCCESSCARTDELETE":
      return { ...state, cart: [], isLoading: false,};
    case "GETCARTFAILURECARTDELETE":
      return { ...state, error: payload, isLoading: false,};
    default:
      return state;
  }
};
