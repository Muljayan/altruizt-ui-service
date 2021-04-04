import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const {
    open,
    title, description,
    closeModal,
    buttonText, buttonFunction,
    text, onTextChange,
  } = props;

  const _onChange = (e) => {
    onTextChange(e.target.value);
  };

  return (
    <>
      {
        open
        && (
          <>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <div
              className="modal-background"
              onClick={closeModal}
              onKeyPress={closeModal}
              role="button"
              tabIndex="0"
            />
            <div className="modal-container">
              <div className="modal-content">
                <div className="title mb-1">
                  <h2>{title}</h2>
                </div>
                <p className="mb-1">{description}</p>
                {
                  (text || text === '')
                  && (
                    <textarea
                      type="text"
                      className="mb-1"
                      value={text}
                      onChange={_onChange}
                    />
                  )
                }
                <div className="action-buttons">
                  {
                    (closeModal)
                    && (
                      <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-red mx-1"
                      >
                        Close
                      </button>
                    )
                  }
                  {
                    (buttonText && buttonFunction)
                    && (
                      <button
                        type="button"
                        onClick={buttonFunction}
                        className="btn btn-outline-primary mx-1"
                      >
                        {buttonText}
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  buttonFunction: PropTypes.func,
  text: PropTypes.string,
  onTextChange: PropTypes.string,
};

Modal.defaultProps = {
  buttonText: null,
  buttonFunction: null,
  text: null,
  onTextChange: null,
};

export default Modal;