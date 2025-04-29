import { Button, useDisclosure, Text, Box } from "@chakra-ui/react";
import { MdReply } from "react-icons/md";
import ReplyTextarea from "./ReplyTextarea";
import { FormModal, CardLabel } from "@/components/common";
import { useThread } from "@/features/threads";

export default function ReplyBtn({ reply, ...rest }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useThread();

  return (
    <>
      <Button
        rightIcon={<MdReply size={16} />}
        variant={"ghost"}
        size={"xs"}
        onClick={onOpen}
        {...rest}
      >
        Reply
      </Button>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        heading={`Reply to ${reply.author.username}`}
      >
        <Box mb={4}>
          <CardLabel
            postText="said:"
            link={`/users/${reply.author.username}`}
            linkText={reply.author.username}
          />
          <Text whiteSpace={"pre-wrap"} lineHeight={1.25}>
            {reply.body}
          </Text>
        </Box>
        <ReplyTextarea
          threadId={data.thread._id}
          parentId={reply._id}
          onSuccess={onClose}
        />
      </FormModal>
    </>
  );
}
