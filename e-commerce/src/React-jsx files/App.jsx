import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CustomerLoginPage } from './CustomerLoginPage';
import { ProductsPage } from './ProductsPage';
import { AdminLoginPage } from './AdminLoginPage';
import { CustomerRegisterPage } from './CustomerRegisterPage';
import { AdminRegisterPage } from './AdminRegisterPage';
import { Cart } from './Cart';
import { ProductInfo } from './ProductInfo';
import { CustomerProfile } from './CustomerProfile';
import { ActiveOrders } from './CustomerProfile-ActiveOrders';
import { OrderHistory } from './Customerprofile-OrderHistory';
import { ActiveOrderList } from './ActiveOrders';
import { OrderHistoryList } from './OrderHistory';

export function App() {
  return (
    /*
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CustomerLoginPage />} />
        <Route path='/AdminLoginPage' element={<AdminLoginPage />} />
        <Route path='/CustomerRegisterPage' element={<CustomerRegisterPage />} />
        <Route path='/AdminRegisterPage' element={<AdminRegisterPage />} />
      </Routes>
    </BrowserRouter>
    */
  
   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/ProductInfo/:productId' element={<ProductInfo />} />
        <Route path='/CustomerProfile' element={<CustomerProfile />} />
        <Route path='/CustomerProfile-ActiveOrders' element={<ActiveOrders />} />
        <Route path='/CustomerProfile-OrderHistory' element={<OrderHistory />} />
        <Route path='/ActiveOrderList' element={<ActiveOrderList />} />
        <Route path="/OrderHistoryList" element={<OrderHistoryList />} />
      </Routes>
    </BrowserRouter>
    
    /*
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<CustomerProfile />} />
      <Route path='/CustomerProfile-ActiveOrders' element={<ActiveOrders />} />
      <Route path='/CustomerProfile-OrderHistory' element={<OrderHistory />} />
    </Routes>
   </BrowserRouter> 
   <ActiveOrderList />
   */
  );  
}

export default App
