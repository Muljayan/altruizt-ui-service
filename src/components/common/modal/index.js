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
    text,
    textType,
    onTextChange,
    text2,
    textType2,
    onTextChange2,
    textRequired2,
    textPlaceholder2,
  } = props;

  const _onChange = (e) => {
    onTextChange(e.target.value);
  };
  const _onChange2 = (e) => {
    onTextChange2(e.target.value);
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
                      textType === 'area'
                        ? (
                          <textarea
                            type="text"
                            className="mb-1"
                            value={text}
                            onChange={_onChange}
                            required={textRequired}
                            placeholder={textPlaceholder}
                          />
                        )
                        : (
                          <input
                            type={textType}
                            className="mb-1"
                            value={text}
                            onChange={_onChange}
                            required={textRequired}
                            placeholder={textPlaceholder}
                          />
                        )
                    )
                  }
                  {
                    (text2 || text2 === '')
                    && (
                      textType2 === 'area'
                        ? (
                          <textarea
                            type="text"
                            className="mb-1"
                            value={text2}
                            onChange={_onChange2}
                            required={textRequired2}
                            placeholder={textPlaceholder2}
                          />
                        )
                        : (
                          <input
                            type={textType2}
                            className="mb-1"
                            value={text2}
                            onChange={_onChange2}
                            required={textRequired2}
                            placeholder={textPlaceholder2}
                          />
                        )
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
  textType: PropTypes.string,
  onTextChange: PropTypes.func,
  textPlaceholder: PropTypes.string,
  textRequired: PropTypes.bool,
  textType2: PropTypes.string,
  text2: PropTypes.string,
  onTextChange2: PropTypes.func,
  textRequired2: PropTypes.bool,
  textPlaceholder2: PropTypes.string,
};

Modal.defaultProps = {
  title: null,
  description: null,
  buttonText: null,
  buttonFunction: null,
  text: null,
  textType: 'area',
  onTextChange: null,
  textRequired: false,
  textPlaceholder: null,
  text2: null,
  textType2: 'area',
  onTextChange2: null,
  textRequired2: false,
  textPlaceholder2: null,
};

export default Modal;
