import { Avatar, SkeletonCircle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useProfileContext from "@/features/user-profile/hooks/useProfileContext";

export default function ProfileLink() {
  const { isLoading, profile } = useProfileContext();

  return (
    <SkeletonCircle isLoaded={!isLoading} ml={"auto"}>
      <Avatar
        size={"sm"}
        src={profile.avatar}
        name={profile.username}
        as={Link}
        to={"/profile"}
      />
    </SkeletonCircle>
  );
}
