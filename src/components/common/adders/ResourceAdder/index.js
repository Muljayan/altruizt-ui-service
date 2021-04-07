import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/common/input/selectors/Select';
import TextField from 'components/common/input/TextField';
import Autofiller from 'components/common/autofiller';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';
import ResourceTable from './ResourceTable';

const ResourceAdder = (props) => {
  const dispatchNotification = useNotificationDispatcher();

  const {
    label, resources, setResources,
    resourcesReceived,
  } = props;
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnits] = useState(null);
  const [disableUnitPicker, setDisableUnitPicker] = useState(false);
  const categoriesTypeOptions = [
    { value: 'kg', label: 'Kilograms' },
    { value: 'g', label: 'grams' },
    { value: 'l', label: 'Liters' },
    { value: 'oz', label: 'Ounce' },
    { value: 'm', label: 'Meter' },
    { value: 'pieces', label: 'Pieces' },
    { value: 'people', label: 'People' },
    { value: 'units', label: 'Units' },
  ];

  const _selectedFromSuggestions = (value, payload) => {
    if (payload) {
      const filteredCategory = [...categoriesTypeOptions]
        .filter((categoryType) => categoryType.value === payload.unit);
      if (filteredCategory.length > 0) {
        setUnits(filteredCategory[0]);
        setDisableUnitPicker(true);
      }
    } else {
      setDisableUnitPicker(false);
    }
  };

  const _addItem = () => {
    if (!name || !quantity || !unit) {
      dispatchNotification({
        title: 'Alert',
        message: 'Fields not complete!',
      });
      return null;
    }

    if (Number(quantity) <= 0) {
      dispatchNotification({
        title: 'Alert',
        message: 'Quantity should be greater than 0!',
      });
      return null;
    }

    const filteredResources = [...resources]
      .filter((resource) => resource.name === name);

    if (filteredResources.length === 0) {
      const data = {
        name,
        quantity,
        unit: unit.value,
      };
      setResources([...resources, data]);
      return null;
    }
    dispatchNotification({
      title: 'Alert',
      message: 'Item already added!',
    });
    return null;
  };

  const _removeResource = (selectedItem) => {
    // TODO this function is bugged due to defect in table module
    // When deleting everything other than 1st item gets deleted
    const filteredResources = [...resources]
      .filter((resource) => resource.name !== selectedItem.name);
    console.log({ filteredResources });
    setResources(filteredResources);
  };
  console.log({ resources });
  return (
    <>
      <CommonContainer
        title={label}
      />
      <div className="row mb-2">
        <Autofiller
          label="Find Item"
          id="item"
          colSize={12}
          type="resources"
          onSuggestionSelect={_selectedFromSuggestions}
          searchText={name}
          setSearchText={setName}
        />
        <TextField
          label="Quantity"
          id="quantity"
          colSize={6}
          value={quantity}
          onChange={setQuantity}
          type="number"
        />
        <Select
          label="Unit (kg, l, m)"
          colSize={6}
          options={categoriesTypeOptions}
          value={unit}
          onChange={setUnits}
          disable={disableUnitPicker}
        />
        <div className="field mx-1">
          <button type="button" onClick={_addItem} className="btn btn-outline-primary">Add Item</button>
        </div>
      </div>
      {
        resources.length > 0
          ? (
            <div className="mx-1 mb-2">
              <ResourceTable
                resourcesReceived={resourcesReceived}
                resources={resources}
                removeResource={_removeResource}
              />
            </div>
          )
          : <div className="message mx-1 mb-2">No resources added</div>
      }
    </>
  );
};

ResourceAdder.propTypes = {
  label: PropTypes.string.isRequired,
  resources: PropTypes.array.isRequired,
  setResources: PropTypes.func.isRequired,
  resourcesReceived: PropTypes.array,
};

ResourceAdder.defaultProps = {
  resourcesReceived: null,
};

export default ResourceAdder;
