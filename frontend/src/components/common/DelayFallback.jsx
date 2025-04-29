import Loader from "./Loader";
import { useShowDelay } from "@/hooks";

export default function DelayFallback({ delay, children = <Loader /> }) {
  const show = useShowDelay(delay);

  return <>{show && children}</>;
}
