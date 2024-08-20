import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import useProtectedSubmission from "@/lib/hooks/useProtectedSubmission";
import destructureData from "../../utils/destructureData";
import useProfileContext from "../../hooks/useProfileContext";
import { useQueryClient } from "@tanstack/react-query";
import SelectPronouns from "./SelectPronouns";
import AgeField from "./AgeField";
import BioField from "./BioField";
import AvatarField from "./AvatarField";

export default function EditProfileForm({ onClose }) {
  const { isLoading, protectedData } = useProfileContext();
  const { bio, age, pronouns, avatar } = destructureData(protectedData);
  const isLoaded = !isLoading;
  const queryClient = useQueryClient();

  const form = useForm({
    shouldUnregister: true,
    defaultValues: {
      bio,
      age,
      pronouns,
    },
  });

  const onSubmit = useProtectedSubmission(form, "/api/me/profile", {
    onSuccess: {
      message: "Successfully updated profile",
      callback: () => {
        onClose();
        queryClient.invalidateQueries({
          queryKey: ["GET /api/me"],
        });
      },
    },
    formData: true,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <AvatarField form={form} isLoaded={isLoaded} initial={avatar} />
      <AgeField form={form} isLoaded={isLoaded} />
      <SelectPronouns form={form} isLoaded={isLoaded} />
      <BioField form={form} isLoaded={isLoaded} initial={bio} />
      <Button
        w={"full"}
        type="submit"
        data-testid="profile-submit"
        isLoading={form.formState.isSubmitting}
        isDisabled={!isLoaded}
      >
        Submit
      </Button>
    </form>
  );
}
