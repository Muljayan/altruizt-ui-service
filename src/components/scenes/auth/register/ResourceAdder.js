import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/common/input/Select';
import TextField from 'components/common/input/TextField';
import Autofiller from 'components/common/autofiller';
import CommonContainer from 'components/layouts/Containers/CommonContainer';

const ResourceAdder = (props) => {
  const { resources, setResources } = props;
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [units, setUnits] = useState(null);
  const [disableUnitPicker, setDisableUnitPicker] = useState(false);

  const categoriesTypeOptions = [
    { value: 'kg', label: 'Kilograms' },
    { value: 'l', label: 'Liters' },
    { value: 'm', label: 'Meter' },
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
    if (!name || !quantity || !units) {
      alert('Fields not complete!');
    } else {
      const filteredResources = [...resources]
        .filter((resource) => resource.name === name);

      if (filteredResources.length === 0) {
        const data = {
          name,
          quantity,
          units: units.value,
        };
        setResources([...resources, data]);
      } else {
        alert('Item already added!');
      }
    }
  };
  console.log(resources);
  return (
    <>
      <CommonContainer
        title="Resources Needed/Available"
      />
      <div className="row mb-2">
        <Autofiller
          label="Find Item"
          id="item"
          colSize={12}
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
          label="Units (kg, l, m)"
          colSize={6}
          options={categoriesTypeOptions}
          value={units}
          onChange={setUnits}
          disable={disableUnitPicker}
        />
        <div className="field mx-1">
          <button type="button" onClick={_addItem} className="btn btn-outline-primary">Add Item</button>
        </div>
      </div>
    </>
  );
};

ResourceAdder.propTypes = {
  resources: PropTypes.array.isRequired,
  setResources: PropTypes.func.isRequired,
};

export default ResourceAdder;
