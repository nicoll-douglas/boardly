import { Button, useDisclosure } from "@chakra-ui/react";
import FormModal from "@/components/common/FormModal";
import AvatarForm from "../form/AvatarForm";
import Avatar from "./Avatar";

export default function AvatarWithEditing({ name, src, isLoaded }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Avatar
        name={name}
        src={src}
        isLoaded={isLoaded}
        onClick={onOpen}
        size={"lg"}
        skeletonSize={16}
        as={Button}
      />
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        size={"xs"}
        heading="Edit Profile Picture"
      >
        <AvatarForm onClose={onClose} />
      </FormModal>
    </>
  );
}
