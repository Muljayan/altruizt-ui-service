import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Body from 'components/layouts/Body';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import TextField from 'components/common/input/TextField';
import TextArea from 'components/common/input/TextArea';
import Select from 'components/common/input/selectors/Select';
import ResourceAdder from 'components/common/adders/ResourceAdder';
import API from 'utils/API';
import DataFetchSelect from 'components/common/input/selectors/DataFetchSelect';
import InPageNotifier from 'components/common/notifiers/InPageNotifier';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';
import Loader from 'components/common/Loader';

const Register = () => {
  const dispatchNotification = useNotificationDispatcher();

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
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
  // const [categoriesType, setCategoriesType] = useState(null);
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

  const _onSubmit = async (e) => {
    console.log('onsubmit');
    e.preventDefault();
    setLoading(true);

    try {
      if (!userType) {
        dispatchNotification({
          title: 'Alert',
          message: 'User type not selected!',
        });
        setLoading(false);
        return;
      }
      if (isAnOrganization && !organizationType) {
        dispatchNotification({
          title: 'Alert',
          message: 'Select type of organization!',
        });
        setLoading(false);
        return;
      }
      if (password && password.length < 8) {
        dispatchNotification({
          title: 'Alert',
          message: 'Password should be greater than 8 characters!',
        });
        setLoading(false);
        return;
      }

      if (phone && phone.length < 8) {
        dispatchNotification({
          title: 'Alert',
          message: 'Phone Number should be greater than 8 characters!',
        });
        setLoading(false);
        return;
      }

      const data = {
        name,
        email,
        userType: userType.value,
        organizationType: (organizationType?.value),
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
      await API.post('/auth/register', data);
      setRegistered(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      dispatchNotification({
        title: 'Alert',
        message: err?.response?.data.message || 'Something went wrong!',
      });
      console.log(err);
    }
  };

  const _login = () => {
    history.push('/login');
  };

  const _goHome = () => {
    history.push('/');
  };

  let successMessage = 'Your account is created, we hope you have fun engaging in community service';
  if (isAnOrganization) {
    successMessage = 'Your account is created and under review. We will contact you when it is reviewed';
  }

  return (
    <Body
      title={registered ? '' : 'Register'}
    >
      {
        registered
          ? (
            <InPageNotifier
              header="Congratulations!"
              title1={successMessage}
              buttonLabel1="Go Home"
              buttonFunction1={_goHome}
              buttonLabel2="Login"
              buttonFunction2={_login}
            />
          )
          : (
            <form onSubmit={_onSubmit}>
              <CommonContainer
                title="General Details"
              />
              <div className="row mb-2">
                <Select
                  label="Are you an Organization or an Individual *"
                  options={userTypeOptions}
                  value={userType}
                  onChange={setUserType}
                />
                <DataFetchSelect
                  type="organization-types"
                  label="What kind of organization do you represent? *"
                  value={organizationType}
                  onChange={setOrganizationType}
                  hide={!isAnOrganization}
                />
                <DataFetchSelect
                  type="categories"
                  label="Which category does your organization fall under ? *"
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
                  label="Password"
                  id="password"
                  value={password}
                  onChange={setPassword}
                  type="password"
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
                    {
                      loading
                        ? (
                          <Loader />
                        )
                        : (
                          <button type="submit" className="btn btn-primary">Submit</button>
                        )
                    }
                  </div>
                </div>
              </div>
            </form>
          )
      }

    </Body>
  );
};

export default Register;
