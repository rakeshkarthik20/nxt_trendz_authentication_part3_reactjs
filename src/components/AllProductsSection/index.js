import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    loader: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const url = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.products.map(each => ({
        brand: each.brand,
        id: each.id,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({productsList: updatedData, loader: false})
    }
  }

  renderProductsList = () => {
    const {productsList, loader} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        {loader ? (
          <div className="loader-container">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
