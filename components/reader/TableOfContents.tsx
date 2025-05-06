// TOCTree.tsx
import React from "react";

type TOCItem = {
  title: string;
  page: number;
  kids?: TOCItem[];
};

type TOCTreeProps = {
  data: TOCItem[];
  active: number;
  onSelect: (
    page: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  showNotes: boolean;
};

type TOCNodeProps = {
  item: TOCItem;
  level?: number;
  activePage: number;
  onSelect: (
    page: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const TOCNode: React.FC<TOCNodeProps> = ({
  item,
  level = 0,
  activePage,
  onSelect,
}) => {
  const isActive = item.page === activePage;

  return (
    <div
      style={{
        paddingLeft: `${level * 0.5}rem`,
        filter: `brightness(${isActive ? "1.05" : "1"})`,
      }}
      className="transition-colors duration-200 cursor-pointer"
      onClick={(e) => {
        onSelect(item.page, e);
      }}
    >
      <div
        className={`flex my-3 justify-between items-center py-2 text-sm rounded-xl px-2 ${
          isActive
            ? "bg-[var(--color-accent-quaternary)]/50 hover:bg-[var(--color-accent-quaternary)]/80"
            : "bg-[var(--color-surface)] hover:bg-[var(--color-surface)]/20"
        } transition-all duration-100`}
      >
        <span className="text-[var(--color-text)]">{item.title}</span>
        <span className="text-[var(--color-text)]/80">{item.page}</span>
      </div>

      {item.kids && (
        <div className="ml-2 border-l-1 border-[var(--color-border)] pl-2">
          {item.kids.map((child, index) => (
            <TOCNode
              key={index}
              item={child}
              level={level + 1}
              activePage={activePage}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TOCTree: React.FC<TOCTreeProps> = ({
  data,
  active,
  onSelect,
  showNotes,
}) => {
  return (
    <div className="flex flex-col h-full w-full gap-4 px-2">
      <div className="h-[84%] overflow-y-auto p-2 bg-[var(--color-surface)] rounded-lg">
        {data.map((item, index) => (
          <TOCNode
            key={index}
            item={item}
            activePage={active}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="flex mt-2 mx-2 content-between place-content-between transition-all duration-100">
        {!showNotes && (
          <>
            <button
              className="w-fit h-8 px-2 max-w-[40%]  text-[10px] sm:text-[12px] font-semibold border-2 border-[var(--color-border)] text-[var(--color-strong)] rounded-lg flex items-center justify-center shadow-md hover:bg-[var(--color-accent)]/50 transition-all duration-300"
              title="Previous chapter"
              onClick={() => {
                // Handle previous chapter
              }}
              aria-label="Previous chapter"
            >
              <span className="text-ellipsis whitespace-nowrap overflow-hidden truncate">
                Previous chapter
              </span>
            </button>

            <button
              className=" w-fit h-8 px-2 max-w-[40%] text-[10px] sm:text-[12px] font-semibold border-2 border-[var(--color-strong)]/80 text-[var(--color-strong)] rounded-lg flex items-center justify-center shadow-md hover:bg-[var(--color-accent)]/50 transition-all duration-300"
              title="Next chapter"
              onClick={() => {
                // Handle next chapter
              }}
              aria-label="Next chapter"
            >
              <span className="text-ellipsis whitespace-nowrap overflow-hidden truncate">
                Next chapter
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TOCTree;
