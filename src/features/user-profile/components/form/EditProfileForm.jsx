import { useForm } from "react-hook-form";
import useProfile from "../../hooks/useProfile";

export default function EditProfileForm() {
  const { data } = useProfile();
  const form = useForm({ shouldUnregister: true });
}
