/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDropzone } from 'react-dropzone';

const ImagePicker = (props) => {
  const {
    id, label, colSize, image, initialImage, onChange,
  } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = (e) => {
        console.log(reader.result);
        console.log(file);
        const base64string = e.target.result;
        onChange({
          type: file.type,
          value: base64string,
        });
      };
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
    maxSize: 1000000,
  });

  return (
    <div className={`col-md-${colSize}`}>
      <div className="field mx-1">
        <label htmlFor="">
          <h4>{label}</h4>
        </label>
        <div className="dropzone" {...getRootProps()}>
          <input id={id} {...getInputProps()} />
          {
            image.value
              ? (
                <img style={{ width: '100%' }} src={image.value} alt="" />
              )
              : (
                initialImage
                && (
                  <img style={{ width: '100%' }} src={initialImage} alt="" />
                )
              )
          }
          <p>Drag and drop your image here (jpg,jpeg,png). 500KB or less</p>
        </div>
      </div>
    </div>
  );
};

ImagePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  image: PropTypes.object,
  initialImage: PropTypes.string,
  colSize: PropTypes.number,
  label: PropTypes.string,
  required: PropTypes.bool,
};

ImagePicker.defaultProps = {
  colSize: 12,
  image: null,
  label: null,
  required: false,
  initialImage: '',
};

export default ImagePicker;
