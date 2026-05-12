import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BuyProduct, PaymentOption, PayTypeUPI, PayTypeCard, PayTypeDelivery, OrderSucessfull } from './BuyProduct';
import '../CSS files/productinfo.css';
import cart from '../assets/cart.jpeg';
import { useEffect, useState } from 'react';

export function ProductInfo() {
  const navigate = useNavigate();
  const [buy, setBuy] = useState(false);
  const [pay, setPay] = useState(false);
  const [payUPI, setPayUPI] = useState(false);
  const [payCard, setPayCard] = useState(false);
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  return (
    <>
      <div className= {(buy || pay || payUPI || payCard || payOnDelivery || orderPlaced) ? 'productinfopage-blur' : ''}>
        <div className='productinfopage-header'>
          <h2>Explore Product features</h2>
          <input type='text' placeholder='Search for an item' className='search-box' />
          <div className='header-right-section'>
            <span>UserName</span>
            <img src={cart} className='cart-img' onClick={() => navigate('/Cart')}></img>
            <span>LogOut</span>
          </div>
        </div>
        <div className='productinfo-box'>
          <GetProductDesc buy={setBuy} />
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
      { payUPI && <PayTypeUPI pay={setPay} payUPI={setPayUPI} orderPlaced={setOrderPlaced} />}
      { payCard && <PayTypeCard pay={setPay} payCard={setPayCard} orderPlaced={setOrderPlaced} />}
      { payOnDelivery &&  <PayTypeDelivery pay={setPay} payOnDelivery={setPayOnDelivery} orderPlaced={setOrderPlaced} /> }
      { orderPlaced && <OrderSucessfull orderPlaced={setOrderPlaced} />}
    </>
  );
}

function GetProductDesc({ buy }) {
  const [msg, setMsg] = useState(false);
  const [info, setInfo] = useState(''); 
  const product  = JSON.parse(localStorage.getItem('product'));
  const productDescription = 
  'A mobile phone or cell phone is a portable wireless telephone that allows users to make and receive calls over a radio frequency link while moving within a designated telephone service area, unlike fixed-location phones (landline phones). This radio frequency link connects to the switching systems of a mobile phone operator, providing access to the public switched telephone network (PSTN). Modern mobile telephony relies on a cellular network architecture, which is why mobile phones are often referred to as cell phones in North America.';


  useEffect(() => {
    async function fetch() {
      const data = await axios.get('http://localhost:9090/info', {
        params: {
          productId:product.id
        }
      });
      setInfo(data.data.productDescription);
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
            {(info === 'null')? <p>{productDescription}</p> : <p>{info}</p>}
          </div>
          {msg && <span className='added'>Added to cart</span>}
          <div className='info-buttons'>
            <button className='info-cart-button' onClick={() => AddToCartItems(product.id, setMsg)}>Add to Cart</button>
            <button className='info-buy-button' onClick={() => {buy(true), localStorage.setItem('orderedProductId', product.id)}}>Buy</button>
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
      await axios.post('http://localhost:9090/cart', null, { 
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
      const data = await axios.get('http://localhost:9090/info/products');
      setProducts(data.data);
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
              <button className='product-info-button' onClick={() => PageReLoad(product, navigate)}>ProductInfo</button>
            </div>
          );
        })
      }
    </>
  );
}

function PageReLoad(product, navigate) {
  localStorage.removeItem('product');
  localStorage.setItem('product', JSON.stringify(product));
  navigate('/ProductInfo');
}