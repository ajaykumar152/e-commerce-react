import { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS files/activeorders.css';

export function ActiveOrderList() {
  const [tracker, setTracker] = useState(false);
  const [date, setDate] = useState('');

  return (
    <>
      <div className='main-header' id={(tracker)? 'main-header-blur':''}>
        <div className='side-bar'>
          <div>
            <p>Profile</p><hr/>
            <p>Home</p><hr/>
            <p>Cart</p><hr/>
            <p>Active Orders</p><hr/>
            <p>Order History</p><hr/>
          </div>
          <p>LogOut</p>
        </div>
        <div>
          <div className='search-filter-header'>
            <input type='text' placeholder='Search for an Order' className='active-order-search-box'/>
            <span className='filter'>Filter By</span>
          </div>
          <div className='active-order'>
            <GetActiveOrderProducts tracker={setTracker} date={setDate} />
          </div>
        </div>
      </div> 
      {tracker && <OrderTracking tracker={setTracker} date={date} />}
    </>
  );
}

function GetActiveOrderProducts({ tracker, date }) {
  const [products, setProducts] = useState([ {id:0, quantity:0, products:{}, date:''}]);

  useEffect(() => {
    async function fetch() {
      const output = await axios.get('http://localhost:9090/order', {
        params: {
          username:'ajaykumar'
        }
      });
      setProducts(output.data);
    }
    fetch();
  }, []);
  
  return (
    <>
      {
        products.map((product) => {
          return(
            <div className='active-order-list' key={product.id}>
              <div>
                <img src={product.products.productLink} />
              </div>
              <div className='active-order-product'>
                  <div className='product-details'>
                    <b>{product.products.productName}</b>
                    <span>Quantity:{product.quantity}</span>
                    <span>Total Cost: ${product.products.price * product.quantity}/-</span>
                    <b>Delivery on: {product.date}</b>
                  </div>
                <div className='order-buttons'>
                  <button>Buy Again</button>
                  <button>Cancel Order</button>
                </div>
              </div>
              <div>
                <button className='track-package-button' onClick={() => {tracker(true), date(product.date)}}>Track Package</button>
              </div>
            </div>
          );
        })
      }
    </>
  );
}

function OrderTracking({ tracker, date }) {
  const endDate = new Date(date);
  const startDate = new Date(date); 
  startDate.setDate(startDate.getDate() - 3);
  const today = new Date();
  const duration = endDate - startDate;
  const elapsed = today - startDate;

  let progress = (elapsed / duration) * 100;
  progress = Math.floor(Math.min(Math.max(progress, 0), 100));

  return (
    <div className='order-tracking'>
      <h2>Your Order:</h2>
      <div className='order-position'>
        <b>Preparing</b>
        <b>Shipped</b>
        <b>Delivered</b>
      </div>
      <div className='order-tracker'>
        <div style={{width:`${progress}%`}}></div>
      </div>
      <button onClick={() => tracker(false)}>Close</button>
    </div>
  );
}
