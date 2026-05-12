import { useNavigate } from 'react-router-dom';
import '../CSS files/customerprofile.css'
import userIcon from '../assets/user-profile-icon.jpg';

export function ActiveOrders() {
  const navigate = useNavigate();

  return (
    <>
      <div className='customer-profile'>
        <div className='left-section'>
          <div>
            <p>Home</p>
            <hr />
            <p>Cart</p>
            <hr />
            <p>Active Orders</p>
            <hr />
            <p>Order Hisotry</p>
          </div>         
          <p>Logout</p>
        </div>
        <div className='right-section'>
          <div className='user-icon'>
            <img src={userIcon} />
            <h2>ajaykumarreddy</h2>
          </div>
          <hr></hr>
          <div className='info-orders-style'>
            <span onClick={() => navigate('/')}>Personal Info</span>
            <u>Active Orders</u>
            <span onClick={() => navigate('/CustomerProfile-OrderHistory')}>Order History</span>
          </div>
          <hr />
          <p>No Active Orders</p>
        </div>
      </div>
    </>
  )
}