import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../CSS files/loginpage.css'

export function AdminRegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");

  function GetUsername(event) {
    setUsername(event.target.value);
  }
  function GetEmail(event) {
    setEmail(event.target.value);
  }
  function GetPhone(event) {
    setPhone(event.target.value);
  }
  function GetPassword(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="register-form">
      <div className='login-header'>
        <div className='inlogin-header'>
          <div className='customer-in' onClick={() => navigate('/CustomerRegisterPage')}>Customer</div>
          <div className='admin-in'>Admin</div>
        </div>
      </div>
      <span className='text'>Username:</span>
      <input type="text" placeholder="Enter Username" className='username-box' onChange={GetUsername} />
      <span className='under-text'>username must contains more than 8 characters</span>
      <span>Email</span>
      <input type='text' placeholder='yours@gmail.com' onChange={GetEmail} />
      <span>Phone</span>
      <input type='number' placeholder='9834562389' onChange={GetPhone} />
      <span className='text'>Password:</span>
      <input type="text" placeholder="Enter password" className='username-box' onChange={GetPassword} />
      <span className='under-text'>password must contains more than 8 characters</span>

      
      <button onClick={() => IsValidInput(username, email, phone, password)}>Register</button>
    </div>
  );
}

async function IsValidInput(username, email, phone, password) {
  const num = phone + '';
  if(username.length < 8) {
    alert("Enter username");
  } else if(email.length === 0) {
    alert("Enter email");
  } else if(!email.endsWith('@gmail.com')) {
    alert('Enter valid email');
  } else if(num.length != 10) {
    alert('Enter valid phone');
  } else if(password.length < 8) {
    alert('enter valid password');
  } else {
    try {
      const added = await axios.post('http://localhost:9090/admin', {
        username:username,
        email:email,
        phone:phone,
        password:password
      });
      if(added) {
        console.log('added');
      } else {
        console.log('failed');
      }
    } catch {
      alert('username already exists');
    }
  }
}