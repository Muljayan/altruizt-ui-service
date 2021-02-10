import React from 'react';
import PropTypes from 'prop-types';

const InPageNotifier = (props) => {
  const {
    icon,
    header,
    title1, title2,
    buttonLabel1, buttonFunction1,
    buttonLabel2, buttonFunction2,
  } = props;

  return (
    <div className="inpage-notifier">
      <img src={`/icons/${icon}.svg`} alt="star" />
      <h1>{header}</h1>
      <p>{title1}</p>
      <p>{title2}</p>
      <div className="button-container">
        {
          (buttonLabel1 && buttonFunction1)
          && (
            <button type="button" onClick={buttonFunction1} className="btn mx-2 btn-primary">{buttonLabel1}</button>
          )
        }
        {
          (buttonLabel2 && buttonFunction2)
          && (
            <button type="button" onClick={buttonFunction2} className="btn mx-2 btn-outline-primary">{buttonLabel2}</button>
          )
        }
      </div>
      {/* <button type="submit" className="btn mx-2 btn-primary">View Event</button>
      <button type="submit" className="btn mx-2 btn-outline-primary">Create Event</button> */}
    </div>
  );
};

InPageNotifier.propTypes = {
  icon: PropTypes.string,
  header: PropTypes.string.isRequired,
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string,
  buttonLabel1: PropTypes.string.isRequired,
  buttonFunction1: PropTypes.func.isRequired,
  buttonLabel2: PropTypes.string,
  buttonFunction2: PropTypes.func,
};

InPageNotifier.defaultProps = {
  icon: 'star',
  title2: '',
  buttonLabel2: '',
  buttonFunction2: null,
};

export default InPageNotifier;
