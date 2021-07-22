import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';

import Select from 'components/common/input/selectors/Select';
import AutoFiller from 'components/common/autofiller';
import { categoriesTypeOptions } from 'utils/categoryOptions';
import API from 'utils/API';

const ResourceForm = (props) => {
  const { setData } = props;
  const dispatchNotification = useNotificationDispatcher();

  const [name, setName] = useState('');
  const [unit, setUnits] = useState(null);
  const [disableUnitPicker, setDisableUnitPicker] = useState(false);

  const _selectedFromSuggestions = (value, payload) => {
    if (payload) {
      const filteredCategory = [...categoriesTypeOptions]
        .filter((categoryType) => categoryType.value === payload.unit);
      if (filteredCategory.length > 0) {
        setUnits(filteredCategory[0]);
        setDisableUnitPicker(true);
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
      if (!name || !unit) {
        dispatchNotification({
          title: 'Alert',
          message: 'fields are empty!',
        });
        return null;
      }
      if (disableUnitPicker) {
        dispatchNotification({
          title: 'Alert',
          message: 'Item already added!',
        });
        return null;
      }
      const data = { name, unit };
      const res = await API.post('/dashboards/resources', data);
      setData(res.data);
      dispatchNotification({
        title: 'Alert',
        message: 'Item Added Successfully!',
      });
      setName('');
      setUnits(null);
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
            type="resources"
            onSuggestionSelect={_selectedFromSuggestions}
            searchText={name}
            setSearchText={setName}
          />
          <Select
            label="Unit (kg, l, m)"
            colSize={6}
            options={categoriesTypeOptions}
            value={unit}
            onChange={setUnits}
            disable={disableUnitPicker}
          />
        </div>
        <div className="mx-1">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
};

ResourceForm.propTypes = {
  setData: PropTypes.func.isRequired,
};

export default ResourceForm;
