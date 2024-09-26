import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
} from "@chakra-ui/react";
import useBoardsList from "../hooks/useBoardsList";
import { useState } from "react";
import BoardSearchInput from "./BoardSearchInput";
import BoardLinks from "./BoardLinks";
import Loader from "./Loader";

export default function BoardsList() {
  const { data, isLoading } = useBoardsList();
  const [boardsList, setBoardsList] = useState(data?.boards);
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    setSearchValue(e.target.value);
    const query = e.target.value.toLowerCase();
    const newList = data?.boards.filter((board) =>
      board.name.toLowerCase().includes(query)
    );
    setBoardsList(newList);
  }

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
          <Loader />
        ) : (
          <>
            <Box
              position={"sticky"}
              top={0}
              style={{ backdropFilter: "blur(20px)" }}
              zIndex={100}
            >
              <CardHeader>
                <Heading mb={3} size={"md"}>
                  Boards
                </Heading>
                <BoardSearchInput value={searchValue} onChange={handleSearch} />
              </CardHeader>
              <Divider />
            </Box>
            <CardBody maxW={"full"}>
              <BoardLinks filteredList={boardsList} dataList={data.boards} />
            </CardBody>
          </>
        )}
      </Card>
      {isLoading ? (
        <Loader />
      ) : (
        <Accordion allowToggle display={{ base: "block", md: "none" }}>
          <AccordionItem>
            <AccordionButton>
              <Box flex={1} textAlign={"left"}>
                <Heading size={"md"}>Boards</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <BoardSearchInput onChange={handleSearch} value={searchValue} />
              <BoardLinks filteredList={boardsList} dataList={data.boards} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}
