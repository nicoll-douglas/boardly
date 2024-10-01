import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  ListItem,
  Textarea,
  UnorderedList,
} from "@chakra-ui/react";
import { helperText } from "@/lib/constants";
import validation from "../data/boardValidation";
import { LabelWithCounter } from "@/components/form";
import { useMaxLength } from "@/hooks";
import useCreateBoard from "../hooks/useCreateBoard";

export default function NewBoardForm({ onClose }) {
  const { form, onSubmit } = useCreateBoard(onClose);
  const { onChange, ...rest } = form.register("rules", validation.rules);
  const { length, onChange: onLengthChange } = useMaxLength();

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
      <FormControl isInvalid={form.formState.errors.rules} mb={6}>
        <LabelWithCounter
          length={length}
          maxLength={validation.rules.maxLength.value}
        >
          Rules
        </LabelWithCounter>
        <Textarea
          resize={"none"}
          placeholder="Enter rules..."
          rows={8}
          onChange={(e) => {
            onChange(e);
            onLengthChange(e);
          }}
          {...rest}
        />
      </FormControl>
      <Button w={"full"} type="submit">
        Create
      </Button>
    </form>
  );
}
