import React from 'react';
import PropTypes from 'prop-types';
import { Link as L } from 'react-router-dom';

const Link = (props) => {
  const { link, name } = props;
  return (
    <li>
      <L to={link}>
        <>{name}</>
      </L>
    </li>
  );
};

Link.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Link;
