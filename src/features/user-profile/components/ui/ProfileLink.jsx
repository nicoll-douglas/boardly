import { Avatar, Link as ChakraLink, SkeletonCircle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
// import { useAuth } from "@/features/auth";

export default function ProfileLink(props) {
  const { data, isLoading } = useProfile();
  // const {currentUser} = useAuth();
  const isLoaded = !isLoading;

  return (
    <ChakraLink as={Link} to={"/me"} borderRadius={"full"} {...props}>
      <SkeletonCircle isLoaded={isLoaded}>
        <Avatar
          size={"sm"}
          // src={currentUser?.avatar}
          // name={currentUser?.username}
          src={data.user?.avatar}
          name={data.user?.username}
        />
      </SkeletonCircle>
    </ChakraLink>
  );
}
