import {
  useDisclosure,
  Avatar as ChakraAvatar,
  SkeletonCircle,
  Button,
} from "@chakra-ui/react";
import FormModal from "@/components/common/FormModal";
import AvatarForm from "../form/AvatarForm";

export default function Avatar({ name, src, isLoaded, withEditing }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SkeletonCircle size={withEditing ? 16 : 24} isLoaded={isLoaded}>
        <ChakraAvatar
          size={withEditing ? "lg" : "xl"}
          name={name}
          p={0}
          as={withEditing ? Button : "span"}
          onClick={onOpen}
          src={src}
        />
      </SkeletonCircle>
      {withEditing && (
        <FormModal
          isOpen={isOpen}
          onClose={onClose}
          size={"xs"}
          heading="Edit Profile Picture"
        >
          <AvatarForm onClose={onClose} />
        </FormModal>
      )}
    </>
  );
}
