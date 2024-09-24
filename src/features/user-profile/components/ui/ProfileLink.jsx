import { Avatar, SkeletonCircle, Link as ChakraLink } from "@chakra-ui/react";
import useProfile from "../../hooks/useProfile";
import { Link } from "react-router-dom";

export default function ProfileLink(props) {
  const { data, isLoading } = useProfile();
  const isLoaded = !isLoading;

  return (
    <ChakraLink as={Link} to={"/me"} borderRadius={"full"} {...props}>
      <SkeletonCircle isLoaded={isLoaded}>
        <Avatar
          size={"sm"}
          src={data?.profile.avatar}
          name={data.profile?.username}
        />
      </SkeletonCircle>
    </ChakraLink>
  );
}
