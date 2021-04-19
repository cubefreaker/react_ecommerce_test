import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getProductDetail } from '../action/productAction'

class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      qty: 1,
      totalPrice: null,
    }
  }

  componentDidMount() {
    if (this.props.products.length <= 0)
      this.props.getProductDetail(this.state.id)
  }

  onChangeQty(qty, type = null, pricing) {
    if (type == 'inc') {
      if (qty < pricing.stock) qty++
    } else if (type == 'dec') {
      if (qty > 1) qty--
    } else {
      if (!qty || qty <= 0) qty = 1
      if (qty > pricing.stock) qty = pricing.stock
    }

    this.setState({
      qty: qty,
      totalPrice: qty * pricing.price,
    })
  }

  render() {
    let product = _.find(this.props.products, item => {
      return item._id == this.state.id
    })

    return (
      <section className='text-gray-600 body-font overflow-hidden'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='lg:w-4/5 mx-auto flex flex-wrap'>
            <img
              alt={product?.name}
              className='lg:w-1/2 lg:mb-0 mb-5 w-full lg:h-auto h-64 object-cover object-center rounded'
              src={product?.img}
            ></img>
            <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mb-6 lg:mb-0 text-left'>
              {/* <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                BRAND NAME
              </h2> */}
              <h1 className='text-gray-900 text-3xl title-font font-medium mb-4'>
                {product?.name}
              </h1>
              <div className='flex mb-4'>
                <a className='flex-grow border-b-2 border-gray-300 py-2 text-lg px-1'>
                  Details
                </a>
              </div>
              <p className='leading-relaxed mb-4'>{product?.description}</p>
              <div className='flex border-t border-gray-200 py-2'>
                <span className='text-gray-500'>Category</span>
                <span className='ml-auto text-gray-900'>
                  {product?.category}
                </span>
              </div>
              <div className='flex border-t border-gray-200 py-2'>
                <span className='text-gray-500'>Stock</span>
                <span className='ml-auto text-gray-900'>{product?.stock}</span>
              </div>
              <div className='flex border-t border-b mb-6 border-gray-200 py-2'>
                <span className='text-gray-500'>Quantity</span>
                <span className='ml-auto text-gray-900'>
                  <button
                    onClick={() =>
                      this.onChangeQty(this.state.qty, 'dec', {
                        price: product.price,
                        stock: product.stock,
                      })
                    }
                    className='outline-none focus:outline-none'
                    // className=' bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 rounded-l cursor-pointer outline-none'
                  >
                    <span className='m-auto text-2xl font-thin'>−</span>
                  </button>
                  <input
                    type='number'
                    // className='outline-none focus:outline-none text-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none'
                    className='outline-none focus:outline-none text-center w-10'
                    name='custom-input-number'
                    value={this.state.qty}
                    onChange={e =>
                      this.onChangeQty(e.target.value, null, {
                        price: product.price,
                        stock: product.stock,
                      })
                    }
                  ></input>
                  <button
                    onClick={() =>
                      this.onChangeQty(this.state.qty, 'inc', {
                        price: product.price,
                        stock: product.stock,
                      })
                    }
                    className='outline-none focus:outline-none'
                    // className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 rounded-r cursor-pointer'
                  >
                    <span className='m-auto text-2xl font-thin'>+</span>
                  </button>
                </span>
              </div>
              <div className='flex'>
                <span className='title-font font-medium text-2xl text-gray-900'>
                  Rp.
                  {this.state.totalPrice?.toLocaleString() ||
                    product?.price.toLocaleString()}
                </span>
                <button className='flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>
                  <FontAwesomeIcon
                    icon={['fas', 'shopping-cart']}
                    className='mt-1 mr-2'
                  />
                  Add
                </button>
                <button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                  <FontAwesomeIcon icon={['fas', 'heart']} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ productReducer }) => {
  return {
    products: productReducer.products_list,
  }
}

export default withRouter(
  connect(mapStateToProps, { getProductDetail })(ProductDetail)
)
