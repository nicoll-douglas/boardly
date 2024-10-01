import NoData from "../ui/NoData";
import { ThreadPreview } from "@/features/threads";
import { ThreadsTabContext } from "../../contexts/ThreadsTabContext";
import { useContext } from "react";
import useIsMe from "../../hooks/useIsMe";
import { Spinner } from "@/components/common";
import { SlideFade, VStack } from "@chakra-ui/react";
import { useCompactView } from "@/features/ui/compactView";

export default function ThreadsTab() {
  const { data, isLoading } = useContext(ThreadsTabContext);
  const [isMe] = useIsMe();
  const { compactView } = useCompactView();

  if (isLoading) return <Spinner flex={1} />;

  return (
    <SlideFade in={!!data} offsetY={10}>
      <VStack gap={compactView ? 2 : 3} flex={1}>
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
      </VStack>
    </SlideFade>
  );
}
