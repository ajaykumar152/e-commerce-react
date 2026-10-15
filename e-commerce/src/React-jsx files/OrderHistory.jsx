import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { api_url } from "./BackendApi";
import '../CSS files/activeorders.css';

export function OrderHistoryList() {
    const navigate = useNavigate();

    return (
        <>
            <div className='main-header'>
                <div className='side-bar'>
                    <div>
                        <p onClick={() => navigate('/CustomerProfile')}>Profile</p><hr/>
                        <p onClick={() => navigate('/')}>Home</p><hr/>
                        <p onClick={() => navigate('/Cart')}>Cart</p><hr/>
                        <p onClick={() => navigate('/ActiveOrderList')}>Active Order</p><hr/>
                    </div>
                    <p>LogOut</p>
                </div>
                <div>
                    <div className='search-filter-header'>
                        <input type='text' placeholder='Search for an Order' className='active-order-search-box'/>
                        <span className='filter'>Filter By</span>
                    </div>
                    <div className='active-order'>
                       <GetInActiveOrderProducts />
                    </div>
                </div>
            </div>
        </>
    );
}


function GetInActiveOrderProducts({ tracker, date }) {
  const [products, setProducts] = useState([ {id:0, quantity:0, products:{}, date:'', status:''}]);

  useEffect(() => {
    async function fetch() {
      const output = await axios.get(`${api_url}`+'/order/inactive', {
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
                    <b>{product.status} on: {product.date}</b>
                  </div>
                <div className='order-buttons'>
                  <button>Buy Again</button>
                  <button>Cancel Order</button>
                </div>
              </div>
              <div>
                <button className="track-package-button">{product.status}</button>
              </div>
            </div>
          );
        })
      }
    </>
  );
}

