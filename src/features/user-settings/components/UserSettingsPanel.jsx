import * as Ch from "@chakra-ui/react";
import PanelItem from "./PanelItem";
import ResetPwdForm from "./ResetPwdForm";
import DeleteAccountForm from "./DeleteAccountForm";

export default function UserSettingsPanel() {
  return (
    <Ch.Card
      variant={{ base: "unstyled", md: "outline" }}
      flex={1}
      size={"sm"}
      minH={{ md: "calc(100vh - 88px)" }}
      maxW={"full"}
    >
      <Ch.CardHeader>
        <Ch.Heading size={"md"}>User Settings</Ch.Heading>
      </Ch.CardHeader>
      <Ch.Divider my={{ base: 4, md: 0 }} />
      <Ch.CardBody>
        <Ch.SlideFade in={true} offsetY={10}>
          <Ch.Accordion allowToggle>
            <PanelItem heading={"Change Password"}>
              <ResetPwdForm />
            </PanelItem>
            <PanelItem heading={"Delete Account"}>
              <DeleteAccountForm />
            </PanelItem>
          </Ch.Accordion>
        </Ch.SlideFade>
      </Ch.CardBody>
    </Ch.Card>
  );
}
