export default async function getTweets() {
  try {
    const response = await fetch("/api/tweets");
    const tweets = await response.json();
    return tweets;
  } catch (error: any) {
    console.error(error);
  }
}
