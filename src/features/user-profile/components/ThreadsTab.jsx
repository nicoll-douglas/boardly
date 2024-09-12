import NoData from "./NoData";
import ThreadPreview from "./ThreadPreview";
import { Spinner } from "@chakra-ui/react";
import { ThreadsTabContext } from "../contexts/ThreadsTabContext";
import { useContext } from "react";

export default function ThreadsTab() {
  const { data, isLoading } = useContext(ThreadsTabContext);

  if (isLoading) return <Spinner my={16} size={"xl"} />;

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
