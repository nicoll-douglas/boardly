import { useForm } from "react-hook-form";
import AvatarField from "./AvatarField";
import useProtectedSubmission from "@/lib/hooks/useProtectedSubmission";
import useProfileContext from "../../hooks/useProfileContext";
import { useState } from "react";
import Avatar from "../ui/Avatar";

export default function AvatarForm() {
  const form = useForm({ shouldUnregister: true });
  const { isLoading, profile } = useProfileContext();
  const { avatar, username } = profile;
  const isLoaded = !isLoading;
  const [upload, setUpload] = useState(avatar);

  function handleUploadChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpload(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUpload(avatar);
    }
  }

  return (
    <form>
      <AvatarField
        isLoaded={isLoaded}
        form={form}
        src={upload}
        onChange={handleUploadChange}
      />
    </form>
  );
}
