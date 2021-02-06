/* eslint-disable max-len */
import React from 'react';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import YourCategories from './YourCategories';

const Sidebar = () => (
  <div className="col-lg-3 sidebar p-1">
    <CommonContainer
      title="+ Create Event"
      color="red"
      link="/events/create"
    />
    <YourCategories />
    <CommonContainer
      title="Animal Welfare"
      color="brown"
    />
    <CommonContainer
      title="Child Welfare"
      color="light-green"
    />
    <CommonContainer
      title="Marine Conservation"
      color="blue"
    />
  </div>
);

export default Sidebar;
