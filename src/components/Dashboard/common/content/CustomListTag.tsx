"use client";

import { useEffect, useRef } from "react";

interface ContentDisplayProps {
  htmlContent: string;
}

const CustomListTag = ({ htmlContent }: ContentDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      const temp = document.createElement("div");
      temp.innerHTML = htmlContent;
      const lists = temp.getElementsByTagName("ul");
      Array.from(lists).forEach((ul) => {
        const items = ul.getElementsByTagName("li");
        Array.from(items).forEach((li) => {
          li.classList.add("flex", "items-start", "gap-2", "mb-1");
          const content = li.innerHTML;
          li.innerHTML = "";
          const iconSpan = document.createElement("span");
          iconSpan.classList.add("mt-1", "flex-shrink-0");
          const contentSpan = document.createElement("span");
          contentSpan.innerHTML = content;
          li.appendChild(iconSpan);
          li.appendChild(contentSpan);
        });
      });
      containerRef.current.innerHTML = temp.innerHTML;
      const iconContainers = containerRef.current.querySelectorAll(
        "li > span:first-child"
      );
      iconContainers.forEach((container) => {
        const icon = document.createElement("span");
        icon.innerHTML = `<svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>`;
        container.appendChild(icon);
      });
    }
  }, [htmlContent]);
  return (
    <div ref={containerRef} className="text-editor">
      {/* Content will be injected here */}
    </div>
  );
};

export default CustomListTag;
