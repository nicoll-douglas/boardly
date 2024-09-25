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
import { formatISOString } from "@/lib/utils";
import StackData from "./StackData";

export default function BoardInfo({ variant = "xl", board, isLoading }) {
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
      variant: "outline",
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
              to={`/boards/${board.name}`}
            >{`/${board.name}`}</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Stack divider={<StackDivider />}>
              <StackData
                name="Admin"
                value={board.admin.username}
                link={`/users/${board.admin.username}`}
              />
              <StackData name="Threads" value={board.threads.length} />
              <StackData
                name="Created On"
                value={formatISOString(board.createdAt)}
              />
            </Stack>
          </CardBody>
        </>
      )}
    </Card>
  );
}
