import { Box, Text, Divider, SlideFade } from "@chakra-ui/react";
import { timeAgo } from "@/lib/utils";
import { CardLabel, DeletedLabel } from "@/components/common";
import AvatarCard from "./AvatarCard";

export default function ReplyCard({ reply }) {
  return (
    <SlideFade in={true}>
      <AvatarCard
        tagValues={[timeAgo(reply.createdAt)]}
        user={reply.author}
        reply={reply}
        replyBtn
        as="li"
      >
        {reply.parent && (
          <>
            {reply.parent.deleted ? (
              <Text fontStyle={"italic"} color={"gray.500"}>
                reply was deleted
              </Text>
            ) : (
              <>
                <Box>
                  {reply.parent.author.deleted ? (
                    <DeletedLabel postText="said:" size="sm">
                      deleted user
                    </DeletedLabel>
                  ) : (
                    <CardLabel
                      postText="said:"
                      link={`/users/${reply.parent.author.username}`}
                      linkText={reply.parent.author.username}
                      fontSize="sm"
                    />
                  )}
                  <Text
                    fontSize={"sm"}
                    whiteSpace={"pre-wrap"}
                    lineHeight={1.25}
                  >
                    {reply.parent.body}
                  </Text>
                </Box>
              </>
            )}
            <Divider my={2} />
          </>
        )}
        <Text whiteSpace={"pre-wrap"} lineHeight={1.25}>
          {reply.body}
        </Text>
      </AvatarCard>
    </SlideFade>
  );
}
