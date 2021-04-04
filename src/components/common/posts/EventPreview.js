import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as linkGenerators from 'utils/linkGenerators';

const EventPreview = (props) => {
  const { data } = props;

  const categoriesList = data.categories.map((category) => (
    <div key={category.id} className="tag">
      <a href="/">{category.name}</a>
    </div>
  ));

  const progressPercentage = `${(data && data.progress) || 0}%`;

  return (
    <div className="col-md-6 px-1">
      <div className="post-preview card row mt-2 p-2">
        <div className="col-lg-12 image">
          <img src={linkGenerators.eventImage(data.image)} alt="" />
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
                <img
                  src={linkGenerators.userImage(data.beneficiaries[0].image)}
                  alt="volunteer-organization"
                />
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
                <img
                  src={linkGenerators.userImage(data.mainOrganizer.image)}
                  alt="volunteer-organization"
                />
                <div className="stat">
                  {data.mainOrganizer.name}
                </div>
                {
                  data.organizers.length > 0
                  && (
                    <div className="pl-1 mb-1 stat">
                      <b>
                        +
                        {data.organizers.length}
                      </b>
                      {' '}
                      Others
                    </div>
                  )
                }
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
