import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  border-bottom: 1px solid black;
`;

function Tweet({ tweet, orderNumber }) {
  return (
    <Container key={tweet.id}>
      {orderNumber}. {tweet.text}
    </Container>
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
