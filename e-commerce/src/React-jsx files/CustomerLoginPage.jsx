import { useNavigate } from 'react-router-dom';
import '../CSS files/loginpage.css'

export function CustomerLoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-form">
      <div className='login-header'>
        <div className='inlogin-header'>
          <div className='customer'>Customer</div>
          <div className='admin' onClick={() => navigate('/AdminLoginPage')}>Admin</div>
        </div>
      </div>
      <span className='text'>Username:</span>
      <input type="text" placeholder="Enter Username"/>
      <span className='text'>Password:</span>
      <input type="text" placeholder="Enter password"/>
      <button>Login</button>
      <span>new user?</span>
      <button onClick={() => navigate('/CustomerRegisterpage')}>Register</button>
    </div>
  );
}