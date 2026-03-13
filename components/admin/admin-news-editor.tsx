"use client";

import { useRef, useState, useTransition } from "react";
import type { ChangeEvent, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditorContent, type Editor, useEditor } from "@tiptap/react";
import { Extension, Node, type JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

import type { Locale } from "@/lib/site";
import type { NewsPostRecord, NewsStatus } from "@/lib/news/types";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
    videoBlock: {
      setVideoBlock: (options: { src: string }) => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) =>
              attributes.fontSize ? { style: `font-size: ${attributes.fontSize}` } : {},
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});

const VideoBlock = Node.create({
  name: "videoBlock",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },
  parseHTML() {
    return [{ tag: "video[data-news-video]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["video", { ...HTMLAttributes, controls: "true", "data-news-video": "true" }];
  },
  addCommands() {
    return {
      setVideoBlock:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
          }),
    };
  },
});

const FONT_FAMILY_OPTIONS = [
  { label: "기본", value: "" },
  { label: "Noto Sans KR", value: "Noto Sans KR" },
  { label: "Georgia", value: "Georgia" },
  { label: "Menlo", value: "Menlo" },
];

const FONT_SIZE_OPTIONS = ["14px", "16px", "18px", "20px", "24px", "32px"];

type AdminNewsEditorProps = {
  post?: NewsPostRecord;
};

type UploadResponse = {
  url: string;
  error?: string;
};

function ToolbarButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`editor-toolbar-button ${active ? "is-active" : ""}`}
    >
      {children}
    </button>
  );
}

function getCurrentFontFamily(editor: Editor) {
  return (editor.getAttributes("textStyle").fontFamily as string | undefined) ?? "";
}

function getCurrentFontSize(editor: Editor) {
  return (editor.getAttributes("textStyle").fontSize as string | undefined) ?? "";
}

async function uploadMedia(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const payload = (await response.json().catch(() => null)) as UploadResponse | null;

  if (!response.ok || !payload?.url) {
    throw new Error(payload?.error ?? "업로드에 실패했습니다.");
  }

  return payload.url;
}

