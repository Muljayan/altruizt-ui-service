import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CommonContainer = (props) => {
  const {
    title, color, link, children,
  } = props;
  let header = <h4>{title}</h4>;
  if (link) {
    header = (
      <Link to={link}>
        <h4>{title}</h4>
      </Link>
    );
  }
  return (
    <div className="container-common">
      {
        title
        && (
          <div className={`header-${color}`}>
            {header}
          </div>
        )
      }
      {
        children && (
          <div className="body">
            {children}
          </div>
        )
      }
    </div>
  );
};

CommonContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  link: PropTypes.string,
};

CommonContainer.defaultProps = {
  title: null,
  color: 'primary',
  link: null,
  children: null,
};

export default CommonContainer;
