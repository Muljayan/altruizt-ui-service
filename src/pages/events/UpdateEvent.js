import React from 'react';
import Body from 'components/layouts/Body';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import TextField from 'components/common/input/TextField';
import TextArea from 'components/common/input/TextArea';
import Select from 'components/common/input/Select';

const UpdateEvent = () => (
  <Body
    title="Update Event"
  >
    <CommonContainer
      title="General Details"
    />
    <div className="row mb-2">
      <TextField
        label="Event Name"
      />
      <TextField
        label="Start Date"
        colSize={6}
        type="date"
      />
      <TextField
        label="End Date"
        colSize={6}
        type="date"
      />
      <TextField
        label="Event Location"
        colSize={6}
      />
      <TextArea
        label="Event Description"
      />
    </div>

    <CommonContainer
      title="Bank Details"
    />
    <div className="row mb-2">
      <TextField
        label="Bank Name"
      />
      <TextField
        label="Bank Branch"
        colSize={6}
      />
      <TextField
        label="Bank Number"
        colSize={6}
      />
    </div>

    <CommonContainer
      title="Resources"
    />
    <div className="row mb-2">
      <Select
        label="Find Item"
      />
      <TextField
        label="Bank Name"
      />
      <TextField
        label="Quantity"
        colSize={6}
        type="number"
      />
    </div>

    <CommonContainer
      title="Collaborators"
    />
    <div className="row mb-2">
      <Select
        label="Find Item"
      />
    </div>

    <CommonContainer
      title="Beneficiaries"
    />
    <div className="row mb-2">
      <Select
        label="Find Item"
      />
    </div>
  </Body>
);

export default UpdateEvent;
