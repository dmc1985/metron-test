import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tweet from './Tweet';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  height: 15vw;
  width: 45vw;
  overflow-y: scroll;
`;

function FilteredTweetList({ tweets }) {
  return (
    <Container>
      {tweets.reverse().map(({ tweet }, index, filteredList) => (
        <Tweet tweet={tweet} orderNumber={filteredList.length - index} />
      ))}
    </Container>
  );
}

FilteredTweetList.propTypes = {
  tweets: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default FilteredTweetList;
