import { ThreadPreview } from "@/features/Threads";
import { Card, CardBody, CardHeader, Divider, VStack } from "@chakra-ui/react";
import useBoard from "../hooks/useBoard";
import { CompactViewBtn, useCompactView } from "@/features/ui/compactView";

export default function BoardFeed() {
  const { data } = useBoard();
  const { compactView } = useCompactView();

  return (
    <Card variant={"outline"} flex={1} size={"sm"}>
      <CardHeader>
        <CompactViewBtn />
      </CardHeader>
      <Divider />
      <CardBody>
        <VStack gap={compactView ? 2 : 3}>
          {data.threads.map((thread) => (
            <ThreadPreview
              key={thread._id}
              thread={thread}
              isInProfile={false}
            />
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
}
