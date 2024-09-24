import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import useBoardsList from "../hooks/useBoardsList";
import BoardLink from "./BoardLink";
import { useState } from "react";

export default function BoardsList() {
  const { data } = useBoardsList();
  const [boardsList, setBoardsList] = useState(data.boards);
  const [value, setValue] = useState("");

  function handleSearch(e) {
    setValue(e.target.value);
    const query = e.target.value.toLowerCase();
    const newList = data.boards.filter((board) =>
      board.name.toLowerCase().includes(query)
    );
    setBoardsList(newList);
  }

  return (
    <>
      <Card
        variant={{ base: "unstyled", md: "outline" }}
        w={{ base: "full", md: 64, lg: 80 }}
        position={{ base: "static", md: "sticky" }}
        top={"72px"}
        h={{ md: "calc(100vh - 88px)" }}
        size={"sm"}
        overflowY={"auto"}
        display={{ base: "none", md: "flex" }}
      >
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
            <SearchInput value={value} onChange={handleSearch} />
          </CardHeader>
          <Divider />
        </Box>
        <CardBody maxW={"full"}>
          <BoardLinkMap boardsList={boardsList} />
        </CardBody>
      </Card>
      <Accordion allowToggle display={{ base: "block", md: "none" }}>
        <AccordionItem>
          <AccordionButton>
            <Box flex={1} textAlign={"left"}>
              <Heading size={"md"}>Boards</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <SearchInput onChange={handleSearch} value={value} />
            <BoardLinkMap boardsList={boardsList} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

function BoardLinkMap({ boardsList }) {
  return (
    <VStack gap={1}>
      {boardsList.map((board) => (
        <BoardLink key={board._id} board={board} />
      ))}
    </VStack>
  );
}

function SearchInput({ onChange, value }) {
  return (
    <InputGroup size={"sm"} mb={{ base: 2, md: 0 }}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color={"gray.500"} />
      </InputLeftElement>
      <Input placeholder="Search..." onChange={onChange} value={value} />
    </InputGroup>
  );
}
