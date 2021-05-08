import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const {
    open,
    title, description,
    closeModal,
    buttonText, buttonFunction,
    textPlaceholder,
    textRequired,
    text, onTextChange,
  } = props;

  const _onChange = (e) => {
    onTextChange(e.target.value);
  };

  const _onSubmit = (e) => {
    console.log('_onSubmit');
    e.preventDefault();
    buttonFunction();
  };

  return (
    <>
      {
        open
        && (
          <>
            <form onSubmit={_onSubmit}>
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
                        required={textRequired}
                        placeholder={textPlaceholder}
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
                          type="submit"
                          // onClick={buttonFunctionbutton}
                          className="btn btn-outline-primary mx-1"
                        >
                          {buttonText}
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
            </form>
          </>
        )
      }
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  buttonFunction: PropTypes.func,
  text: PropTypes.string,
  onTextChange: PropTypes.func,
  textPlaceholder: PropTypes.string,
  textRequired: PropTypes.bool,
};

Modal.defaultProps = {
  title: null,
  description: null,
  buttonText: null,
  buttonFunction: null,
  text: null,
  onTextChange: null,
  textRequired: false,
  textPlaceholder: null,
};

export default Modal;
