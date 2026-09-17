import React from "react";
import { Code } from "bright";

Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
};

function Preview({ content }: { content: string }) {
  return (
    <div
      className="
        prose max-w-none
        prose-pre:bg-[#0d1117]
        prose-pre:text-gray-100
        prose-pre:rounded-lg
        prose-pre:p-4
        prose-pre:overflow-x-auto
        prose-code:text-sm
        prose-invert prose-headings:text-gray-200 prose-p:text-gray-400 prose-ul:text-gray-400 prose-ol:text-gray-400
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default Preview;
