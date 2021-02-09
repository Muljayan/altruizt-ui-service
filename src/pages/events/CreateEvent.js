import React, { useState } from 'react';
import Body from 'components/layouts/Body';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import TextField from 'components/common/input/TextField';
import TextArea from 'components/common/input/TextArea';
import Select from 'components/common/input/selectors/Select';
import ResourceAdder from 'components/common/adders/ResourceAdder';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [resources, setResources] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);

  return (
    <Body
      title="Create Event"
    >
      <CommonContainer
        title="General Details"
      />
      <div className="row mb-2">
        <TextField
          label="Event Name"
          value={name}
          onChange={setName}
        />
        <TextField
          label="Start Date"
          colSize={6}
          type="date"
          value={startDate}
          onChange={setStartDate}
        />
        <TextField
          label="End Date"
          colSize={6}
          type="date"
          value={endDate}
          onChange={setEndDate}
        />
        <TextField
          label="Event Location"
          colSize={6}
          value={location}
          onChange={setLocation}
        />
        <TextArea
          label="Event Description"
          value={description}
          onChange={setDescription}
        />
      </div>

      <CommonContainer
        title="Bank Details"
      />
      <div className="row mb-2">
        <TextField
          label="Bank Name"
          value={bankName}
          onChange={setBankName}
        />
        <TextField
          label="Bank Branch"
          colSize={6}
          value={bankBranch}
          onChange={setBankBranch}
        />
        <TextField
          label="Bank Number"
          colSize={6}
          value={bankNumber}
          onChange={setBankNumber}
        />
      </div>

      <ResourceAdder
        label="Resources Needed"
        resources={resources}
        setResources={setResources}
      />

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
};

export default CreateEvent;
