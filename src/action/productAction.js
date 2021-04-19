import axios from 'axios'

export const getProducts = (limit = '', offset = '') => {
  return dispatch => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}get`,
        {},
        {
          params: {
            secret: process.env.REACT_APP_API_SK,
            limit: limit,
            offset: offset,
          },
        }
      )
      .then(res => {
        dispatch({
          type: 'GET_PRODUCTS',
          payload: JSON.parse(res.data),
        })
      })
      .catch(err => {
        alert('Get data error:', err)
      })
  }
}
