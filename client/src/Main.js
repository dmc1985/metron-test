import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'evergreen-ui';
import some from 'lodash/some';
import { RowContainer, Container, TweetListsContainer } from './styledComponents';
import FilteredTweetList from './FilteredTweetList';

import socket from './socketClient';
import filterTweets from './helpers';

export default function Main() {
  const [firstFilter, setFirstFilter] = useState('');
  const [secondFilter, setSecondFilter] = useState('');

  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    const listener = (tweet) => {
      setAllTweets((prevTweets) => [...prevTweets, tweet]);
    };

    socket.on('tweet', listener);

    return () => {
      socket.off('tweet', listener);
    };
  }, []);

  return (
    <Container>
      <RowContainer>
        <TextInput
          id="first"
          placeholder="First"
          value={firstFilter}
          onChange={(e) => setFirstFilter(e.target.value)}
        />
        <TextInput
          id="second"
          placeholder="Second"
          value={secondFilter}
          onChange={(e) => setSecondFilter(e.target.value)}
        />
      </RowContainer>
      <RowContainer>
        <Button
          appearance="primary"
          intent="success"
          onClick={() => {
            socket.emit('tweet-request', { filters: [firstFilter, secondFilter] });
          }}
        >
          Go
        </Button>
        <Button
          intent="danger"
          onClick={() => {
            socket.emit('stop');
            setAllTweets([]);
          }}
        >
          Reset
        </Button>
      </RowContainer>
      <TweetListsContainer>
        <FilteredTweetList tweets={filterTweets(allTweets, firstFilter)} />
        <FilteredTweetList tweets={filterTweets(allTweets, secondFilter)} />
      </TweetListsContainer>
    </Container>
  );
}
