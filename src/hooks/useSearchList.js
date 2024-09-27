import { useState } from "react";

export default function useSearchList(list) {
  const [filteredList, setFilteredList] = useState(list);
  const [value, setValue] = useState("");

  function onChange(e) {
    setValue(e.target.value);
    const query = e.target.value.toLowerCase();
    const newList = list.filter((listitem) =>
      listitem.name.toLowerCase().includes(query)
    );
    setFilteredList(newList);
  }

  return { onChange, value, setValue, filteredList, list };
}
