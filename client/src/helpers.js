const MAX_TWEETS_PER_FILTER = 40;

function filterTweets(tweets, sectionFilter) {
  return tweets
    .filter(({ filter }) => filter === sectionFilter)
    .reverse()
    .filter((_, index) => index < MAX_TWEETS_PER_FILTER);
}

export default filterTweets;
