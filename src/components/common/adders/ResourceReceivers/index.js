import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/common/input/selectors/Select';
import TextField from 'components/common/input/TextField';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';
import ResourceTable from './ResourceTable';

const ResourceReceivers = (props) => {
  const dispatchNotification = useNotificationDispatcher();

  const {
    label, resourcesNeeded, resources, setResources,
  } = props;
  const [activeResource, setActiveResource] = useState(null);
  const [quantity, setQuantity] = useState('');

  const _addItem = () => {
    if (!quantity || !activeResource) {
      dispatchNotification({
        title: 'Alert',
        message: 'Fields not complete!',
      });
      return null;
    }
    let found = false;
    const filteredResources = [...resources]
      .map((resource) => {
        if (resource.name.toLowerCase() === activeResource.value) {
          found = true;
          return {
            ...resource,
            quantity: (Number(resource.quantity) + Number(quantity)),
          };
        }
        return resource;
      });
    if (!found) {
      filteredResources.push({
        name: activeResource.label,
        quantity,
      });
    }
    setResources(filteredResources);
    return null;
  };

  const fmtResourcesNeeded = resourcesNeeded.map((resource) => ({
    value: resource.name.toLowerCase(),
    label: resource.name,
  }));

  return (
    <>
      <CommonContainer
        title={label}
      />
      <div className="row mb-2">
        <Select
          placeholder="Add items you received"
          label="Received Items"
          options={fmtResourcesNeeded}
          value={activeResource}
          onChange={setActiveResource}
        // disable={disable}
        // hide={hide}
        />
        <TextField
          label="Quantity"
          id="quantity"
          colSize={6}
          value={quantity}
          onChange={setQuantity}
          type="number"
        />
        <div className="field mx-1">
          <button type="button" onClick={_addItem} className="btn btn-outline-primary">Add Item</button>
        </div>
      </div>
      {
        resources?.length > 0
          ? (
            <div className="mx-1 mb-2">
              <ResourceTable
                resources={resources}
              />
            </div>
          )
          : <div className="message mx-1 mb-2">No resources added</div>
      }
    </>
  );
};

ResourceReceivers.propTypes = {
  label: PropTypes.string.isRequired,
  resources: PropTypes.array.isRequired,
  setResources: PropTypes.func.isRequired,
  resourcesNeeded: PropTypes.array.isRequired,
};

export default ResourceReceivers;
