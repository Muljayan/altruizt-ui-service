/* eslint-disable max-len */
import OrganizationCard from 'components/common/OrganizationCard';
import React from 'react';

const Description = () => (
  <div className="post-preview card mt-2 p-2 mb-2">
    <div className="content">
      <div className="headings">Description</div>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, reprehenderit fugiat? Recusandae at molestias tempore reiciendis culpa rem ex atque iste corporis quam, harum laudantium dignissimos dicta nisi voluptas necessitatibus ipsum sit maiores, quis labore. A nisi iure excepturi eaque.</p>
      <div className="headings">Beneficiaries</div>
      <div className="row stats">
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
      </div>
      <div className="headings">Volunteers</div>
      <div className="row stats">
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
      </div>
      <div className="progress-bar">
        <div className="bar" />
      </div>
    </div>
  </div>
);

export default Description;
