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
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import useBoardsList from "../hooks/useBoardsList";
import BoardLink from "./BoardLink";
import { useState } from "react";
import boardUrl from "@/assets/images/board.svg";
import alienUrl from "@/assets/images/alien.svg";

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
        w={{ base: "full", md: 64, lg: 72 }}
        minW={{ base: "full", md: 64, lg: 72 }}
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
          <BoardLinkMap filteredList={boardsList} dataList={data.boards} />
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
            <BoardLinkMap filteredList={boardsList} dataList={data.boards} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

function BoardLinkMap({ filteredList, dataList }) {
  if (dataList.length === 0)
    return (
      <NothingToShow
        imageSrc={boardUrl}
        heading="Nothing to show"
        text="Be the first to create a board!"
      />
    );

  return (
    <>
      {filteredList.length === 0 ? (
        <NothingToShow
          imageSrc={alienUrl}
          heading={"Could not find this board"}
          text={"Try something else"}
        />
      ) : (
        <VStack gap={1}>
          {filteredList.map((board) => (
            <BoardLink key={board._id} board={board} />
          ))}
        </VStack>
      )}
    </>
  );
}

function NothingToShow({ imageSrc, heading, text }) {
  return (
    <Flex flexDir={"column"} alignItems={"center"} textAlign={"center"}>
      <Image src={imageSrc} w={220} h={220} />
      <Heading size={"sm"} mb={1}>
        {heading}
      </Heading>
      <Text>{text}</Text>
    </Flex>
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
