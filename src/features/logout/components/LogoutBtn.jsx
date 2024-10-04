import * as Ch from "@chakra-ui/react";
import { useRef } from "react";
import { MdLogout } from "react-icons/md";
import useLogout from "../hooks/useLogout";

export default function LogoutBtn({ variant }) {
  const { isOpen, onClose, onOpen } = Ch.useDisclosure();
  const cancelRef = useRef();
  const onSubmit = useLogout();

  return (
    <>
      {variant !== "text" ? (
        <Ch.IconButton
          icon={<MdLogout />}
          variant={"ghost"}
          onClick={onOpen}
          aria-label="Logout"
        />
      ) : (
        <Ch.Button rightIcon={<MdLogout />} onClick={onOpen}>
          Logout
        </Ch.Button>
      )}
      <Ch.AlertDialog isOpen={isOpen} onClose={onClose} size={"xs"}>
        <Ch.AlertDialogOverlay />
        <Ch.AlertDialogContent mx={4}>
          <Ch.AlertDialogHeader>{"Logout?"}</Ch.AlertDialogHeader>
          <Ch.AlertDialogCloseButton />
          <Ch.AlertDialogFooter>
            <Ch.HStack gap={3}>
              <Ch.Button ref={cancelRef} colorScheme="red" onClick={onClose}>
                Cancel
              </Ch.Button>
              <Ch.Button onClick={onSubmit}>Confirm</Ch.Button>
            </Ch.HStack>
          </Ch.AlertDialogFooter>
        </Ch.AlertDialogContent>
      </Ch.AlertDialog>
    </>
  );
}
