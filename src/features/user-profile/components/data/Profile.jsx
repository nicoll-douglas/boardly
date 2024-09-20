import { Flex, Divider } from "@chakra-ui/react";
import ProfileInfo from "./ProfileInfo";
import ProfileTabs from "./ProfileTabs";
import useProfile from "../../hooks/useProfile";
import { Navigate } from "react-router-dom";
import useIsMe from "../../hooks/useIsMe";
import { useAuth } from "@/features/auth";

export default function Profile() {
  const { data } = useProfile();
  const [isMe] = useIsMe();
  const { currentUser } = useAuth();

  if (!isMe) {
    if (data.profile.username === currentUser?.username)
      return <Navigate to={"/me"} />;
  }

  return (
    <Flex
      flex={1}
      pb={4}
      px={4}
      gap={4}
      flexDir={{ base: "column", md: "row" }}
    >
      <ProfileInfo />
      <Divider display={{ md: "none" }} />
      <ProfileTabs />
    </Flex>
  );
}
