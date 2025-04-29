import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { noWrap } from "@/lib/constants";

export default function BoardLink({ board }) {
  return (
    <Button
      w={"full"}
      size={"sm"}
      justifyContent={"start"}
      as={Link}
      {...noWrap}
      variant={"ghost"}
      pt={2}
      to={`/boards/${board.name}`}
    >
      {`/${board.name}`}
    </Button>
  );
}
