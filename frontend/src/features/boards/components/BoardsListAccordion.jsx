import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Heading,
  Box,
  AccordionIcon,
  AccordionPanel,
  SlideFade,
} from "@chakra-ui/react";
import BoardSearchInput from "./BoardSearchInput";
import BoardLinks from "./BoardLinks";
import useSearchBoards from "../hooks/useSearchBoards";

export default function BoardsListAccordion({ boards }) {
  const { onChange, filteredList, value, list } = useSearchBoards(boards);

  return (
    <Accordion allowToggle display={{ base: "block", md: "none" }}>
      <SlideFade in={!!boards} offsetY={10}>
        <AccordionItem>
          <AccordionButton>
            <Box flex={1} textAlign={"left"}>
              <Heading size={"md"}>Boards</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <BoardSearchInput onChange={onChange} value={value} />
            <BoardLinks filteredList={filteredList} dataList={list} />
          </AccordionPanel>
        </AccordionItem>
      </SlideFade>
    </Accordion>
  );
}
