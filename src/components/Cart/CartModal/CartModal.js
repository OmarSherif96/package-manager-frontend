import React from 'react';
import { Button, Modal } from 'carbon-components-react';
import { connect } from 'react-redux';
import { toggleCart } from '../../../store/actions/cartActions';
import { setCart } from '../../../store/actions/packagesActions';
import { Empty } from 'antd';
import { isEmpty } from 'lodash';
import { List, Avatar } from 'antd';
import packagePic from '../../../package-pic.jpg';
import './CartModal.css';
import { TrashCan16 } from '@carbon/icons-react';

const CartModal = ({ cartIsOpen, toggleCart, selectedPackages, setCart }) => {
  const getTotalPrice = () => {
    if (selectedPackages.length === 1) return selectedPackages[0].price;
    else {
      return selectedPackages.reduce((acc, val) => {
        return acc + val.price;
      }, 0);
    }
  };
  const getDiscount = () => {
    const total = getTotalPrice();
    return (total * 0.9).toFixed(2);
  };

  const handleRemoveItem = (item) => {
    const selectedPackagesCopy = [...selectedPackages];
    const index = selectedPackagesCopy.indexOf(item);
    if (index > -1) selectedPackagesCopy.splice(index, 1);
    setCart(selectedPackagesCopy);
  };

  return (
    <Modal
      size={'lg'}
      open={cartIsOpen}
      onRequestClose={toggleCart}
      primaryButtonText={'Checkout'}
      primaryButtonDisabled={isEmpty(selectedPackages)}
      secondaryButtonText={'See more items'}
    >
      {isEmpty(selectedPackages) ? (
        <Empty></Empty>
      ) : (
        <>
          <List
            className='cart-modal'
            itemLayout='horizontal'
            dataSource={selectedPackages}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                item={item}
                actions={[
                  <Button
                    size={'small'}
                    renderIcon={TrashCan16}
                    key='list-loadmore-edit'
                    onClick={() => handleRemoveItem(item)}
                  >
                    remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={packagePic} />}
                  title={<a href='https://ant.design'>{item.name}</a>}
                  description={item.price + ' USD'}
                />
              </List.Item>
            )}
          />
          <div className='total-price'>Total Price {getTotalPrice()} USD </div>
          {selectedPackages.length > 1 ? (
            <div className='discount'>After discount: {getDiscount()} USD</div>
          ) : null}
        </>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  cartIsOpen: state.cartReducer.cartIsOpen,
  selectedPackages: state.packagesReducer.selectedPackages,
});

export default connect(mapStateToProps, { toggleCart, setCart })(CartModal);
