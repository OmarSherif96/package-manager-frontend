import React, { useEffect, useState } from 'react';
import Header from './components/Layout/Header/Header';
import { PackageContainer } from './components/Package/PackageContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PackageDetails from './components/Package/Details/PackageDetails';
import './App.css';
import './index.scss';
import CartModal from './components/Cart/CartModal/CartModal';
import { connect } from 'react-redux';

function App({ cartIsOpen }) {
  return (
    <div>
      <div id='background'></div>
      <div className='container'>
        <CartModal open={cartIsOpen}></CartModal>
        <BrowserRouter>
          <Header></Header>

          <Switch>
            <Route path='/' component={PackageContainer} exact></Route>
            <Route path='/newPackage' component={PackageDetails} exact></Route>
            <Route path='/details/:id' component={PackageDetails}></Route>
            <Route
              path='/marketplace'
              component={PackageContainer}
              exact
            ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartIsOpen: state.cartReducer.cartIsOpen,
});

export default connect(mapStateToProps, {})(App);
