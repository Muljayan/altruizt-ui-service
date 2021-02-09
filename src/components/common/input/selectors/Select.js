import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

const Select = (props) => {
  const {
    defaultValue,
    value,
    label,
    colSize,
    options,
    isMulti,
    onChange,
    disable,
    hide,
  } = props;
  // const [__, setSelectedOption] = useState(null);
  // const colSize = 6;

  const customStyles = {
    option: (provided) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      // color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      backgroundColor: '#efefef',
      color: '#707070',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      outline: 'none',
      border: 'none',
      padding: '1rem',
      borderRadius: '0.5rem',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  const _onChange = (e) => {
    onChange(e);
  };

  return (
    <>
      {
        !hide
        && (
          <div className={`col-md-${colSize}`}>
            <div className="field mx-1">
              <label htmlFor="">
                <h4>{label}</h4>
              </label>
              <ReactSelect
                defaultValue={defaultValue}
                onChange={_onChange}
                value={value}
                // value={null}
                options={options}
                isClearable
                isSearchable
                styles={customStyles}
                isMulti={isMulti}
                isDisabled={disable}
              />
            </div>
          </div>
        )
      }
    </>
  );
};

Select.propTypes = {
  defaultValue: PropTypes.object,
  label: PropTypes.string.isRequired,
  colSize: PropTypes.number,
  options: PropTypes.array.isRequired,
  isMulti: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
  disable: PropTypes.bool,
  hide: PropTypes.bool,
};

Select.defaultProps = {
  defaultValue: null,
  colSize: 6,
  isMulti: false,
  disable: false,
  hide: false,
  value: null,
};

export default Select;
