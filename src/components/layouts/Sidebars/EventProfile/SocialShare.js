import React from 'react';
import {
  useLocation,
} from 'react-router-dom';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const HOST = 'https://altruizt.xyz';

const SocialShare = () => {
  const location = useLocation();
  const url = `${HOST}/${location.pathname}`;
  return (
    <div className="social-share">
      <FacebookShareButton
        url={url}
        style={{ margin: '10px' }}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton
        url={url}
        style={{ margin: '10px' }}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TwitterShareButton
        url={url}
        style={{ margin: '10px' }}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton
        url={url}
        style={{ margin: '10px' }}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default SocialShare;
