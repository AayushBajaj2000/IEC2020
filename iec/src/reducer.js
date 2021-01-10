// InitialState which is the initialState for all the components
export const initialState = {
    test: ""
  };

const reducer = (state, action) => {
switch (action.type) {
    case "Add_test":
        return {...state,
                test: action.item}; 
    default:
    return state;
}
};
  
export default reducer;