import { useState } from 'react';
import '../CSS files/buyproduct.css';
import QR from '../assets/QR-code.svg';
import axios from 'axios';
import tick from '../assets/tick-mark.jpg';

export function BuyProduct({ buy, pay }) {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPinconde] = useState('');

  return (
    <div className="buy-product">
      <span>Username*</span>
      <input type='text' placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} />
      <br />
      <span>PhoneNumber*</span>
      <input type='text' placeholder='Enter Mobile Number' onChange={(e) => setPhone(e.target.value)} />
      <br />
      <span>Village/Town*</span>
      <input type='text' onChange={(e) => setTown(e.target.value)}></input>
      <br />
      <span>City*</span>
      <input type='text' onChange={(e) => setCity(e.target.value)}></input>
      <br />
      <span>State*</span>
      <input type='text' onChange={(e) => setState(e.target.value)}></input>
      <br />
      <span>PinCode*</span>
      <input type='text' onChange={(e) => setPinconde(e.target.value)}></input>
      <div className='buy-product-buttons'>
        <button onClick = {() => {buy(false), RemoveDetails()}} className='buy-buttons'>Cancel</button>
        <button className='buy-buttons' onClick={() => isValidDetails(username, phone, town, city, state, pincode, buy, pay)}>Continue</button>
      </div>
    </div>
  );

}

export function PaymentOption({ pay, payUPI, payCard, payOnDelivery }) {

  return (
    <div className='payment-style'>
      <h3>Payment Option</h3>
      <span onClick={() => {pay(false), payUPI(true)}}>UPI</span>
      <hr />
      <span onClick={() => {pay(false), payCard(true)}}>Credit Card</span>
      <hr />
      <span onClick={() => {pay(false), payOnDelivery(true)}}>Pay on Delivery</span>
      <br></br>
      <button onClick = {() => {pay(false), RemoveDetails()} } className='buy-buttons' onClick={() => {pay(false), RemoveDetails()}}>Cancel</button>
    </div>
  );
}

function isValidDetails(username, phone, town, city, state, pincode, buy, pay) {

  if(username.length === 0) {
    alert('Enter Valid Username');
  } else if(phone.length !== 10) {
    alert('Enter Valid Phone Number');
  } else if(town.length === 0) {
    alert('Enter Valid town');
  } else if(city.length === 0) {
    alert('Enter Valid City');
  } else if(state.length === 0) {
    alert('Enter Valid State');
  } else if(pincode.length !== 6) {
    alert('Enter Valid Pincode');
  } else {
    const userDetails = {username:username, phone:phone, town:town, city:city, state:state, pincode:pincode};
    localStorage.setItem('productUserDetails', JSON.stringify(userDetails));
    buy(false);
    pay(true);
  }
}

export function PayTypeUPI({ pay, payUPI, orderPlaced, buyCart }) {

  return(
    <div className='upi-pay'>
      <h3>Scan the QR and Pay</h3>
      <img src={QR} />
      <div>
        <button className='buy-buttons' onClick={() => OrderProduct( payUPI, orderPlaced, buyCart)}>Order</button>
        <button className='buy-buttons' onClick={() => {pay(true), payUPI(false)}}>Cancel</button>
      </div>
    </div>
  );
}

export function PayTypeCard({ pay, payCard, orderPlaced }) {

  return (
    <div className='card-pay'>
      <h2>Card Details</h2>
      <span>Enter Card Number*</span>
      <input placeholder='xxxx xxxx xxxx xxxx' />
      <br />
      <span>Start Date*</span>
      <input type='month'/>
      <br />
      <label>Expiry Date*</label>
      <input type="month" />
      <br />
      <div>
        <button className='buy-buttons' onClick={() => OrderProduct(payCard, orderPlaced)}>Order</button>
        <button className='buy-buttons' onClick={() => {pay(true), payCard(false)}}>Cancel</button>
      </div>
    </div>
  );
}

export function PayTypeDelivery({ pay, payOnDelivery, orderPlaced }) {

  return (
    <div className='delivery-pay'>
      <h2>Order type</h2>
      <span>Pay on Delivery</span>
      <div className='buy-product-buttons'>
        <button className='buy-buttons' onClick={() => OrderProduct(payOnDelivery, orderPlaced)}>Order</button>
        <button className='buy-buttons' onClick={() => {pay(true), payOnDelivery(false)}}>Cancel</button>
      </div>
    </div>
  );
}

async function OrderProduct(payOver, orderPlaced, buyCart) {
  const userDetails = JSON.parse(localStorage.getItem('productUserDetails'));
  const productId = localStorage.getItem('orderedProductId');
  const quantity = localStorage.getItem('quantity');
  const username = "ajaykumar";

  const body = {
    customername:userDetails.username,
    phone:userDetails.phone,
    town:userDetails.town,
    city:userDetails.city,
    state:userDetails.state,
    pincode:userDetails.pincode,
    productId:productId,
    quantity:quantity
  }

  // eslint-disable-next-line no-unused-vars
  const { id, ...orderedData} = body;

  if(!buyCart){  
    const data = await axios.post(`http://localhost:9090/order/${username}`, orderedData);
    if(data.data) {  
      payOver(false);
      orderPlaced(true);
    }
  } else {
    const data = await axios.post(`http://localhost:9090/order/products/${username}`, orderedData)
    if(data.data) {
      payOver(false);
      orderPlaced(true);
      buyCart(false);
    }
  }
}

export function OrderSucessfull({ orderPlaced }) {

  localStorage.removeItem('orderedProductId');
  localStorage.removeItem('productUserDetails');

  setTimeout(() => {
    orderPlaced(false);
  }, 1700);

  return (
    <div className='order-success'>
      <img src={tick} className='tick-img'/>
      <h2>Order Sucessfull</h2>
    </div>
  );
}

function RemoveDetails() {
  localStorage.removeItem('orderedProductId');
  localStorage.removeItem('productUserDetails');
  localStorage.removeItem('quantity');
}