const INITIAL_STATE = {
  navList: [
    { name: 'Product', path: '/products' },
    { name: 'Cart', path: '/cart' },
  ],
}

export const navReducer = (state = INITIAL_STATE, action) => {
  return { ...state }
}
