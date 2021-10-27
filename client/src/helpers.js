const MAX_TWEETS_PER_FILTER = 40;

export function filterTweets(tweets, sectionFilter) {
  return tweets
    .filter(({ filter }) => filter === sectionFilter)
    .reverse()
    .filter((_, index) => index < MAX_TWEETS_PER_FILTER);
}

export function getGraphData(filterOneTweets, filterTwoTweets) {
  const isFilterOneLonger = filterOneTweets.length > filterTwoTweets;
  const longestList = isFilterOneLonger ? filterOneTweets : filterTwoTweets;
  const shortestList = isFilterOneLonger ? filterTwoTweets : filterOneTweets;

  return longestList.map(({ tweet }, index) => {
    const tweetPopularity = tweet.retweeted_status ? tweet.retweeted_status.retweet_count : 0;
    const parallelTweetPopularity =
      shortestList.length - 1 >= index && shortestList[index].tweet.retweeted_status
        ? shortestList[index].tweet.retweeted_status.retweet_count
        : 0;
    return {
      name: longestList.length - index,
      filterOne: isFilterOneLonger ? tweetPopularity : parallelTweetPopularity,
      filterTwo: isFilterOneLonger ? parallelTweetPopularity : tweetPopularity,
    };
  });
}
