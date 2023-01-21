export const retrieveHashtagsFromTweet = (text: string): string[] | null => {
  // make all hashtags lowercase

  const hashtags = text.match(/#\w+/gi);
  return hashtags ? hashtags.map((hashtag) => hashtag.slice(1)) : null;
};
