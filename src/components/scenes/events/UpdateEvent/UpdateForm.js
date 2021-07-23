import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import TextField from 'components/common/input/TextField';
import TextArea from 'components/common/input/TextArea';
import ResourceUpdater from 'components/common/adders/ResourceUpdater';
import DataFetchSelect from 'components/common/input/selectors/DataFetchSelect';
import ImagePicker from 'components/common/input/ImagePicker';
import API from 'utils/API';
import { dateInputFormat, selectorDataFormat } from 'utils/formatters';
import ResourceReceivers from 'components/common/adders/ResourceReceivers';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';
import * as linkGenerators from 'utils/linkGenerators';

const UpdateForm = (props) => {
  const dispatchNotification = useNotificationDispatcher();

  const { id } = useParams();

  const { updateSuccess } = props;
  const [initialImage, setInitialImage] = useState('');
  const [image, setImage] = useState({
    type: null,
    value: null,
  });
  const [loaded, setLoaded] = useState(false);
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
  const [resourcesReceived, setResourcesReceived] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [updateDescription, setUpdateDescription] = useState('');

  const _onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (resources.length < 1) {
        dispatchNotification({
          title: 'Alert',
          message: 'You have not added any resources!',
        });
        return;
      }
      if (beneficiaries.length < 1) {
        dispatchNotification({
          title: 'Alert',
          message: 'You have not added any beneficiaries!',
        });
        return;
      }
      if (categories.length < 1) {
        dispatchNotification({
          title: 'Alert',
          message: 'Please add atleast one category!',
        });
        return;
      }
      const bankAnd = (!!bankName && !!bankNumber && !!bankBranch);
      const bankOr = (!!bankName || !!bankNumber || !!bankBranch);
      const partialDetails = !bankAnd && bankOr;
      if (partialDetails) {
        dispatchNotification({
          title: 'Alert',
          message: 'Please fill in all bank details!',
        });
        return;
      }
      if (bankAnd && bankNumber && bankNumber.length < 8) {
        dispatchNotification({
          title: 'Alert',
          message: 'Bank Number should be greater than 8 digits!',
        });
      }

      const data = {
        title,
        image,
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
        resourcesReceived,
        collaborators,
        beneficiaries,
        updateDescription,
      };
      await API.put(`/events/profile/${id}/update`, data);
      updateSuccess(id);
    } catch (err) {
      dispatchNotification({
        title: 'Alert',
        message: err?.response?.data?.message,
      });
      console.log(err);
      console.log(err?.response?.data?.message);
    }
  };

  const _fetchData = async () => {
    try {
      const res = await API.get(`/events/profile/${id}`);
      setTitle(res.data.title);
      setInitialImage(res.data.image);
      setStartDate(dateInputFormat(res.data.startDate));
      setEndDate(dateInputFormat(res.data.endDate));
      setLocation(res.data.location);
      setContactName(res.data.contactName);
      setPhone(res.data.phone);
      setDescription(res.data.description);
      setCategories(selectorDataFormat(res.data.categories));
      setBankName(res.data.bankName);
      setBankBranch(res.data.bankBranch);
      setBankNumber(res.data.bankNumber);
      setResources(res.data.resourcesNeeded);
      setResourcesReceived(res.data.resourcesReceived);
      setCollaborators(selectorDataFormat(res.data.organizers));
      setBeneficiaries(selectorDataFormat(res.data.beneficiaries));
      setLoaded(true);
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <form onSubmit={_onSubmit}>
      <CommonContainer
        title="General Details"
      />
      <div className="row">
        <ImagePicker
          id="profile-picture"
          colSize={4}
          initialImage={linkGenerators.eventImage(initialImage)}
          image={image}
          onChange={setImage}
        />
      </div>
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
          required
        />
        <TextField
          id="phone"
          label="Contact Number"
          colSize={6}
          value={phone}
          onChange={setPhone}
          required
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

      <ResourceUpdater
        label="Resources Needed"
        resources={resources}
        resourcesReceived={resourcesReceived}
        setResources={setResources}
      />
      <ResourceReceivers
        label="Resources Received"
        resourcesNeeded={resources}
        resources={resourcesReceived}
        setResources={setResourcesReceived}
      />

      {
        loaded
        && (
          <>
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
          </>
        )
      }

      <CommonContainer
        title="Update Description"
      />
      <TextArea
        id="description"
        placeholder="What did you update?"
        label="What did you update?"
        value={updateDescription}
        onChange={setUpdateDescription}
        required
      />
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

UpdateForm.propTypes = {
  updateSuccess: PropTypes.func.isRequired,
};

export default UpdateForm;
