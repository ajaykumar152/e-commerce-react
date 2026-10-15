import { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS files/activeorders.css';
import { useNavigate } from 'react-router-dom';
import { api_url } from './BackendApi';

export function ActiveOrderList() {
  const [tracker, setTracker] = useState(false);
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const [confirmCancellation, setConfirmCancellation] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [cancelled, setCancelled] = useState(false);

  return (
    <>
      <div className='main-header' id={(tracker)? 'main-header-blur':''}>
        <div className='side-bar'>
          <div>
            <p onClick={() => navigate('/CustomerProfile')}>Profile</p><hr/>
            <p onClick={() => navigate('/')}>Home</p><hr/>
            <p onClick={() => navigate('/Cart')}>Cart</p><hr/>
            <p onClick={() => navigate('/OrderHistoryList')}>Order History</p><hr/>
          </div>
          <p>LogOut</p>
        </div>
        <div>
          <div className='search-filter-header'>
            <input type='text' placeholder='Search for an Order' className='active-order-search-box'/>
            <span className='filter'>Filter By</span>
          </div>
          <div className='active-order'>
            <GetActiveOrderProducts tracker={setTracker} date={setDate} cancel={setConfirmCancellation} order={setOrderId} />
          </div>
        </div>
      </div> 
      {tracker && <OrderTracking tracker={setTracker} date={date} />}
      {confirmCancellation && <ConfirmCancellation orderId={orderId} cancel={setConfirmCancellation} cancelled={setCancelled} />}
      {cancelled && <OrderCancelled />}
    </>
  );
}

function GetActiveOrderProducts({ tracker, date, cancel, order }) {
  const [products, setProducts] = useState([ {id:0, quantity:0, products:{}, date:'', status:''}]);

  useEffect(() => {
    async function fetch() {
      const output = await axios.get(`${api_url}`+'/order/active', {
        params: {
          username:'ajaykumar',
          page:0
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
                  <button onClick={() => {cancel(true), order(product.id)}}>Cancel Order</button>
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

function ConfirmCancellation({orderId, cancel, cancelled}) {
 
  return (
    <>
      <div className='cancel-order'>
        <h3>Do you want to cancel?</h3>
        <div>
          <button className='confirm-button' 
          onClick={() =>{ CancelOrder(orderId, cancelled), cancel(false);  }}>
            Confirm
          </button>
          <button className='cancel-button' onClick={() => cancel(false)}>Cancel</button>
        </div>
      </div>
    </>
  );
}

async function CancelOrder(orderId, cancelledOrder) {
  try{
    const cancelled = await axios.put(`${api_url}`+'/order/cancel/'+`${orderId}`);
    if(cancelled.data) {
      console.log(true);
      cancelledOrder(true);
      setTimeout(() => {cancelledOrder(false)}, 1500);
    } else {
      console.log(false);
    }
  } catch(e) {
    console.log(e.message);
  }
}

function OrderCancelled() {
  return (
    <>
      <div className='order-cancelled'>
        <h2>Order Cancelled</h2>
      </div>
    </>
  );
}