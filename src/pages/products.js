import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../action/productAction'

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getProducts()
  }
  printProducts = () => {
    return (
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {this.props.products.map(item => {
              return (
                <div key={item._id} className='lg:w-1/4 md:w-1/2 p-4 w-full'>
                  <Link
                    to={{
                      pathname: '/product-detail',
                      search: '?id=' + item._id,
                    }}
                  >
                    <div className='block relative h-48 rounded overflow-hidden'>
                      <img
                        alt='ecommerce'
                        className='object-cover object-center w-full h-full block'
                        src={item.img}
                      ></img>
                    </div>
                  </Link>
                  <div className='mt-4'>
                    <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
                      {item.category}
                    </h3>
                    <h2 className='text-gray-900 title-font text-lg font-medium'>
                      {item.name}
                    </h2>
                    <p className='mt-1'>Rp.{item.price.toLocaleString()}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
  render() {
    return <div className='container mx-auto px-10'>{this.printProducts()}</div>
  }
}

const mapStateToProps = ({ productReducer }) => {
  return {
    products: productReducer.products_list,
  }
}

export default connect(mapStateToProps, { getProducts })(Products)
