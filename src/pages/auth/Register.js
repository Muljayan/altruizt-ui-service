import React, { useState } from 'react';
import Body from 'components/layouts/Body';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import TextField from 'components/common/input/TextField';
import TextArea from 'components/common/input/TextArea';
import Select from 'components/common/input/Select';
import ResourceAdder from 'components/scenes/auth/register/ResourceAdder';
import API from 'utils/API';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [userType, setUserType] = useState(null);
  const [organizationType, setOrganizationType] = useState(null);
  // const [categoriesType, setCategoriesType] = useState(null);
  const [categories, setCategories] = useState(null);
  const [categoriesFollowed, setCategoriesFollowed] = useState(null);
  const [resources, setResources] = useState([]);

  const userTypeOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'organization', label: 'Organization' },
  ];

  const organizationTypeOptions = [
    { value: 3, label: 'Corporate' },
    { value: 4, label: 'Charity' },
    { value: 5, label: 'Volunteer Organization' },
  ];

  const categoriesTypeOptions = [
    { value: 1, label: 'Disaster Relief' },
    { value: 2, label: 'Environmental Conservation' },
    { value: 3, label: 'Marine Conservation' },
    { value: 4, label: 'Animal Welfare' },
    { value: 5, label: 'Education and Professional Development' },
    { value: 6, label: 'Child Welfare' },
    { value: 7, label: 'Education and Development' },
  ];

  const isAnOrganization = (userType?.value === userTypeOptions[1].value);
  const isACorporate = (organizationType?.value === organizationTypeOptions[0].value);

  const _onSubmit = (e) => {
    e.preventDefault();
    try {
      if (!userType) {
        alert('usertype not selected');
        return;
      }
      if (isAnOrganization && !organizationType) {
        alert('Select type of organization!');
        return;
      }

      const data = {
        name,
        email,
        isAnOrganization,
        isACorporate,
        userType,
        organizationType,
        password,
        phone,
        address,
        website,
        companyRegistrationNumber: isACorporate ? registrationNumber : null,
        description,
        categories,
        categoriesFollowed,
        resources: isAnOrganization ? resources : [],
      };
      console.log(data);
      API.post('/auth/register', data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Body
      title="Register"
    >
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
          />
          {
            (userType?.value === userTypeOptions[1].value)
            && (
              <Select
                label="What kind of organization do you represent?"
                options={organizationTypeOptions}
                value={organizationType}
                onChange={setOrganizationType}
              />
            )
          }
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
            label="Password"
            id="password"
            value={password}
            onChange={setPassword}
            colSize={6}
            required
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
          />
          <TextField
            label="Website"
            id="website"
            value={website}
            onChange={setWebsite}
            colSize={6}
            required={isAnOrganization}
          />
          {
            isACorporate
            && (
              <TextField
                label="Company Registration Number"
                id="registrationNumber"
                value={registrationNumber}
                onChange={setRegistrationNumber}
                colSize={6}
                required={isACorporate}
              />
            )
          }
          <TextArea
            label="About your Organization"
            id="description"
            value={description}
            onChange={setDescription}
          />
          <Select
            label="Which category does your organization fall under ?"
            colSize={12}
            options={categoriesTypeOptions}
            value={categories}
            onChange={setCategories}
          />
          <Select
            label="Choose the categories you like to follow"
            colSize={12}
            options={categoriesTypeOptions}
            value={categoriesFollowed}
            onChange={setCategoriesFollowed}
            isMulti
          />
        </div>
        {
          userType?.value === 'organization'
          && (
            <ResourceAdder
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

export default Register;
