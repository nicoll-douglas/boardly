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
import { useSearchList } from "@/hooks";

export default function BoardsListAccordion({ boards }) {
  const { handleSearch, filteredList, searchValue, list } =
    useSearchList(boards);

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
            <BoardSearchInput onChange={handleSearch} value={searchValue} />
            <BoardLinks filteredList={filteredList} dataList={list} />
          </AccordionPanel>
        </AccordionItem>
      </SlideFade>
    </Accordion>
  );
}
