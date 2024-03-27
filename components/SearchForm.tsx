"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchForm = () => {
  // const [query, setQuery] = useState("");
  // const router = useRouter();

  // const handleSearch = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   router.push(`/search?query=${query}`);
  // };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <form className="flex w-full max-w-sm items-center space-x-2">
      <Input
        name="search"
        type="text"
        placeholder="search projects"
        onChange={e => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchForm;
