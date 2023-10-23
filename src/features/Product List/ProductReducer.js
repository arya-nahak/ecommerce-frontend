const initialState = {
  product: [],
  categories: [],
  brands: [],
  isLoading: false,
  error: null,
  totalItems: 0,
  SingleProduct:null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "REQUESTPRODUCT":
      return { ...state, isLoading: true };

    case "SUCCESSPRODUCT":
      return { ...state, product: payload.product, isLoading: false };

    case "FAILPRODUCT":
      return { ...state, error: payload, isLoading: false };

    case "REQUESTFILTERPRODUCT":
      return { ...state, isLoading: true };

    case "SUCCESSFILTERPRODUCT":
      return {
        ...state,
        product: payload.product,
        totalItems: payload.totalItems,
        isLoading: false,
      };

    case "FAILFILTERPRODUCT":
      return { ...state, error: payload, isLoading: false };

    case "REQUESTCATEGORYPRODUCT":
      return { ...state, isLoading: true };

    case "SUCCESSCATEGORYPRODUCT":
      return { ...state, categories: payload, isLoading: false };

    case "FAILCATEGORYPRODUCT":
      return { ...state, error: payload, isLoading: false };

    case "REQUESTPRODUCTBRAND":
      return { ...state, isLoading: true };

    case "SUCCESSPRODUCTBRAND":
      return { ...state, brands: payload, isLoading: false };

    case "FAILPRODUCTBRAND":
      return { ...state, error: payload, isLoading: false };
 
      case "REQUESTSINGLEPRODUCT":
      return { ...state, isLoading: true };

    case "SUCCESSSINGLEPRODUCT":
      return { ...state, SingleProduct: payload, isLoading: false };

    case "FAILSINGLEPRODUCT":
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};
