import { useNavigate } from 'react-router-dom';
import '../CSS files/loginpage.css'

export function AdminLoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-form">
      <div className='login-header'>
        <div className='inlogin-header'>
          <div className='customer-in' onClick={() => navigate('/')}>Customer</div>
          <div className='admin-in'>Admin</div>
        </div>
      </div>
      <span id='text'>Username:</span>
      <input type="text" placeholder="Enter Username"/>
      <span id='text'>Password:</span>
      <input type="text" placeholder="Enter password"/>
      <button>Login</button>
      <span>new user?</span>
      <button onClick={() => navigate('/CustomerRegisterpage')}>Register</button>
    </div>
  );
}