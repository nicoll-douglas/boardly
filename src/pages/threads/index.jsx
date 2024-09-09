import { ThreadProvider } from "@/features/threads/contexts/ThreadContext";
import Thread from "@/features/threads/components/Thread";
import { useParams } from "react-router-dom";

export default function ThreadsPage() {
  const { threadID } = useParams();

  return (
    <ThreadProvider threadID={threadID}>
      <Thread />
    </ThreadProvider>
  );
}
