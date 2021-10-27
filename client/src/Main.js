import React, { useEffect, useState } from 'react';
import some from 'lodash/some';
import { Container, TweetListsContainer } from './styledComponents';
import FilteredTweetList from './FilteredTweetList';

import socket from './socketClient';
import { getGraphData, filterTweets } from './helpers';
import ControlPanel from './ControlPanel';
import TweetGraph from './TweetGraph';

export default function Main() {
  const [firstFilter, setFirstFilter] = useState('');
  const [secondFilter, setSecondFilter] = useState('');

  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    const listener = (tweet) => {
      setAllTweets((prevTweets) =>
        some(prevTweets, { id: tweet.id }) ? prevTweets : [...prevTweets, tweet],
      );
    };

    socket.on('tweet', listener);

    return () => {
      socket.off('tweet', listener);
    };
  }, []);

  const filterOneTweets = filterTweets(allTweets, firstFilter);
  const filterTwoTweets = filterTweets(allTweets, secondFilter);

  const graphData = getGraphData(filterOneTweets, filterTwoTweets);

  return (
    <Container>
      <ControlPanel
        {...{ firstFilter, secondFilter, setFirstFilter, setSecondFilter, setAllTweets }}
      />
      <TweetListsContainer>
        <FilteredTweetList tweets={filterOneTweets} />
        <FilteredTweetList tweets={filterTwoTweets} />
      </TweetListsContainer>
      <TweetGraph data={graphData} filterOne={firstFilter} filterTwo={secondFilter} />
    </Container>
  );
}
