import { Flex, Button, Spacer, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { MdViewAgenda } from "react-icons/md";
import { FiAlignJustify } from "react-icons/fi";
import useCompactView from "../hooks/useCompactView";

export default function ControlBar() {
  const { compactView, setCompactView } = useCompactView();

  return (
    <Flex gap={4}>
      <Button variant={"ghost"} size={"sm"} leftIcon={<AddIcon />}>
        New Thread
      </Button>
      <Spacer />
      <IconButton
        variant={"ghost"}
        size={"sm"}
        icon={
          compactView ? (
            <MdViewAgenda size={20} />
          ) : (
            <FiAlignJustify size={20} />
          )
        }
        onClick={() => setCompactView((v) => !v)}
      />
    </Flex>
  );
}
