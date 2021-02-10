import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import TextField from 'components/common/input/TextField';
import TextArea from 'components/common/input/TextArea';
import ResourceAdder from 'components/common/adders/ResourceAdder';
import DataFetchSelect from 'components/common/input/selectors/DataFetchSelect';
import API from 'utils/API';

const CreationForm = (props) => {
  const { creationSuccess } = props;
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [resources, setResources] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);

  const _onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (resources.length < 1) {
        alert('You have not added any resources!');
        return;
      }
      if (beneficiaries.length < 1) {
        alert('You have not added any beneficiaries!');
        return;
      }

      const data = {
        title,
        startDate,
        endDate,
        contactName,
        phone,
        location,
        categories,
        description,
        bankName,
        bankBranch,
        bankNumber,
        resources,
        collaborators,
        beneficiaries,
      };
      const res = await API.post('/events/create', data);
      creationSuccess(res.data.eventId);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
    }
  };

  return (
    <form onSubmit={_onSubmit}>
      <CommonContainer
        title="General Details"
      />
      <div className="row mb-2">
        <TextField
          id="title"
          label="Event Title"
          value={title}
          onChange={setTitle}
          required
        />
        <TextField
          id="startDate"
          label="Start Date"
          colSize={6}
          type="date"
          value={startDate}
          onChange={setStartDate}
          required
        />
        <TextField
          id="endDate"
          label="End Date"
          colSize={6}
          type="date"
          value={endDate}
          onChange={setEndDate}
          required
        />
        <TextField
          id="location"
          label="Event Location"
          colSize={6}
          value={location}
          onChange={setLocation}
        />
        <TextField
          id="contactName"
          label="Contact Person Name"
          colSize={6}
          value={contactName}
          onChange={setContactName}
        />
        <TextField
          id="phone"
          label="Contact Number"
          colSize={6}
          value={phone}
          onChange={setPhone}
        />
        <DataFetchSelect
          type="categories"
          label="Which category does your event fall under?"
          colSize={12}
          value={categories}
          onChange={setCategories}
          isMulti
        />
        <TextArea
          id="description"
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
          id="bankName"
          label="Bank Name"
          value={bankName}
          onChange={setBankName}
        />
        <TextField
          id="bankBranch"
          label="Bank Branch"
          colSize={6}
          value={bankBranch}
          onChange={setBankBranch}
        />
        <TextField
          id="bankNumber"
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
        <DataFetchSelect
          type="organizers"
          label="Who are your collaborators?"
          value={collaborators}
          onChange={setCollaborators}
          isMulti
        />
      </div>

      <CommonContainer
        title="Beneficiaries"
      />
      <div className="row mb-2">
        <DataFetchSelect
          type="beneficiaries"
          label="Who are your beneficiaries?"
          value={beneficiaries}
          onChange={setBeneficiaries}
          isMulti
        />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="field mx-1">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

CreationForm.propTypes = {
  creationSuccess: PropTypes.func.isRequired,
};

export default CreationForm;
