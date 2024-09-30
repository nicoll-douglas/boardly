import {
  Feed,
  FeedProvider,
  SiteInfo,
  SiteInfoProvider,
  WelcomeCard,
} from "@/features/home-page";
import { Flex, Card } from "@chakra-ui/react";

export default function Home() {
  return (
    <FeedProvider>
      <SiteInfoProvider>
        <Flex
          flexDir={"column"}
          gap={4}
          flex={1}
          as={Card}
          variant={"unstyled"}
        >
          <WelcomeCard />
          <SiteInfo variant="base" />
          <Feed />
        </Flex>
        <SiteInfo variant="xl" />
      </SiteInfoProvider>
    </FeedProvider>
  );
}
