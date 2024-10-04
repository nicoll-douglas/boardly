import {
  FormLabel,
  FormControl as ChakraFormControl,
  Input,
  FormErrorMessage,
  FormHelperText,
  UnorderedList,
  ListItem,
  Flex,
  Button,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import PasswordInput from "./PasswordInput";
import { Link } from "react-router-dom";

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
      inputTestId,
      errorTestId,
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
          <PasswordInput
            data-cy={inputTestId}
            placeholder={placeholder}
            ref={ref}
            {...rest}
          />
        ) : (
          <Input
            data-cy={inputTestId}
            placeholder={placeholder}
            ref={ref}
            {...rest}
          />
        )}
        <Flex alignItems={"start"} gap={2}>
          <FormErrorMessage data-cy={errorTestId}>
            {formRef.formState.errors[registerKey]?.message}
          </FormErrorMessage>
          {password?.forgot && (
            <Button
              variant={"link"}
              as={Link}
              to={"/auth/forgot"}
              mt={2}
              ml={"auto"}
              size={"sm"}
              minW={"fit-content"}
            >
              Forgot password?
            </Button>
          )}
        </Flex>
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
