import { IconButton, useDisclosure } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import FormModal from "@/components/common/FormModal";
import EditProfileForm from "../form/EditProfileForm";

export default function EditProfileBtn(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<EditIcon />}
        variant={"ghost"}
        size={"sm"}
        onClick={onOpen}
        data-testid="profile-open"
        {...props}
      />
      <FormModal isOpen={isOpen} onClose={onClose} heading="Edit profile">
        <EditProfileForm onClose={onClose} />
      </FormModal>
    </>
  );
}
