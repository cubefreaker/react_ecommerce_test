const INITIAL_STATE = {
    products_list: []
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return {...state, products_list: action.payload}
            default:
            return state
    }
}