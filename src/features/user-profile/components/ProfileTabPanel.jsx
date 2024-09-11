import { TabPanel, VStack } from "@chakra-ui/react";

export default function ProfileTabPanel({ children }) {
  return (
    <TabPanel px={{ base: 0, lg: 4 }}>
      <VStack gap={4}>{children}</VStack>
    </TabPanel>
  );
}
