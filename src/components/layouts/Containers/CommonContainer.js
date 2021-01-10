import React from 'react';
import PropTypes from 'prop-types';

const CommonContainer = (props) => {
  const {
    title, color, link, children,
  } = props;
  let header = <h4>{title}</h4>;
  if (link) {
    header = (
      <a href="/">
        <h4>+ Create Event</h4>
      </a>
    );
  }
  return (
    <div className="container-common">
      <div className={`header-${color}`}>
        {header}
      </div>
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
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  color: PropTypes.string,
  link: PropTypes.string,
};

CommonContainer.defaultProps = {
  color: 'primary',
  link: null,
  children: null,
};

export default CommonContainer;
