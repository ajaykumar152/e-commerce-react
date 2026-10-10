import { useNavigate } from 'react-router-dom';
import '../CSS files/customerprofile.css'
import userIcon from '../assets/user-profile-icon.jpg';


export function OrderHistory() {
  const navigate = useNavigate();

  return (
    <>
      <div className='customer-profile'>
        <div className='left-section'>
          <div>
            <p onClick={() => navigate('/')} style={{cursor:'pointer'}}>Home</p>
            <hr />
            <p onClick={() => navigate('/Cart')} style={{cursor:'pointer'}}>Cart</p>
            <hr />
            <p onClick={() => navigate('/ActiveOrderList')} style={{cursor:'pointer'}}>Active Orders</p>
            <hr />
            <p style={{cursor:'pointer'}}>Order History</p>
          </div>         
          <p style={{cursor:'pointer'}}>Logout</p>
        </div>
        <div className='right-section'>
          <div className='user-icon'>
            <img src={userIcon} />
            <h2>ajaykumarreddy</h2>
          </div>
          <hr></hr>
          <div className='info-orders-style'>
            <span onClick={() => navigate('/CustomerProfile')} style={{cursor:'pointer'}}>Personal Info</span>
            <span onClick={() => navigate('/CustomerProfile-ActiveOrders')} style={{cursor:'pointer'}}>Active Orders</span>
            <u>Order History</u>
          </div>
          <hr />
          <p>No Recent Orders</p>
        </div>
      </div>
    </>
  );
}