import React from 'react';
import PropTypes from 'prop-types';

function Tweet({ tweet, orderNumber }) {
  return (
    <span key={tweet.id}>
      {orderNumber}. {tweet.text}
    </span>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  orderNumber: PropTypes.number.isRequired,
};

export default Tweet;
