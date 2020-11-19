import React, { useState, useEffect } from 'react';
import packagePic from '../../../package-pic.jpg';
import './PackageDetails.css';
import {
  Button,
  DataTableSkeleton,
  MultiSelect,
  Tile,
} from 'carbon-components-react';
import { Card, Input, Rate, Form } from 'antd';
import { ShoppingBag16 } from '@carbon/icons-react';
import { connect } from 'react-redux';
import { setCart } from '../../../store/actions/packagesActions';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getProducts } from '../../../api/product';
import {
  createPackage,
  updatePackage,
  deletePackage,
} from '../../../api/package';

const PackageDetails = ({
  history,
  location,
  setCart,
  selectedPackages,
  pkg,
}) => {
  const { TextArea } = Input;

  let selectedPackage = pkg || JSON.parse(localStorage.getItem('pkg'));
  if (location.pathname === '/newPackage') selectedPackage = null;

  const packageId = isEmpty(selectedPackage) ? null : selectedPackage.id;

  const [name, setName] = useState(
    isEmpty(selectedPackage) ? '' : selectedPackage.name
  );
  const [price, setPrice] = useState(
    isEmpty(selectedPackage) ? 0.0 : selectedPackage.price
  );
  const [description, setDescription] = useState(
    isEmpty(selectedPackage) ? '' : selectedPackage.description
  );

  const [selectedProducts, setSelectedProducts] = useState(
    isEmpty(selectedPackage) ? [] : selectedPackage.products
  );

  const [allProducts, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [pkg]);

  const handleAddToCart = () => {
    setCart([...selectedPackages, selectedPackage]);
  };

  const handleChangeProduct = (selectedItems) => {
    setSelectedProducts(selectedItems);
    const totalPrice = selectedItems.reduce((acc, item) => {
      return (acc = item.usdPrice + acc);
    }, 0);
    setPrice(totalPrice);
  };

  const handleCreatePackage = async () => {
    try {
      if (isEmpty(name) || isEmpty(selectedProducts)) {
        alert('Make sure you fill all the fields');
        return;
      }

      const pkg = {
        name: name,
        description: description,
        products: selectedProducts,
      };
      const res = await createPackage(pkg);
      if (res != false) history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdatePackage = async () => {
    try {
      if (isEmpty(name) || isEmpty(selectedProducts)) {
        alert('Make sure you fill all the fields');
        return;
      }

      const pkg = {
        id: packageId,
        name: name,
        description: description,
        products: selectedProducts,
      };
      const res = await updatePackage(pkg);
      if (res != false) history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletePackage = async () => {
    try {
      if (isEmpty(name) || isEmpty(selectedProducts) || isNaN(packageId)) {
        alert('Make sure you fill all the fields');
        return;
      }

      const res = await deletePackage(packageId);
      if (res != false) history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className=' package-details-container'>
        <Tile id='details-tile' className='bx--row'>
          <div className='bx--col-lg-4'>
            <Card bordered id='image-card'>
              <img alt='package' src={packagePic}></img>

              {location.pathname === '/newPackage' ? null : (
                <Button
                  onClick={handleAddToCart}
                  kind={'secondary'}
                  renderIcon={ShoppingBag16}
                  id='card-button-details'
                >
                  <span style={{ color: 'yellow' }}>Add to cart</span>
                </Button>
              )}
            </Card>
          </div>
          <div className='bx--col-lg-8 package-details'>
            <div className='bx--row'>
              <Form.Item label={'Package Name'}>
                <Input
                  labelText={'Package Name'}
                  id={'package-name'}
                  placeholder={name}
                  value={name}
                  type='text'
                  light={false}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Item>
            </div>
            <div className='bx--row'>
              <Form.Item label={'Products in the package'}>
                <MultiSelect
                  id='products-list'
                  style={{ width: 200 }}
                  light
                  itemToString={(item) =>
                    item ? item.name + '-' + item.usdPrice + 'USD' : ''
                  }
                  items={allProducts}
                  initialSelectedItems={selectedProducts}
                  onChange={(event) => handleChangeProduct(event.selectedItems)}
                />
              </Form.Item>
            </div>
            <div className='bx--row'>
              <Form.Item label={'Package Description'}>
                <TextArea
                  rows={4}
                  cols={40}
                  labelText={'Package Description'}
                  id={'package-description'}
                  placeholder={description}
                  value={description}
                  type='text'
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Form.Item>
            </div>
            <div className='bx--row'>
              <Form.Item label={'Package Price'}>{price} USD</Form.Item>
            </div>
            <Rate disabled defaultValue={5} />

            <div id='buttons-set' className='bx--row'>
              {isEmpty(selectedPackage) ? (
                <Button
                  style={{ backgroundColor: 'green' }}
                  onClick={handleCreatePackage}
                >
                  Create the package
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleUpdatePackage}
                    className='bx--col-lg-4'
                    style={{ marginRight: 24 }}
                  >
                    Update package
                  </Button>
                  <Button
                    onClick={handleDeletePackage}
                    className='bx--col-lg-4'
                    kind='danger'
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </Tile>
      </div>
      )
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedPackages: state.packagesReducer.selectedPackages,
});

export default withRouter(
  connect(mapStateToProps, { setCart })(PackageDetails)
);
