import { postMedia } from "./post-media";

export const postTweet = async ({
  text,
  userId,
  files,
}: {
  text: string;
  userId: string;
  files: File[];
}) => {
  try {
    const response = await fetch("/api/tweets/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        userId,
      }),
    });
    const data = await response.json();

    if (files.length > 0) {
      await postMedia({ files, tweetId: data.id });
      // delay to allow for media to be uploaded
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return data;
  } catch (error) {
    console.log("error", error);
  }
};
