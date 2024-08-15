import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  Heading,
} from "@chakra-ui/react";

export default function FormModal({
  heading,
  isOpen,
  onClose,
  children,
  motionPreset = "scale",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset={motionPreset}>
      <ModalOverlay />
      <ModalContent mx={4}>
        {onClose && <ModalCloseButton />}
        <ModalHeader px={{ base: 4, sm: 6 }}>
          <Heading size={"md"} as={"h1"}>
            {heading}
          </Heading>
        </ModalHeader>
        <ModalBody pb={6} px={{ base: 4, sm: 6 }}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
