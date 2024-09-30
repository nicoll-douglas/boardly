import NoData from "../ui/NoData";
import ReplyPreview from "./ReplyPreview";
import chatting2Url from "@/assets/images/chatting-2.svg";
import { RepliesTabContext } from "../../contexts/RepliesTabContext";
import { useContext } from "react";
import useIsMe from "../../hooks/useIsMe";
import { Spinner } from "@/components/common";
import { SlideFade, VStack } from "@chakra-ui/react";
import { useCompactView } from "@/features/ui/compactView";

export default function RepliesTab() {
  const { data, isLoading } = useContext(RepliesTabContext);
  const [isMe] = useIsMe();
  const { compactView } = useCompactView();

  if (isLoading) return <Spinner p={4} />;
  const filtered = data.replies.filter((reply) => !reply.deleted);

  return (
    <SlideFade in={!!data} offsetY={10}>
      <VStack gap={compactView ? 2 : 3} flex={1}>
        {filtered.length === 0 ? (
          <NoData
            text={
              isMe
                ? "Your replies to other users will show up here!"
                : "This user doesnt't have any replies."
            }
            imageUrl={chatting2Url}
          />
        ) : (
          filtered.map((reply) => (
            <ReplyPreview key={reply._id} reply={reply} />
          ))
        )}
      </VStack>
    </SlideFade>
  );
}
