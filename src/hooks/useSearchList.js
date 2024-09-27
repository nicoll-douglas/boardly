import { useState } from "react";

export default function useSearchList(list) {
  const [filteredList, setFilteredList] = useState(list);
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    setSearchValue(e.target.value);
    const query = e.target.value.toLowerCase();
    const newList = list.filter((listitem) =>
      listitem.name.toLowerCase().includes(query)
    );
    setFilteredList(newList);
  }

  return { handleSearch, searchValue, setSearchValue, filteredList, list };
}
