import { Flex, Tag } from "@chakra-ui/react";
import { Fragment } from "react";
import Separator from "@/components/common/Separator";

export default function ProfileTags({ tags }) {
  if (!tags) return;
  if (tags.length === 0) return;

  return (
    <Flex>
      {tags.map((tagText, index) => {
        return (
          <Fragment key={index}>
            <Tag sixe="sm">{tagText}</Tag>
            {index !== tags.length - 1 && <Separator />}
          </Fragment>
        );
      })}
    </Flex>
  );
}
