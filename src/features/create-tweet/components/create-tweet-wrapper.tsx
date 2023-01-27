import { useCreateTweetModal } from "@/stores/use-create-tweet-modal";

import { CreateTweet } from "./create-tweet";

export const CreateTweetWrapper = () => {
  const in_reply_to_screen_name = useCreateTweetModal(
    (state) => state.in_reply_to_screen_name,
  );
  const in_reply_to_status_id = useCreateTweetModal(
    (state) => state.in_reply_to_status_id,
  );
  const placeholder = useCreateTweetModal((state) => state.placeholder);

  return (
    <button>
      <CreateTweet
        in_reply_to_screen_name={in_reply_to_screen_name}
        in_reply_to_status_id={in_reply_to_status_id}
        placeholder={placeholder}
        isComment={true}
      />
    </button>
  );
};
