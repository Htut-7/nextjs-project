"use client";

import React from "react";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { DefaultFilters } from "@/constant/filter";

interface Filters {
  name: string;
  value: string;
}

function CommonFilters({
  filter,
  defaultFilters,
}: {
  filter: Filters[];
  defaultFilters: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || defaultFilters || "";
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const currentQuery = queryString.parse(window.location.search);
    const updatedQuery = {
      ...currentQuery,
      filter: selectedValue || "",
    };
    console.log(currentQuery);
    const url = queryString.stringifyUrl(
      {
        url: window.location.pathname,
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  return (
    <div className="p-5">
      <select
        value={currentFilter}
        onChange={handleFilterChange}
        className="rounded-xl text-gray-300 px-4 py-2 bg-tertiary border-none outline-none cursor-pointer hover:bg-main"
        name=""
        id=""
      >
        {filter.map((filters) => (
          <option value={filters.value} key={filters?.value}>
            {filters.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CommonFilters;
