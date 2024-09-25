import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Heading,
  Spinner,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import useBoard from "../hooks/useBoard";
import { StackData } from "@/components/common";
import { formatISOString } from "@/lib/utils";

export default function BoardInfo(props) {
  const { data, isLoading } = useBoard();

  return (
    <Card
      variant={"outline"}
      w={{ base: "full", md: 64, lg: 80 }}
      minW={{ base: "full", md: 64, lg: 80 }}
      position={{ base: "static", md: "sticky" }}
      top={"72px"}
      h={{ md: "calc(100vh - 88px)" }}
      size={"sm"}
      overflowY={"auto"}
      display={{ base: "none", md: "flex" }}
      {...props}
    >
      {isLoading ? (
        <Center p={4} flex={1}>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <>
          <CardHeader>
            <Heading size={"md"}>{`/${data.board.name}`}</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Stack divider={<StackDivider />}>
              <StackData name="Admin" value={data.board.admin.username} />
              <StackData name="Threads" value={data.board.threads.length} />
              <StackData
                name="Created On"
                value={formatISOString(data.board.createdAt)}
              />
            </Stack>
          </CardBody>
        </>
      )}
    </Card>
  );
}
