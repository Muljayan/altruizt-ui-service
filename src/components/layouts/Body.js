/* eslint-disable react/prop-types */
import React from 'react';

const Body = (props) => {
  // eslint-disable-next-line react/prop-types
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

export default Body;
