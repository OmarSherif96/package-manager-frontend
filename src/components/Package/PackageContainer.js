import React, { useEffect, useState } from 'react';
import {
  ClickableTile,
  DataTableSkeleton,
  Dropdown,
  Search,
  TooltipIcon,
} from 'carbon-components-react';
import './PackageContainer.css';
import { getPackages } from '../../api/package';
import PackageCard from './Card/PackageCard';
import { FolderAdd32 } from '@carbon/icons-react';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

export const PackageContainer = ({ history }) => {
  const [packages, setPackages] = useState([]);
  const [sortDirection, setSortDirection] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getPackages(sortDirection);
        setPackages(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [sortDirection]);

  return (
    <div className='bx--grid package-container'>
      <div className='bx--row'>
        <div className='bx--col-lg-11'>
          <Search labelText='Search' placeHolderText='Search Packages'></Search>
        </div>
        <div className='bx--col-lg-3 package-sort'>
          <Dropdown
            id='package-sort-id'
            label=''
            classname=''
            titleText='Sort by'
            items={[
              { text: 'Lowest Price', value: 'asc' },
              { text: 'Highest Price', value: 'des' },
            ]}
            itemToString={(item) => (item ? item.text : '')}
            onChange={(event) => {
              setSortDirection(event.selectedItem.value);
            }}
          ></Dropdown>
        </div>
        <div
          onClick={() => {
            history.push('/newPackage');
          }}
          className='bx--col-lg-2'
          id='folder-tile'
        >
          <TooltipIcon tooltipText={'Create your own package'}>
            <ClickableTile id='folder-tile'>
              <FolderAdd32></FolderAdd32>
            </ClickableTile>
          </TooltipIcon>
        </div>
      </div>
      <div className='bx--row packages-list'>
        {isEmpty(packages) ? (
          <DataTableSkeleton />
        ) : (
          packages.map((pkg) => {
            return (
              <div key={pkg.id} className='bx--col-lg-5'>
                <PackageCard pkg={pkg}></PackageCard>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

withRouter(PackageContainer);
