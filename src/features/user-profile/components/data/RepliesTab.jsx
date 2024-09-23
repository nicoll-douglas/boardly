import NoData from "../ui/NoData";
import ReplyPreview from "./ReplyPreview";
import Loader from "../ui/Loader";
import chatting2Url from "@/assets/images/chatting-2.svg";
import { RepliesTabContext } from "../../contexts/RepliesTabContext";
import { useContext } from "react";
import useIsMe from "../../hooks/useIsMe";

export default function RepliesTab() {
  const { data, isLoading } = useContext(RepliesTabContext);
  const [isMe] = useIsMe();

  if (isLoading) return <Loader />;

  return (
    <>
      {data.replies.length === 0 ? (
        <NoData
          text={
            isMe
              ? "Your replies to other users will show up here!"
              : "This user doesnt't have any replies."
          }
          imageUrl={chatting2Url}
        />
      ) : (
        data.replies.map((reply) => (
          <ReplyPreview key={reply._id} reply={reply} />
        ))
      )}
    </>
  );
}
