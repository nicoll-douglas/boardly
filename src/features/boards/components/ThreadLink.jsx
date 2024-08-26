import { LinkBox, LinkOverlay, Link, Divider } from "@chakra-ui/react";
import noWrap from "@/lib/constants/noWrap";

export default function ThreadLink({
  threadName,
  authorName,
  authorLink,
  link,
}) {
  return (
    <>
      <Divider />
      <LinkBox my={2} display={"flex"} justifyContent={"space-between"} gap={4}>
        <LinkOverlay {...noWrap} href={link}>
          {threadName}
        </LinkOverlay>
        <Link href={authorLink}>{authorName}</Link>
      </LinkBox>
    </>
  );
}
