import React from 'react';
import PropTypes from 'prop-types';

const Disclaimer = (props) => {
  const { close } = props;
  return (
    <div className="disclaimer">
      <h1>Disclaimer!</h1>
      <div className="h6">
        This project is a prototype of a community driven civic engagement platform.
        <br />
        All data in the system is to mock real world scenarios.
        <br />
        This project is NOT affiliated to any organization mentioned in the system.
        <br />
        Use it at your own risk.
        <br />
        If you wish to see the project fully feel free to contact the developer.
      </div>
      <ul>
        <li><h4>Validations Added!</h4></li>
        <li><h4>Password Reset Added!</h4></li>
      </ul>
      <button type="button" onClick={close} className="btn btn-primary">I understand</button>
    </div>
  );
};

Disclaimer.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Disclaimer;
