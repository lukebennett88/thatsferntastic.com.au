import PropTypes from 'prop-types';
import React from 'react';

function Icon({ className }) {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
};

export const navigation = [
  {
    id: 'c1097822-ff05-48fe-8c55-9019d549df04',
    title: 'Mini pouches',
    slug: '/collections/mini-pouches/',
    icon: Icon,
  },
  {
    id: '8cd6ec55-c2e3-4deb-9889-499ed0c1fe33',
    title: 'Flatlay pouches',
    slug: '/collections/flatlay-pouches/',
    icon: Icon,
  },
  {
    id: '46761fd5-bebf-49c9-a8e1-a2aecd4812f3',
    title: 'Free Standing Pouches',
    slug: '/collections/free-standing-pouches/',
    icon: Icon,
  },
  {
    id: '635e7a22-c82b-43cc-b4b4-d40abf734019',
    title: 'Limited Edition Pouches',
    slug: '/collections/limited-edition-pouches/',
    icon: Icon,
  },
  {
    id: 'e1255a2f-8cec-4df5-a861-1fd5369f9673',
    title: 'Keyfobs',
    slug: '/collections/Keyfobs/',
    icon: Icon,
  },
  {
    id: 'da3dbf37-c87a-4734-b7c7-cfd680150b1d',
    title: 'Custom Orders',
    slug: '/collections/custom-orders/',
    icon: Icon,
  },
];
