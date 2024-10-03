import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { helperText } from "@/lib/constants";
import validation from "../data/boardValidation";
import useCreateBoard from "../hooks/useCreateBoard";
import RulesFormControl from "./RulesFormControl";

export default function NewBoardForm({ onClose }) {
  const { form, onSubmit } = useCreateBoard(onClose);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={form.formState.errors.name} mb={6}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter name..."
          {...form.register("name", validation.name)}
        />
        <FormErrorMessage>
          {form.formState.errors.name?.message}
        </FormErrorMessage>
        <FormHelperText>
          <UnorderedList>
            {["Cannot be changed once created", ...helperText.newUn].map(
              (text, index) => (
                <ListItem key={index}>{text}</ListItem>
              )
            )}
          </UnorderedList>
        </FormHelperText>
      </FormControl>
      <RulesFormControl form={form} initialLength={0} />
      <Button w={"full"} type="submit" isLoading={form.formState.isSubmitting}>
        Create
      </Button>
    </form>
  );
}
