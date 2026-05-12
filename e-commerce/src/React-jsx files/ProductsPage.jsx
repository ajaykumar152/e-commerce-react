import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cart from '../assets/cart.jpeg';
import '../CSS files/productpage.css';
import { BuyProduct, PaymentOption, PayTypeUPI, PayTypeCard, PayTypeDelivery, OrderSucessfull } from './BuyProduct';

export function ProductsPage() {
  const [image, setImage] = useState(null);
  const [productname, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);
  const [buy, setBuy] = useState(false);
  const [pay, setPay] = useState(false);
  const [payUPI, setPayUPI] = useState(false);
  const [payCard, setPayCard] = useState(false);
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  function UploadProductImage(event) {
    const file = event.target.files[0];
    setImage(file);
  }

  function ProductName(event) {
    setProductName(event.target.value);
  }

  function ProductPrice(event) {
    setProductPrice(event.target.value);
  }

  return (
    <>
      <div className= {(buy || pay || payUPI || payCard || payOnDelivery || orderPlaced) ? 'productpage-blur' : ''}>
        <div className='productpage-header'>
          <h2>Welcome to Website</h2>
          <input type='text' placeholder='Search for an item' className='search-box' />
          <div className='username'>
            <span>Usernname</span>
            <img src={cart} className='cart-img' onClick={() => navigate('/Cart')}></img>
            <span>LogOut</span>
          </div>
        </div>
        <div className='product-list'>
          <GetAllProducts buy = {setBuy} />
        </div>
        <div className='product-input'>
          <input type="file" onChange={UploadProductImage} />
          <input type='text' onChange={ProductName} />
          <input type='number' onChange={ProductPrice} />
          <button onClick={() => AddProduct(image, productname, productPrice)} >UploadProduct</button>
        </div>
      </div>
      { buy && <BuyProduct buy = {setBuy} pay = {setPay} />}
      { pay && <PaymentOption buy = { setBuy } pay = {setPay} payUPI = {setPayUPI} payCard = {setPayCard} payOnDelivery={setPayOnDelivery} /> }
      { payUPI && <PayTypeUPI pay={setPay} payUPI={setPayUPI} orderPlaced={setOrderPlaced} />}
      { payCard && <PayTypeCard pay={setPay} payCard={setPayCard} orderPlaced={setOrderPlaced} />}
      { payOnDelivery &&  <PayTypeDelivery pay={setPay} payOnDelivery={setPayOnDelivery} orderPlaced={setOrderPlaced} /> }
      { orderPlaced && <OrderSucessfull orderPlaced={setOrderPlaced} />}
    </>
  );
}

function GetAllProducts({ buy }) {
  const navigate = useNavigate();
  const[products, setProducts] = useState([]);
  
  useEffect(() => {
    async function fetch() {

      const response = await axios.get('http://localhost:9090/product/get', {
        params: {
          page:0,
          size:10
        }
      });
      setProducts(response.data.content);
    }
    fetch();
  }, []);
  
  return (
    <> {
      products.map((product) => {
        return (<div key ={product.id} className='product'>
          <img src={product.productLink} />
          <span>{product.productName}</span>
          <span>${product.price}\-</span>
          <div className='productpage-buttons'>
            <button className='productinfo-button' onClick={() => ProductDesc(product, navigate)}>ProductInfo</button>
            <button className='buy-button' onClick={() => StoreDetails(buy, product.id)}>Buy</button>
          </div>
        </div>);
      })
    }</>
  );
}

function StoreDetails(buy, id) {
  localStorage.setItem('orderedProductId', id);
  localStorage.setItem('quantity', JSON.stringify(1));
  buy(true);
}

async function AddProduct(image, productName, productPrice) {
  
  const formData = new FormData();

  formData.append("price", productPrice);
  formData.append("name", productName);
  formData.append("image", image);

  try {
    await axios.post("http://localhost:9090/product", formData);
  } catch {
    console.log("not added");
  }
}

function ProductDesc(product, navigate) {
  localStorage.removeItem('product');
  localStorage.setItem('product', JSON.stringify(product));
  navigate('/ProductInfo');
}

