import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import StatCard from 'components/common/cards/StatCard';
import Chart from 'components/common/cards/Chart';
import ResourceCard from 'components/common/cards/ResourceCard';
import ResourceSuggestion from './ResourceSuggestion';

const OrganizationStats = (props) => {
  const { data } = props;
  const {
    totalEvents,
    completedEvents,
    totalPledges,
    successfulEvents,
    totalRatings,
    totalRatingValue,
    eventsBenefitted,
    highestRatedEvent,
    resourcesNeeded,
    resourcesAvailable,
    organizationType,
    suggestions,
  } = data;

  const ratingScore = totalRatings > 0 ? ((totalRatingValue / totalRatings) * 100).toFixed(2) : 0;

  let completionRate = 0;
  if (totalEvents > 0) {
    completionRate = (completedEvents / totalEvents) * 100;
  }

  let successRate = 0;
  if (completedEvents > 0) {
    successRate = (successfulEvents / completedEvents) * 100;
  }

  return (
    <>
      <CommonContainer
        title="Your Organization"
      />
      <div className="row">
        <StatCard
          label="Total Events"
          value={totalEvents}
          link="/dashboard/manage/events"
          linkLabel="View"
        />
        <StatCard
          label="Events Completed"
          value={completedEvents}
        />
        <StatCard
          label="Events in Progress"
          value={totalEvents - completedEvents}
        />
        <StatCard
          label="Total pledges received"
          value={totalPledges}
        />
        <StatCard
          label="Total ratings count"
          value={totalRatings}
        />
        <StatCard
          label="Total ratings value"
          value={totalRatingValue}
        />
        {
          organizationType === 3
          && (
            <StatCard
              label="Events Benefitted"
              value={eventsBenefitted}
              link="/dashboard/manage/events-benefitted"
              linkLabel="View"
            />
          )
        }

        <Chart
          // key={resource.id}
          label="Total ratings score"
          value={ratingScore}
        />
        <Chart
          // key={resource.id}
          label="Event Completion Rate"
          value={completionRate}
        />
        <Chart
          // key={resource.id}
          label="Project Success Rate"
          value={successRate}
        />
        {
          highestRatedEvent
          && (
            <StatCard
              label="Most Popular Event"
              value={highestRatedEvent.title}
              link={`/events/profile/${highestRatedEvent.id}`}
              linkLabel="View"
            />
          )
        }
      </div>
      <ResourceCard
        title={organizationType === 3 ? 'Resources Needed' : 'Resources Available'}
        resources={organizationType === 3 ? resourcesNeeded : resourcesAvailable}
      />
      <ResourceSuggestion
        title={
          organizationType === 3 ? 'Organizations which have resources you need' : 'Organizations which need your resources'
        }
        data={suggestions}
      />
    </>
  );
};

OrganizationStats.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OrganizationStats;
