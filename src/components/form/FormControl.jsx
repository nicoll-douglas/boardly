import {
  FormLabel,
  FormControl as ChakraFormControl,
  Input,
  FormErrorMessage,
  FormHelperText,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import PasswordInput from "./PasswordInput";

const FormControl = forwardRef(
  (
    {
      isRequired = true,
      formRef,
      registerKey,
      placeholder,
      label,
      helperText,
      helpersAsList = true,
      password,
      ...rest
    },
    ref
  ) => {
    return (
      <ChakraFormControl
        isRequired={isRequired}
        isInvalid={formRef.formState.errors[registerKey]}
        mb={6}
      >
        <FormLabel>{label}</FormLabel>
        {password ? (
          <PasswordInput placeholder={placeholder} ref={ref} {...rest} />
        ) : (
          <Input placeholder={placeholder} ref={ref} {...rest} />
        )}
        <FormErrorMessage>
          {formRef.formState.errors[registerKey]?.message}
        </FormErrorMessage>
        {helperText && (
          <FormHelperText>
            {helpersAsList ? (
              <UnorderedList>
                {helperText.map((text, index) => (
                  <ListItem key={index}>{text}</ListItem>
                ))}
              </UnorderedList>
            ) : (
              helperText
            )}
          </FormHelperText>
        )}
      </ChakraFormControl>
    );
  }
);

FormControl.displayName = "Form Control";

export default FormControl;
