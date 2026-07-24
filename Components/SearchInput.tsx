"use client";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import queryString from "query-string";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

function SearchInput() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const router = useRouter();
  const [searchDebounced] = useDebounce(search, 3000);

  useEffect(() => {
    const currentQuery = queryString.parse(window.location.search);
    const updatedQuery = { ...currentQuery, search: searchDebounced };
    const url = queryString.stringifyUrl({
      url: window.location.pathname,
      query: updatedQuery,
    });
    router.push(url);
  }, [searchDebounced, router]);

  return (
    <div>
      <Input
        placeholder="Search anything Globally"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
