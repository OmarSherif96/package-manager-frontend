import React from 'react';
import { Card, Rate } from 'antd';
import { Button } from 'carbon-components-react';
import packagePic from '../../../package-pic.jpg';
import Meta from 'antd/lib/card/Meta';
import { ShoppingBag16 } from '@carbon/icons-react';
import './PackageCard.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCart } from '../../../store/actions/packagesActions';
import { toggleCart } from '../../../store/actions/cartActions';

const PackageCard = ({
  pkg,
  history,
  selectedPackages,
  setCart,
  toggleCart,
}) => {
  const { name, price } = pkg;

  const handleAddToCart = () => {
    setCart([...selectedPackages, pkg]);
    toggleCart();
  };

  return (
    <div>
      <Card
        className='bx--col-lg-12'
        cover={<img alt='package' src={packagePic}></img>}
        hoverable
        style={{ width: 440 }}
        onClick={() => {
          history.push({
            pathname: `/details/${pkg.id}`,
            pkg: pkg,
          });

          localStorage.setItem('pkg', JSON.stringify(pkg));
        }}
      >
        <Meta title={price + ' USD'} description={name} />
        <Rate disabled defaultValue={5} />
      </Card>
      <div>
        <Button
          onClick={handleAddToCart}
          kind={'secondary'}
          renderIcon={ShoppingBag16}
          className='bx--col-lg-12'
          id='card-button'
        >
          <span style={{ color: 'white', fontSize: '1.5rem' }}>Buy Now</span>
        </Button>
      </div>
      <br></br>
    </div>
  );
};
const mapStateToProps = (state) => ({
  selectedPackages: state.packagesReducer.selectedPackages,
});

export default withRouter(
  connect(mapStateToProps, { setCart, toggleCart })(PackageCard)
);
