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

  const [data, setData] = useState({
    categories: [],
    suggestions: [],
  });

  const _fetchData = async () => {
    try {
      const res = await API.get('/profile/sidebar');
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  const suggestionList = data.suggestions.map((suggestion) => (
    <EventSuggestion key={suggestion.id} data={suggestion} />
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
          <YourCategories data={data.categories} />
        )
      }
      {suggestionList}
    </div>
  );
};

export default Sidebar;
