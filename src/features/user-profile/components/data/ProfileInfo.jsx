import { Card } from "@chakra-ui/react";
import useProfile from "../../hooks/useProfile";
import { Spinner } from "@/components/common";
import ProfileInfoBody from "./ProfileInfoBody";

export default function ProfileInfo() {
  const { data, isLoading } = useProfile();

  return (
    <Card
      variant={"outline"}
      w={{ base: "full", md: 64, lg: 80 }}
      position={{ base: "static", md: "sticky" }}
      top={"72px"}
      h={{ md: "calc(100vh - 88px)" }}
      size={"sm"}
      overflowY={"auto"}
    >
      {isLoading ? (
        <Spinner p={4} flex={1} />
      ) : (
        <ProfileInfoBody profile={data.profile} />
      )}
    </Card>
  );
}
