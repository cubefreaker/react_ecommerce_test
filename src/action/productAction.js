import axios from 'axios'

const API_URL =
  'https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-hlkrj/service/api_products/incoming_webhook/get'
export const getProducts = (limit = '', offset = '') => {
  return dispatch => {
    axios
      .post(
        API_URL,
        {},
        {
          params: {
            secret: 'aVG4TPqmN9HayMzM',
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
