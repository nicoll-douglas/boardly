import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  Heading,
} from "@chakra-ui/react";

export default function FormModal({ heading, isOpen, onClose, children }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading size={"md"} as={"h1"}>
            {heading}
          </Heading>
        </ModalHeader>
        <ModalBody pb={6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
