import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';

import AutoFiller from 'components/common/autofiller';
import { categoriesTypeOptions } from 'utils/categoryOptions';
import API from 'utils/API';

const CategoriesForm = (props) => {
  const { setData } = props;
  const dispatchNotification = useNotificationDispatcher();

  const [name, setName] = useState('');
  const [disableUnitPicker, setDisableUnitPicker] = useState(false);

  const _selectedFromSuggestions = (value, payload) => {
    if (payload) {
      const filteredCategory = [...categoriesTypeOptions]
        .filter((categoryType) => categoryType.value === payload.unit);
      if (filteredCategory.length > 0) {
        dispatchNotification({
          title: 'Alert',
          message: 'You cannot add an already existing item',
        });
      }
    } else {
      setDisableUnitPicker(false);
    }
  };

  const _onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        dispatchNotification({
          title: 'Alert',
          message: 'fields are empty!',
        });
        return null;
      }
      if (disableUnitPicker) {
        dispatchNotification({
          title: 'Alert',
          message: 'Category already added!',
        });
        return null;
      }
      const data = { name: name.toLowerCase() };
      const res = await API.post('/dashboards/categories', data);
      setData(res.data);
      dispatchNotification({
        title: 'Alert',
        message: 'Item Added Successfully!',
      });
      setName('');
      setDisableUnitPicker(false);
      return null;
    } catch (err) {
      dispatchNotification({
        title: 'Alert',
        message: err?.response?.data?.message || 'Something went wrong',
      });
      return null;
    }
  };

  return (
    <>
      <form className="mb-4" onSubmit={_onSubmit}>
        <div className="row mb-2 mt-4">
          <AutoFiller
            label="Find Item"
            id="item"
            colSize={12}
            type="categories"
            onSuggestionSelect={_selectedFromSuggestions}
            searchText={name}
            setSearchText={setName}
          />
        </div>
        <div className="mx-1">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
};

CategoriesForm.propTypes = {
  setData: PropTypes.func.isRequired,
};

export default CategoriesForm;
