"use client";

import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import { IoIosLink } from "react-icons/io";
import Link from "@tiptap/extension-link";
import { useCallback } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import { FaCode, FaList } from "react-icons/fa";
import { LuListOrdered } from "react-icons/lu";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/github-dark.css";
import { FaItalic } from "react-icons/fa";

const lowlight = createLowlight(all);

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const Editor = ({
  value,
  onChange,
  label,
}: {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none my-2 p-2 min-h-[300px] rounded-lg bg-primary",
      },
    },
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      ListItem,
      OrderedList,
      Link.configure({
        openOnClick: false,
        autolink: true,
        markdownLinks: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url: string, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url: string) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }, [editor]);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isLink: ctx.editor?.isActive("link"),
    }),
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      {label && <label>{label}</label>}
      <div className="flex items-center space-x-3 p-2 rounded-md">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={Bold ? "text-main" : ""}
        >
          B
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={Italic ? "text-main" : ""}
        >
          <FaItalic />
        </button>

        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor?.isActive("heading", { level: 1 }) ? "text-main" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor?.isActive("heading", { level: 2 }) ? "text-main" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor?.isActive("heading", { level: 3 }) ? "text-main" : ""
          }
        >
          H3
        </button>

        <button
          onClick={setLink}
          className={editor?.isActive("link") ? "bg-main" : ""}
        >
          <IoIosLink />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor?.isActive("bulletlist") ? "is-active" : ""}
        >
          <FaList />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive("orderlist") ? "text-main" : ""}
        >
          <LuListOrdered />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor?.isActive("codelowlight") ? "text-main" : ""}
        >
          <FaCode />
        </button>
      </div>
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
