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

const FormControl = forwardRef(
  (
    {
      isRequired = true,
      formRef,
      registerKey,
      placeholder,
      label,
      helperText,
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
        <Input placeholder={placeholder} ref={ref} {...rest} />
        <FormErrorMessage>
          {formRef.formState.errors[registerKey]?.message}
        </FormErrorMessage>
        {helperText && (
          <FormHelperText>
            <UnorderedList>
              {helperText.map((text, index) => (
                <ListItem key={index}>{text}</ListItem>
              ))}
            </UnorderedList>
          </FormHelperText>
        )}
      </ChakraFormControl>
    );
  }
);

FormControl.displayName = "Form Control";

export default FormControl;
