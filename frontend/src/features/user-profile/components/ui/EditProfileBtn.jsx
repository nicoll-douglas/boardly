import { EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import EditProfileForm from "../form/EditProfileForm";

export default function EditProfileBtn() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        variant={"ghost"}
        size={"sm"}
        leftIcon={<EditIcon />}
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>
            <Heading size={"md"}>Edit Profile</Heading>
          </ModalHeader>
          <ModalBody>
            <EditProfileForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
