import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(v => v.product === item.product)

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(v => v.product === existItem.product ? item : v)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(v => v.product !== action.payload )
            }

        default:
            return state
    }
}