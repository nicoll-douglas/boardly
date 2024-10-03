import * as Ch from "@chakra-ui/react";

export default function PanelItem({ heading, children }) {
  return (
    <Ch.AccordionItem>
      <Ch.AccordionButton>
        <Ch.Box flex={1} textAlign={"left"}>
          <Ch.Heading size={"sm"}>{heading}</Ch.Heading>
        </Ch.Box>
        <Ch.AccordionIcon />
      </Ch.AccordionButton>
      <Ch.AccordionPanel>
        <Ch.Card
          variant={{ base: "unstyled", sm: "filled" }}
          size={{ base: "sm", sm: "md" }}
        >
          <Ch.CardBody>{children}</Ch.CardBody>
        </Ch.Card>
      </Ch.AccordionPanel>
    </Ch.AccordionItem>
  );
}
