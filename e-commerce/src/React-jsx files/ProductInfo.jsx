import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BuyProduct, PaymentOption, PayTypeUPI, PayTypeCard, PayTypeDelivery, OrderSucessfull } from './BuyProduct';
import '../CSS files/productinfo.css';
import cart from '../assets/cart.jpeg';
import { useEffect, useState } from 'react';
import { api_url } from './BackendApi';

export function ProductInfo() {
  const navigate = useNavigate();
  const [buy, setBuy] = useState(false);
  const [pay, setPay] = useState(false);
  const [payUPI, setPayUPI] = useState(false);
  const [payCard, setPayCard] = useState(false);
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [productId, setProductId] = useState('');

  return (
    <>
      <div className= {(buy || pay || payUPI || payCard || payOnDelivery || orderPlaced) ? 'productinfopage-blur' : ''}>
        <div className='productinfopage-header'>
          <h2>Explore Product features</h2>
          <input type='text' placeholder='Search for an item' className='search-box' />
          <div className='header-right-section'>
            <span style={{cursor:'pointer'}} onClick={() => navigate('/CustomerProfile')}>UserName</span>
            <img src={cart} className='cart-img' onClick={() => navigate('/Cart')} style={{cursor:'pointer'}}></img>
            <span style={{cursor:'pointer'}}>LogOut</span>
          </div>
        </div>
        <div className='productinfo-box'>
          <GetProductDesc buy={setBuy} id={setProductId} />
        </div>
        <h2>Products You May Like</h2>
        <div className='bottom-productlist'>
          <GetProducts />
        </div>
        <div className=''>
          <button className='more-button' onClick={() => navigate('/')}>Products</button>
        </div>
      </div>
      { buy && <BuyProduct buy={setBuy} pay={setPay} />}
      { pay && <PaymentOption buy={setBuy} pay={setPay} payUPI={setPayUPI} payCard={setPayCard} payOnDelivery={setPayOnDelivery} /> }
      { payUPI && <PayTypeUPI pay={setPay} payUPI={setPayUPI} orderPlaced={setOrderPlaced} productId={productId} />}
      { payCard && <PayTypeCard pay={setPay} payCard={setPayCard} orderPlaced={setOrderPlaced} productId={productId} />}
      { payOnDelivery &&  <PayTypeDelivery pay={setPay} payOnDelivery={setPayOnDelivery} orderPlaced={setOrderPlaced} productId={productId} /> }
      { orderPlaced && <OrderSucessfull orderPlaced={setOrderPlaced} />}
    </>
  );
}

function GetProductDesc({ buy, id }) {
  const { productId } = useParams();
  const [msg, setMsg] = useState(false);
  const [product, setProduct] = useState({id:'', productName:'', price:0.0, productType:'', 
                                          productDescription:'', productLink:null
                                        });
  const productDescription = 
  'A mobile phone or cell phone is a portable wireless telephone that allows users to make and receive calls over a radio frequency link while moving within a designated telephone service area, unlike fixed-location phones (landline phones). This radio frequency link connects to the switching systems of a mobile phone operator, providing access to the public switched telephone network (PSTN). Modern mobile telephony relies on a cellular network architecture, which is why mobile phones are often referred to as cell phones in North America.';


  useEffect(() => {
    async function fetch() {
      const response = await axios.get(`${api_url}`+'/product/info/'+`${productId}`);
      setProduct(response.data);
    }
    fetch();
  });

  return (
      <>
        <div className='productinfo-product'>
          <img src={product.productLink} />
          <h4>{product.productName}</h4>
          <span>${product.price}\-</span>
        </div>
        <div className='productdesc-sec'>
          <div>
            <h3>Product Description</h3>
            {(product.productDescription === null)? <p>{productDescription}</p> : <p>{product.productDescription}</p>}
          </div>
          {msg && <span className='added'>Added to cart</span>}
          <div className='info-buttons'>
            <button className='info-cart-button' onClick={() => AddToCartItems(product.id, setMsg)}>Add to Cart</button>
            <button className='info-buy-button' onClick={() => {buy(true), id(product.id)}}>Buy</button>
          </div>
        </div>
      </>
    );
}

async function AddToCartItems(id, setMsg) {
  setMsg(true);
  setTimeout(() => {
    setMsg(false);
  }, 1000);

  try {
      await axios.post(`${api_url}`+'/cart', null, { 
        params: {
          user:"ajaykumar",
          productId:id,
        }
      });
  } catch {
      console.log('product not added');
  }
}

function GetProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(`${api_url}`+'/product/list');
      setProducts(response.data.content);
    }
    fetch();
  },[]);

  return (
    <>
      {
        products.map((product) => {
          return (
            <div className='bottom-product' key={product.id}>
              <img src={product.productLink} />
              <span>{product.productName}</span>
              <span>${product.price}/-</span>
              <button className='product-info-button' onClick={() => navigate(`/productInfo/${product.id}`)}>ProductInfo</button>
            </div>
          );
        })
      }
    </>
  );
}