import React from 'react';
import PropTypes from 'prop-types';

const Body = (props) => {
  const { children, sidebar, title } = props;
  const mainWidth = sidebar ? 9 : 12;
  return (
    <div className="row">
      <main key="main" className={`col-lg-${mainWidth} p-1`}>
        <h1 className="mb-2 mt-1">{title}</h1>
        {children}
      </main>
      {sidebar}
    </div>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node,
  title: PropTypes.string,
};

Body.defaultProps = {
  sidebar: null,
  title: null,
};

export default Body;
