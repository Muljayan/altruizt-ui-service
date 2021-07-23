import React, { useEffect, useState } from 'react';
import Sidebar from 'components/layouts/Sidebars/UserProfile';

import Body from 'components/layouts/Body';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import TextField from 'components/common/input/TextField';
import TextArea from 'components/common/input/TextArea';
import Select from 'components/common/input/selectors/Select';
import ResourceAdder from 'components/common/adders/ResourceAdder';
import API from 'utils/API';
import DataFetchSelect from 'components/common/input/selectors/DataFetchSelect';
import ImagePicker from 'components/common/input/ImagePicker';
import * as linkGenerators from 'utils/linkGenerators';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';

const Profile = () => {
  const dispatchNotification = useNotificationDispatcher();

  const [image, setImage] = useState({
    type: null,
    value: null,
  });
  const [initialImage, setInitialImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [userType, setUserType] = useState(null);
  const [organizationType, setOrganizationType] = useState(null);
  const [categories, setCategories] = useState(null);
  const [categoriesFollowed, setCategoriesFollowed] = useState(null);
  const [resources, setResources] = useState([]);

  const userTypeOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'organization', label: 'Organization' },
  ];

  const isAnOrganization = (userType?.value === userTypeOptions[1].value);
  const isACorporate = (organizationType?.label === 'Corporate');
  const isABeneficiary = (organizationType?.label === 'Beneficiary');

  const _fetchData = async () => {
    const res = await API.get('/profile');
    setName(res.data.name);
    setInitialImage(res.data.image);
    setEmail(res.data.email);
    setPhone(res.data.phone);
    setAddress(res.data.address);
    setIdentificationNumber(res.data.identificationNumber);
    setDescription(res.data.description);
    setWebsite(res.data.website);
    setUserType(res.data.userType);
    setOrganizationType(res.data.organizationType);
    setCategories(res.data.categories);
    setCategoriesFollowed(res.data.categoriesFollowed);
    setResources(res.data.resources);
  };

  useEffect(() => {
    _fetchData();
  }, []);

  const _onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        image,
        name,
        email,
        userType: userType.value,
        organizationType: isAnOrganization ? organizationType.value : null,
        password,
        phone,
        address,
        website,
        identificationNumber,
        description,
        categories,
        categoriesFollowed,
        resources: isAnOrganization ? resources : [],
      };
      await API.post('/profile/edit', data);
      dispatchNotification({
        title: 'Success',
        message: 'Profile edited!',
      });
    } catch (err) {
      console.log(err);
      dispatchNotification({
        title: 'Alert',
        message: err?.response?.data?.message,
      });
    }
  };

  return (
    <Body
      title="Profile"
      sidebar={<Sidebar />}
    >
      <CommonContainer
        title="Profile Picture"
      />
      <div className="row">
        <ImagePicker
          id="profile-picture"
          colSize={4}
          initialImage={linkGenerators.userImage(initialImage)}
          image={image}
          onChange={setImage}
        />
      </div>
      <form onSubmit={_onSubmit}>
        <CommonContainer
          title="General Details"
        />
        <div className="row mb-2">
          <Select
            label="Are you an Organization or an Individual"
            options={userTypeOptions}
            value={userType}
            onChange={setUserType}
            disable
          />
          <DataFetchSelect
            type="organization-types"
            label="What kind of organization do you represent? *"
            value={organizationType}
            onChange={setOrganizationType}
            hide={!isAnOrganization}
            disable
          />
          <DataFetchSelect
            type="categories"
            label="Which category does your organization fall under ?"
            colSize={12}
            value={categories}
            onChange={setCategories}
            isMulti
            hide={!isAnOrganization}
          />
          <TextField
            label="Name"
            colSize={6}
            id="name"
            value={name}
            onChange={setName}
            required
          />
          <TextField
            label="Email"
            colSize={6}
            id="email"
            value={email}
            onChange={setEmail}
            required
          />
          <TextField
            placeholder="WARNING! For new password only!"
            label="Password"
            id="password"
            value={password}
            onChange={setPassword}
            type="password"
            colSize={6}
          />
          <TextField
            label="Telephone Number"
            id="phone"
            value={phone}
            onChange={setPhone}
            colSize={6}
            required={isAnOrganization}
          />
          <TextField
            label="Address"
            id="address"
            value={address}
            onChange={setAddress}
            colSize={6}
            required={isAnOrganization}
            hide={!isAnOrganization}
          />
          <TextField
            label="Website"
            id="website"
            value={website}
            onChange={setWebsite}
            colSize={6}
            hide={!isAnOrganization}
          />

          <TextField
            label="Company Registration Number"
            id="registrationNumber"
            placeholder="This can be any id number (eg: Company registration number, etc)"
            value={identificationNumber}
            onChange={setIdentificationNumber}
            colSize={12}
            required={isACorporate}
            hide={!isAnOrganization}
          />
          <TextArea
            label="Description"
            id="description"
            value={description}
            onChange={setDescription}
          />
          <DataFetchSelect
            id="categories"
            type="categories"
            label="Choose the categories you like to follow"
            colSize={12}
            value={categoriesFollowed}
            onChange={setCategoriesFollowed}
            isMulti
          />
        </div>
        {
          isAnOrganization
          && (
            <ResourceAdder
              label={isABeneficiary ? 'Resources Needed' : 'Resources Available'}
              resources={resources}
              setResources={setResources}
            />
          )
        }
        <hr className="my-5" />
        <div className="row">
          <div className="col-12">
            <div className="field mx-1">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>

    </Body>
  );
};

export default Profile;
