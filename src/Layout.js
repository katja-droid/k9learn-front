import React from 'react';
import Navbar from './Navbar';
import { useAuthorization } from './AuthorizationContext';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
const Layout = ({ children }) => {
    const { isAuthorized } = useAuthorization();
  
    return (
      <>
       <Navbar /> 
        <div style={{paddingBottom: '10vh'}}>
        <Outlet />
        <Footer />
        </div>
      </>
    );
  };
  

export default Layout;
