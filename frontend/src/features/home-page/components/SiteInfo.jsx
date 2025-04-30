import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Stack,
  StackDivider,
  SlideFade,
  Center,
  Flex,
} from "@chakra-ui/react";
import { formatISOString } from "@/lib/utils";
import { Spinner, StackData, Logo } from "@/components/common";
import useSiteInfo from "../hooks/useSiteInfo";
import { NewBoardBtn } from "@/features/boards";
import { NewThreadBtn } from "@/features/threads";

export default function SiteInfo({ variant = "xl" }) {
  const { data, isLoading } = useSiteInfo();

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
    <Card
      size={"sm"}
      overflowY={"auto"}
      {...variantStyles[variant]}
      as={"section"}
      aria-label="Site Info"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <SlideFade in={!!data} offsetY={10}>
          <CardHeader>
            <Center>
              <Logo />
            </Center>
          </CardHeader>
          <Divider />
          <CardBody>
            <Flex gap={2} justifyContent={"center"}>
              <NewThreadBtn />
              <NewBoardBtn />
            </Flex>
            <Divider my={3} />
            <Stack divider={<StackDivider />}>
              <StackData name="Boards" value={data.site.boardCount} />
              <StackData name="Users" value={data.site.userCount} />
              <StackData name="Threads" value={data.site.threadCount} />
              <StackData name="Replies" value={data.site.replyCount} />
              <StackData
                name="Created On"
                value={formatISOString("2024-10-04T15:22:42.861Z")}
              />
            </Stack>
          </CardBody>
        </SlideFade>
      )}
    </Card>
  );
}