function EditorToolbar({
  editor,
  onImageUpload,
  onVideoUpload,
}: {
  editor: Editor;
  onImageUpload: () => void;
  onVideoUpload: () => void;
}) {
  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-group">
        <select
          value={getCurrentFontFamily(editor)}
          onChange={(event) => {
            const value = event.target.value;

            if (!value) {
              editor.chain().focus().unsetFontFamily().run();
              return;
            }

            editor.chain().focus().setFontFamily(value).run();
          }}
          className="editor-toolbar-select"
        >
          {FONT_FAMILY_OPTIONS.map((option) => (
            <option key={option.value || "default"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={getCurrentFontSize(editor)}
          onChange={(event) => {
            const value = event.target.value;

            if (!value) {
              editor.chain().focus().unsetFontSize().run();
              return;
            }

            editor.chain().focus().setFontSize(value).run();
          }}
          className="editor-toolbar-select"
        >
          <option value="">크기</option>
          {FONT_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <input
          type="color"
          aria-label="글자 색상"
          defaultValue="#182223"
          onChange={(event) => {
            editor.chain().focus().setColor(event.target.value).run();
          }}
          className="h-9 w-10 rounded-xl border border-border bg-white p-1"
        />
      </div>

      <div className="editor-toolbar-group">
        <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          H
        </ToolbarButton>
      </div>

      <div className="editor-toolbar-group">
        <ToolbarButton
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>
      </div>

      <div className="editor-toolbar-group">
        <ToolbarButton
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          좌
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          중
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          우
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          “ ”
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          {"</>"}
        </ToolbarButton>
      </div>

      <div className="editor-toolbar-group">
        <ToolbarButton
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href as string | undefined;
            const href = window.prompt("링크 주소를 입력하세요.", previousUrl || "https://");

            if (href === null) {
              return;
            }

            if (!href.trim()) {
              editor.chain().focus().unsetLink().run();
              return;
            }

            editor.chain().focus().setLink({ href, target: "_blank", rel: "noreferrer" }).run();
          }}
        >
          링크
        </ToolbarButton>
        <ToolbarButton onClick={onImageUpload}>이미지</ToolbarButton>
        <ToolbarButton onClick={onVideoUpload}>영상</ToolbarButton>
      </div>

      <div className="editor-toolbar-group">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>되돌리기</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>다시하기</ToolbarButton>
      </div>
    </div>
  );
}

export function AdminNewsEditor({ post }: AdminNewsEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [locale, setLocale] = useState<Locale>(post?.locale ?? "ko");
  const [status, setStatus] = useState<NewsStatus>(post?.status ?? "draft");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FontSize,
      VideoBlock,
    ],
    content: post?.contentJson ?? post?.contentHtml ?? "<p></p>",
    editorProps: {
      attributes: {
        class: "editor-prose min-h-[24rem] focus:outline-none",
      },
    },
  });

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !editor) {
      return;
    }

    try {
      setError("");
      const url = await uploadMedia(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();

      if (!coverImageUrl) {
        setCoverImageUrl(url);
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "이미지 업로드에 실패했습니다.");
    }
  }

  async function handleVideoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !editor) {
      return;
    }

    try {
      setError("");
      const url = await uploadMedia(file);
      editor.chain().focus().setVideoBlock({ src: url }).run();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "영상 업로드에 실패했습니다.");
    }
  }

  function handleSave() {
    if (!editor) {
      return;
    }

    setError("");
    setMessage("");

    startTransition(async () => {
      const response = await fetch(post ? `/api/admin/news/${post.id}` : "/api/admin/news", {
        method: post ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          title,
          excerpt: excerpt.trim() || null,
          status,
          coverImageUrl: coverImageUrl.trim() || null,
          contentHtml: editor.getHTML(),
          contentJson: editor.getJSON() as JSONContent,
          publishedAt: post?.publishedAt ?? null,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string; post?: NewsPostRecord }
        | null;

      if (!response.ok || !payload?.post) {
        setError(payload?.error ?? "저장에 실패했습니다.");
        return;
      }

      setMessage(status === "published" ? "게시되었습니다." : "임시저장되었습니다.");
      router.replace(`/admin/news/${payload.post.id}`);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-label">ADMIN</p>
          <h1 className="section-title">{post ? "소식 수정" : "새 소식 작성"}</h1>
          <p className="section-copy">공개 뉴스 페이지에 연결되는 게시물을 작성합니다.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/news" className="btn-secondary">
            목록으로
          </Link>
          <button type="button" onClick={handleSave} className="btn-primary" disabled={isPending}>
            {isPending ? "저장 중..." : status === "published" ? "게시 저장" : "임시저장"}
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-4">
          <label className="block">
            <span className="section-label">TITLE</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent"
              placeholder="게시물 제목"
            />
          </label>

          <label className="block">
            <span className="section-label">EXCERPT</span>
            <textarea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              className="mt-2 min-h-28 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
              placeholder="리스트 카드에 보일 짧은 요약"
            />
          </label>

          <div className="rounded-[1.5rem] border border-border bg-surface-strong p-4">
            {editor ? (
              <EditorToolbar
                editor={editor}
                onImageUpload={() => imageInputRef.current?.click()}
                onVideoUpload={() => videoInputRef.current?.click()}
              />
            ) : null}
            <div className="mt-4 rounded-[1.25rem] border border-border bg-white p-4">
              <EditorContent editor={editor} />
            </div>
          </div>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoChange}
          />
        </div>

        <aside className="space-y-4">
          <div className="rounded-[1.5rem] border border-border bg-surface-strong p-5">
            <p className="section-label">SETTINGS</p>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="section-label">LOCALE</span>
                <select
                  value={locale}
                  onChange={(event) => setLocale(event.target.value as Locale)}
                  className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                </select>
              </label>

              <label className="block">
                <span className="section-label">STATUS</span>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value as NewsStatus)}
                  className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                >
                  <option value="draft">임시저장</option>
                  <option value="published">게시</option>
                </select>
              </label>

              <label className="block">
                <span className="section-label">COVER IMAGE URL</span>
                <input
                  value={coverImageUrl}
                  onChange={(event) => setCoverImageUrl(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  placeholder="선택 사항"
                />
              </label>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-surface-strong p-5">
            <p className="section-label">HELP</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>이미지는 10MB 이하, 영상은 50MB 이하만 업로드합니다.</li>
              <li>영문/국문 소식은 각각의 라우트에 분리되어 표시됩니다.</li>
              <li>빈 요약은 본문에서 자동으로 생성됩니다.</li>
            </ul>
          </div>

          {message ? <p className="text-sm text-accent">{message}</p> : null}
          {error ? <p className="text-sm text-[#9b3c3c]">{error}</p> : null}
        </aside>
      </div>
    </div>
  );
}
