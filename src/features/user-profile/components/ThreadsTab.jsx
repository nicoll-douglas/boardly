import { Center, TabPanel, Text, VStack } from "@chakra-ui/react";
import useProfile from "../hooks/useProfile";
import { NothingToShow } from "@/components/common";
import ThreadPreview from "./ThreadPreview";
import creativeUrl from "@/assets/images/creative.svg";

export default function ThreadsTab() {
  const data = useProfile();
  const threads = data.profile.threads;

  return (
    <TabPanel>
      <VStack gap={4}>
        {threads.length === 0 ? (
          <Center w={"full"}>
            <NothingToShow imageUrl={creativeUrl}>
              <Text>Create a thread to get started!</Text>
            </NothingToShow>
          </Center>
        ) : (
          threads.map((thread) => (
            <ThreadPreview key={thread._id} thread={thread} />
          ))
        )}
      </VStack>
    </TabPanel>
  );
}
