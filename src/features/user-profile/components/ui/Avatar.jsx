import { Avatar as ChakraAvatar, SkeletonCircle } from "@chakra-ui/react";

export default function Avatar({ name, src, isLoaded, skeletonSize, ...rest }) {
  return (
    <SkeletonCircle size={skeletonSize ?? 24} isLoaded={isLoaded}>
      <ChakraAvatar size={"xl"} name={name} p={0} src={src} {...rest} />
    </SkeletonCircle>
  );
}
