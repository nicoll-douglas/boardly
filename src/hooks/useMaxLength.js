import { useState } from "react";

export default function useMaxLength(initial) {
  const [length, setLength] = useState(initial || 0);

  function onChange(e) {
    setLength(e.target.value.length);
  }

  return { length, onChange, setLength };
}
