import { useNavigate } from 'react-router-dom';
import '../CSS files/customerprofile.css'
import userIcon from '../assets/user-profile-icon.jpg';

export function CustomerProfile() {
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
            <p onClick={() => navigate('/CustomerProfile-OrderHistory')} style={{cursor:'pointer'}}>Order Hisotry</p>
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
            <u>Personal Info</u>
            <span onClick={() => navigate('/CustomerProfile-ActiveOrders')} style={{cursor:'pointer'}}>Active Orders</span>
            <span onClick={() => navigate('/CustomerProfile-OrderHistory')} style={{cursor:'pointer'}}>Order History</span>
          </div>
          <hr />
          <div className='personal-info'>
            <div className='address-style'>
              <span>Add Defult Address to deliver</span>
              <span className='plus-tag'>+</span>
            </div>
            <div className='address-style'>
              <span>Add you date of birth</span>
              <span className='plus-tag'>+</span>
            </div>
            <div className='address-style'>
              <span>Enter your Card details</span>
              <span className='plus-tag'>+</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}