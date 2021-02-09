import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from 'utils/API';
import Select from './Select';

const DataFetchSelect = (props) => {
  const {
    type,
    defaultValue,
    label,
    colSize,
    isMulti,
    value,
    onChange,
    disable,
    hide,
  } = props;
  const [data, setData] = useState([]);

  const _fetchData = async () => {
    try {
      const res = await API.get(`/selectors/${type}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <Select
      defaultValue={defaultValue}
      label={label}
      colSize={colSize}
      options={data}
      value={value}
      onChange={onChange}
      isMulti={isMulti}
      disable={disable}
      hide={hide}
    />
  );
};

DataFetchSelect.propTypes = {
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.object,
  label: PropTypes.string.isRequired,
  colSize: PropTypes.number,
  isMulti: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
  disable: PropTypes.bool,
  hide: PropTypes.bool,
};

DataFetchSelect.defaultProps = {
  defaultValue: null,
  colSize: 6,
  isMulti: false,
  disable: false,
  hide: false,
  value: null,
};

export default DataFetchSelect;
