import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightAddon,
  IconButton,
} from "@chakra-ui/react";
import { useState, forwardRef } from "react";

const PasswordInput = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <InputGroup>
      <Input
        type={visible ? "text" : "password"}
        placeholder="Enter password"
        {...props}
        ref={ref}
      />
      <InputRightAddon p={0} ml={0} border={"none"}>
        <IconButton
          borderLeftRadius={0}
          onClick={() => setVisible(!visible)}
          aria-label="Toggle password visibility"
          aria-pressed={visible}
          colorScheme="gray"
          icon={
            visible ? (
              <ViewOffIcon aria-hidden={true} />
            ) : (
              <ViewIcon aria-hidden={true} />
            )
          }
        />
      </InputRightAddon>
    </InputGroup>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
