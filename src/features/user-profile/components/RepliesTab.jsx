import NoData from "./NoData";
import ReplyPreview from "./ReplyPreview";
import Loader from "./Loader";
import chatting2Url from "@/assets/images/chatting-2.svg";
import { RepliesTabContext } from "../contexts/RepliesTabContext";
import { useContext } from "react";

export default function RepliesTab() {
  const { data, isLoading } = useContext(RepliesTabContext);

  if (isLoading) return <Loader />;

  return (
    <>
      {data.replies.length === 0 ? (
        <NoData
          text={"Your replies to other users will show up here!"}
          imageUrl={chatting2Url}
        />
      ) : (
        data.replies.map((reply) => (
          <ReplyPreview
            key={reply._id}
            reply={reply}
            userPrivilege={data.userPrivilege}
          />
        ))
      )}
    </>
  );
}
