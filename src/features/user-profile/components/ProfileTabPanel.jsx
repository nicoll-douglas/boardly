import { TabPanel, VStack } from "@chakra-ui/react";
import { useCompactView } from "@/features/ui/compactView";

export default function ProfileTabPanel({ children, ...rest }) {
  const { compactView } = useCompactView();

  return (
    <TabPanel px={{ base: 0, lg: 4 }}>
      <VStack gap={compactView ? 2 : 4} {...rest}>
        {children}
      </VStack>
    </TabPanel>
  );
}
