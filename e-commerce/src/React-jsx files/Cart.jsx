import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BuyProduct, PaymentOption, PayTypeUPI, PayTypeCard, PayTypeDelivery, OrderSucessfull } from './BuyProduct';
import '../CSS files/cart.css'

export function Cart() {
  const [buy, setBuy] = useState(false);
  const [pay, setPay] = useState(false);
  const [payUPI, setPayUPI] = useState(false);
  const [payCard, setPayCard] = useState(false);
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // eslint-disable-next-line no-unused-vars
  const [buyCart, setBuyCart] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className= {(buy || pay || payUPI || payCard || payOnDelivery || orderPlaced) ? 'cartpage-blur' : ''}>
        <div className="cart-header">
          <h2>Explore Your Cart</h2>
          <input type="text" placeholder="Serach" className='search-box'/>
          <div className='leftside-header'>
            <span>username</span>
            <span onClick={() => navigate('/')}>Home</span>
            <span>LogOut</span>
          </div>
        </div>
        <div className='cart-product-list'>
          <GetCartProducts buy={setBuy} buyCart={setBuyCart} />
        </div>
      </div>
      { buy && <BuyProduct buy = {setBuy} pay = {setPay} />}
      { pay && <PaymentOption buy = { setBuy } pay = {setPay} payUPI = {setPayUPI} payCard = {setPayCard} payOnDelivery={setPayOnDelivery} /> }
      { payUPI && <PayTypeUPI pay={setPay} payUPI={setPayUPI} orderPlaced={setOrderPlaced} buyCart={setBuyCart} />}
      { payCard && <PayTypeCard pay={setPay} payCard={setPayCard} orderPlaced={setOrderPlaced} buyCart={setBuyCart} />}
      { payOnDelivery &&  <PayTypeDelivery pay={setPay} payOnDelivery={setPayOnDelivery} orderPlaced={setOrderPlaced} buyCart={setBuyCart} /> }
      { orderPlaced && <OrderSucessfull orderPlaced={setOrderPlaced} buyCart={setBuyCart} />}
    </>
  );
}

function GetCartProducts({ buy, buyCart }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([{
    products:[],
    quantity:[],
    totalPrice:0.0
  }]);

  useEffect(() => { 
    try {
      async function fetch() {
        const response = await axios.get('http://localhost:9090/cart/products', { 
          params: {
            user:"ajaykumar",
            page:0,
            pageSize:10
          }
        });
        setProducts(response.data);
      }
      fetch();
    } catch {
      console.log("no products in cart");
    }
  }, []);

  const cartProducts = products?.products || [];
  const quantity = products?.quantity || [];

  if(cartProducts.length === 0) {
    return (
      <>
        <h1 className='empty-cart-text'>No Products Availabe in Cart</h1>
      </>
    );
  }
  return (
    <>{
        cartProducts.map((product, index) => {
          const quant = quantity[index];

          return (<div key={product.id} className='cart-product'>
            <img src={product.productLink} />
            <span>{product.productName}</span>
            <span>${product.price}\-</span>
            <div className='plus-minus'>
              <button className='plus-button' onClick={() => PlusOneQuantity(product.id, products, setProducts)}>+</button>
              <span>{quant}</span>
              <button className='minus-button' onClick={() => MinusOneQuantity(product.id, products, setProducts)}>-</button>
            </div>
            <div className='productpage-buttons'>
              <button className='productinfo-button' onClick={() => ProductDesc(product, navigate)}>ProductInfo</button>
              <button className='buy-button' onClick={() => StoreDetails(buy, product.id, quant)}>Buy</button>
            </div>
          </div>);
        })
    }
      <button className='buy-cart-button' onClick={() => {buy(true), buyCart(true), localStorage.setItem('quantity', JSON.stringify(0)) }}>Buy Cart</button>
    </>
  ); 
}

function StoreDetails(buy, id, quantity) {
  localStorage.setItem('orderedProductId', id);
  localStorage.setItem('quantity', JSON.stringify(quantity));
  buy(true);
}

function PlusOneQuantity(id, products, setProducts) {
  const quantity = [...products.quantity];
  const index = products.products.findIndex ((p) => p.id === id);
  quantity[index] += 1;
  setProducts({...products, quantity:quantity});

  try {
    async function fetch() {
      await axios.put('http://localhost:9090/cart/add', null, {
        params: {
          user:"ajaykumar",
          productId:id
        }
      });
    }
    fetch();
  }  catch {
      alert("exception raised");
  }
}

async function MinusOneQuantity(id, products, setProducts) {
  const quantity = [...products.quantity];
  
  const index = products.products.findIndex ((p) => p.id === id);
  
  if(quantity[index] > 1) {
    quantity[index] -= 1;
    
    setProducts({...products, quantity:quantity});
  } else if(quantity[index] === 1) {
    const productList = [...products.products];

    productList.splice(index, 1);
    quantity.splice(index, 1);
    setProducts({...products, products:productList, quantity:quantity});
  }

  try {
    await axios.put('http://localhost:9090/cart/sub', null, {
      params: {
        user:'ajaykumar',
        productId:id
      }
    });
  } catch {
    alert("exception raised");
  }
}

function ProductDesc(product, navigate) {
  localStorage.removeItem('product');
  localStorage.setItem('product', JSON.stringify(product));
  navigate('/ProductInfo');
}