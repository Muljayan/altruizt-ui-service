/* eslint-disable react/prop-types */
import React from 'react';

const Body = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, sidebar, title } = props;
  const mainWidth = sidebar ? 9 : 12;
  return (
    <div className="row">
      <main key="main" className={`col-lg-${mainWidth} p-2`}>
        <h1>{title}</h1>
        {children}
      </main>
      {sidebar}
    </div>
  );
};

export default Body;
