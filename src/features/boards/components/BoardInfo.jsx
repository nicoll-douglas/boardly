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
import { Link } from "react-router-dom";
import useBoard from "../hooks/useBoard";
import { StackData } from "@/components/common";
import { formatISOString } from "@/lib/utils";

export default function BoardInfo({ variant = "xl" }) {
  const { data, isLoading } = useBoard();

  const variantStyles = {
    xl: {
      display: { base: "none", xl: "flex" },
      position: "sticky",
      h: { md: "calc(100vh - 88px)" },
      w: { md: 64, lg: 80 },
      minW: { md: 64, lg: 80 },
      top: "72px",
      variant: "outline",
    },
    base: {
      display: { base: "flex", xl: "none" },
      position: "static",
      variant: { base: "unstyled", md: "outline" },
      h: "fit",
      w: "full",
    },
  };

  return (
    <Card size={"sm"} overflowY={"auto"} {...variantStyles[variant]}>
      {isLoading ? (
        <Center p={4} flex={1}>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <>
          <CardHeader>
            <Heading
              size={"md"}
              as={Link}
              to={`/boards/${data.board.name}`}
            >{`/${data.board.name}`}</Heading>
          </CardHeader>
          <Divider my={{ base: 4, md: 0 }} />
          <CardBody>
            <Stack divider={<StackDivider />}>
              <StackData
                name="Admin"
                value={data.board.admin.username}
                link={`/users/${data.board.admin.username}`}
              />
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
