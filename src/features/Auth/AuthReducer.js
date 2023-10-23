const initialState = {
    users:null,
    error:null,
    isLoading:false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "REQUESTADDUSER":
      return { ...state, isLoading:true };
    case "SUCCESSADDUSER":
      return { ...state, users:payload ,isLoading:false};
    case "FAILADDUSER":
      return { ...state, error:payload ,isLoading:false};
    
      case "REQUESTGETUSER":
      return { ...state, isLoading:true };
    case "SUCCESSGETUSER":
      return { ...state, users:payload ,isLoading:false};
    case "FAILGETUSER":
      return { ...state, error:payload ,isLoading:false};

    default:
      return state;
  }
};
