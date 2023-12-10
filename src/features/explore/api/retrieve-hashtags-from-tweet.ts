export const retrieveHashtagsFromTweet = (text: string): string[] | null => {
  const hashtags = text.match(/#\w+/gi);
  return hashtags ? hashtags.map((hashtag) => hashtag.slice(1)) : null;
};
