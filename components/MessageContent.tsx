import React from "react";

/**
 * Lightweight markdown renderer for chat messages.
 * Handles: **bold**, numbered lists, bullet lists, line breaks.
 */
export default function MessageContent({ text }: { text: string }) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ol key={`list-${listKey++}`} className="list-none space-y-1.5 my-2">
          {listItems}
        </ol>
      );
      listItems = [];
    }
  };

  const parseBold = (str: string): React.ReactNode[] => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-[#e8d4a0]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // Numbered list item: "1. text" or "1) text"
    const numberedMatch = trimmed.match(/^(\d+)[.)]\s+(.+)$/);
    if (numberedMatch) {
      listItems.push(
        <li key={i} className="flex gap-2.5 items-start">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold flex items-center justify-center mt-0.5">
            {numberedMatch[1]}
          </span>
          <span>{parseBold(numberedMatch[2])}</span>
        </li>
      );
      return;
    }

    // Bullet list item
    const bulletMatch = trimmed.match(/^[-•*]\s+(.+)$/);
    if (bulletMatch) {
      listItems.push(
        <li key={i} className="flex gap-2.5 items-start">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-2" />
          <span>{parseBold(bulletMatch[1])}</span>
        </li>
      );
      return;
    }

    // Empty line — flush list, add spacer
    if (trimmed === "") {
      flushList();
      if (elements.length > 0) {
        elements.push(<div key={`sp-${i}`} className="h-1" />);
      }
      return;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={i} className="leading-relaxed">
        {parseBold(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className="space-y-1 text-sm">{elements}</div>;
}
