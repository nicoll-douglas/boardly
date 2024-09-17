import { Flex, Button, Spacer } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { CompactViewBtn } from "@/features/ui/compactView";
import useProfile from "../hooks/useProfile";
import config from "@/config";

export default function ControlBar() {
  const { data } = useProfile();

  return (
    <Flex gap={2}>
      {data.userPrivilege === config.userPrivilege.self && (
        <>
          <Button variant={"ghost"} size={"sm"} leftIcon={<AddIcon />}>
            New Thread
          </Button>
          <Button variant={"ghost"} size={"sm"} leftIcon={<AddIcon />}>
            New Board
          </Button>
        </>
      )}
      <Spacer />
      <CompactViewBtn />
    </Flex>
  );
}
