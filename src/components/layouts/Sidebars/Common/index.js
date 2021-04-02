import React, { useEffect, useState } from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import EventSuggestion from 'components/common/posts/EventSuggestion';
import API from 'utils/API';
import YourCategories from './YourCategories';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth,
);

const Sidebar = () => {
  const { isAuthenticated, organization } = useSelector(getAuthStatus);

  const [categories, setCategories] = useState([]);

  const _fetchData = async () => {
    try {
      const res = await API.get('/events/suggestions');
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  const suggestionList = categories.map((category) => (
    <EventSuggestion key={category.id} data={category} />
  ));

  return (
    <div className="col-lg-3 sidebar p-1">
      {
        organization
        && (
          <>
            <CommonContainer
              title="+ Create Event"
              color="red"
              link="/events/create"
            />
          </>
        )
      }
      {
        isAuthenticated
        && (
          <YourCategories />
        )
      }
      {suggestionList}
    </div>
  );
};

export default Sidebar;
