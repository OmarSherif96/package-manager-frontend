import React, { useState } from 'react';
import {
  Header as CarbonHeader,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName,
} from 'carbon-components-react';
import { GameConsole32, ShoppingCart32 } from '@carbon/icons-react';
import './Header.css';
import { Badge } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleCart } from '../../../store/actions/cartActions';

const Header = ({ history, selectedPackages, toggleCart }) => {
  const [expanded, setExpanded] = useState(false);
  const packageCount = selectedPackages.length;
  return (
    <CarbonHeader id='header-app' aria-label=''>
      <HeaderName
        prefix=''
        children={
          <div
            onClick={() => {
              history.push('/');
            }}
            className='header-title'
          >
            <GameConsole32 id='console-icon' />
            Package Shop
          </div>
        }
      ></HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label='Cart' onClick={() => toggleCart()}>
          <Badge
            style={{ backgroundColor: '#999900' }}
            size='small'
            count={packageCount}
          >
            <ShoppingCart32 fill={'white'} />
          </Badge>
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};

const mapStateToProps = (state) => ({
  selectedPackages: state.packagesReducer.selectedPackages,
});

export default withRouter(connect(mapStateToProps, { toggleCart })(Header));
