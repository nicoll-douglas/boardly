import useBoardsList from "../hooks/useBoardsList";
import { Card } from "@chakra-ui/react";
import BoardsListAccordion from "./BoardsListAccordion";
import BoardsListCard from "./BoardsListCard";
import Loader from "./Loader";

export default function BoardsList() {
  const { data, isLoading } = useBoardsList();

  return (
    <>
      <Card
        variant={{ base: "unstyled", md: "outline" }}
        w={{ base: "full", md: 64, lg: 72 }}
        minW={{ base: "full", md: 64, lg: 72 }}
        position={{ base: "static", md: "sticky" }}
        top={"72px"}
        h={{ md: "calc(100vh - 88px)" }}
        size={"sm"}
        overflowY={"auto"}
        display={{ base: "none", md: "flex" }}
      >
        {isLoading ? (
          <Loader display={{ base: "none", md: "flex" }} />
        ) : (
          <BoardsListCard boards={data.boards} />
        )}
      </Card>
      {isLoading ? (
        <Loader display={{ base: "flex", md: "none" }} />
      ) : (
        <BoardsListAccordion boards={data.boards} />
      )}
    </>
  );
}
