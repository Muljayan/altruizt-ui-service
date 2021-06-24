import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from './Containers/CommonContainer';

const Body = (props) => {
  const {
    children, sidebar, image, title,
    btnText, btnLink, btnColor,
  } = props;
  const mainWidth = sidebar ? 9 : 12;
  return (
    <div className="row">
      <main key="main" className={`col-lg-${mainWidth} p-1`}>
        <div className="body-title my-1 mb-2">
          {
            image
            && (
              <div className="image-container">
                <img src={image} alt="" />
              </div>
            )
          }
          <h1 className="">{title}</h1>
          {
            (btnText && btnLink)
            && (
              <div className="link">
                <CommonContainer title={btnText} link={btnLink} color={btnColor} />
              </div>
            )
          }
        </div>
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
  image: PropTypes.string,
  btnText: PropTypes.string,
  btnLink: PropTypes.string,
  btnColor: PropTypes.string,
};

Body.defaultProps = {
  sidebar: null,
  title: null,
  image: null,
  btnText: null,
  btnLink: null,
  btnColor: null,
};

export default Body;
