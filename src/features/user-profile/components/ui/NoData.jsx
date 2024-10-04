import { Center, Text } from "@chakra-ui/react";
import { NothingToShow } from "@/components/common";
import creativeUrl from "@/assets/images/creative.svg";

export default function NoData({ imageUrl = creativeUrl, text }) {
  return (
    <Center w={"full"}>
      <NothingToShow imageUrl={imageUrl}>
        <Text>{text}</Text>
      </NothingToShow>
    </Center>
  );
}
