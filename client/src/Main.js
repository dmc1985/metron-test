import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'evergreen-ui';
import some from 'lodash/some';
import { RowContainer, Container, TweetListsContainer } from './styledComponents';
import FilteredTweetList from './FilteredTweetList';

import socket from './socketClient';
import filterTweets from './helpers';
import ControlPanel from './ControlPanel';

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

  return (
    <Container>
      <ControlPanel
        {...{ firstFilter, secondFilter, setFirstFilter, setSecondFilter, setAllTweets }}
      />
      <TweetListsContainer>
        <FilteredTweetList tweets={filterTweets(allTweets, firstFilter)} />
        <FilteredTweetList tweets={filterTweets(allTweets, secondFilter)} />
      </TweetListsContainer>
    </Container>
  );
}
