import NoData from "../ui/NoData";
import ThreadPreview from "./ThreadPreview";
import Loader from "../ui/Loader";
import { ThreadsTabContext } from "../../contexts/ThreadsTabContext";
import { useContext } from "react";
import useIsMe from "../../hooks/useIsMe";

export default function ThreadsTab() {
  const { data, isLoading } = useContext(ThreadsTabContext);
  const [isMe] = useIsMe();

  if (isLoading) return <Loader />;

  return (
    <>
      {data.threads.length === 0 ? (
        <NoData
          text={
            isMe
              ? "Create a thread to get started!"
              : "This user doesn't have any threads."
          }
        />
      ) : (
        data.threads.map((thread) => (
          <ThreadPreview key={thread._id} thread={thread} />
        ))
      )}
    </>
  );
}
