import { Heading, Text } from "@chakra-ui/react";
import { formatISOString } from "@/lib/utils";
import AvatarCard from "./AvatarCard";

export default function ThreadCard({ thread }) {
  return (
    <AvatarCard
      tagValues={[
        `${thread.replies.length} repl${
          thread.replies.length === 1 ? "y" : "ies"
        }`,
        formatISOString(thread.createdAt),
      ]}
      user={thread.author}
      mb={4}
    >
      <Heading size={"md"}>{thread.title}</Heading>
      {thread.body && (
        <>
          <Text whiteSpace={"pre-wrap"} lineHeight={1.25}>
            {thread.body}
          </Text>
        </>
      )}
    </AvatarCard>
  );
}
