"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchForm = () => {
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
        type="search"
        placeholder="search projects"
        onChange={e => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Button className="bg-secondBg" size="sm" type="submit">
        <Search />
      </Button>
    </form>
  );
};

export default SearchForm;
