import useBoardsList from "../hooks/useBoardsList";
import { Card, SlideFade } from "@chakra-ui/react";
import BoardsListAccordion from "./BoardsListAccordion";
import BoardsListCard from "./BoardsListCard";
import { Spinner } from "@/components/common";

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
          <Spinner display={{ base: "none", md: "flex" }} p={4} />
        ) : (
          <SlideFade in={!!data} offsetY={10}>
            <BoardsListCard boards={data.boards} />
          </SlideFade>
        )}
      </Card>
      {isLoading ? (
        <Spinner display={{ base: "flex", md: "none" }} p={4} />
      ) : (
        <BoardsListAccordion boards={data.boards} />
      )}
    </>
  );
}
