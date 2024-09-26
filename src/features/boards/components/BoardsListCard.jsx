import { Box, CardBody, CardHeader, Divider, Heading } from "@chakra-ui/react";
import BoardSearchInput from "./BoardSearchInput";
import BoardLinks from "./BoardLinks";
import { useSearchList } from "@/hooks";

export default function BoardsListCard({ boards }) {
  const { handleSearch, filteredList, list, searchValue } =
    useSearchList(boards);

  return (
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
        <BoardLinks filteredList={filteredList} dataList={list} />
      </CardBody>
    </>
  );
}
