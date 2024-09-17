import NoData from "../ui/NoData";
import ThreadPreview from "./ThreadPreview";
import Loader from "../ui/Loader";
import { ThreadsTabContext } from "../../contexts/ThreadsTabContext";
import { useContext } from "react";

export default function ThreadsTab() {
  const { data, isLoading } = useContext(ThreadsTabContext);

  if (isLoading) return <Loader />;

  return (
    <>
      {data.threads.length === 0 ? (
        <NoData text={"Create a thread to get started!"} />
      ) : (
        data.threads.map((thread) => (
          <ThreadPreview key={thread._id} thread={thread} />
        ))
      )}
    </>
  );
}
