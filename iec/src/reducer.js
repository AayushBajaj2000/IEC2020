// InitialState which is the initialState for all the components
export const initialState = {
  user: null,
  credit: 0,
  points: 0,
  barcode: 0,
  barcode__scanned: 0
};

// This is the component that is used to get the state in all the components in react 
const reducer = (state, action) => {
  switch (action.type) {
    case "Add_user":
      return {
        ...state,
        user: action.item
      };
    case "Add_credit":
      return {
        ...state,
        credit: action.item
      };
    case "Add_points":
      return {
        ...state,
        points: action.item
      };
    case "Add_barcode":
      return {
        ...state,
        barcode: action.item
      };
    case "Add_barcode_Scanned":
      return {
        ...state,
        barcode__scanned: action.item
      };
    default:
      return state;
  }
};

export default reducer;