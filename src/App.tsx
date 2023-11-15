
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './App.css'

//const NavBar = React.lazy(() => import('./Components/layout/NavBar'));

const Router = React.lazy(() => import('./Components/Router'));
const Header = React.lazy(() => import('./Components/Header/Header'));
const Footer = React.lazy(() => import('./Components/Footer/Footer'))

function App() {
  return(
    <React.Suspense fallback={<Spinner animation="border" />}>
      <BrowserRouter>
        
        <Header/>
        <Router />
        <Footer/>
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App;
