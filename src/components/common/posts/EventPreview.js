import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EventPreview = (props) => {
  const { data } = props;

  const categoriesList = data.categories.map((category) => (
    <div key={category.id} className="tag">
      <a href="/">{category.name}</a>
    </div>
  ));
  console.log({ xx: data.progress });

  const progressPercentage = `${(data && data.progress) || 0}%`;

  return (
    <div className="col-md-6 px-1">
      <div className="post-preview card row mt-2 p-2">
        <div className="col-lg-12 image">
          {/* <img src="/dummy-images/opportunity.jpg" alt="" /> */}
        </div>
        <div className="col-lg-12 pl-1 content">
          <h3>{data.title}</h3>
          <div className="categories">
            {categoriesList}
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="headings">Beneficiaries</div>
              <div className="stats">
                {/* <img
                  src="/dummy-icons/volunteer-organization.png"
                  alt="volunteer-organization"
                /> */}
                <div className="stat">
                  {data.beneficiaries[0].name}
                </div>
                <div className="pl-1 mb-1 stat">
                  {
                    data.beneficiaries.length > 1
                    && (
                      <>
                        <b>
                          +
                          {data.beneficiaries.length - 1}
                        </b>
                        {' '}
                        Others
                      </>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="headings">Organizers</div>
              <div className="stats">
                {/* <img
                  src="/dummy-icons/volunteer-organization.png"
                  alt="volunteer-organization"
                /> */}
                <div className="stat">
                  {data.mainOrganizer.name}
                </div>
                <div className="pl-1 mb-1 stat">
                  <b>+5</b>
                  {' '}
                  Others
                </div>
              </div>
            </div>
          </div>
          <div className="progress-bar">
            <div style={{ width: progressPercentage }} className="bar" />
          </div>
          <div className="btn-container">
            <Link className="btn btn-primary" to={`/events/profile/${data.id}`}>
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

EventPreview.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EventPreview;
