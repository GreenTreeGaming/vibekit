"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { HexColorPicker } from "react-colorful";

interface Props {
  color: string;
  label?: string;
  onChange: (
    color: string
  ) => void;
}

export function MiniColorPicker({
  color,
  label,
  onChange,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (
      e: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      {label && (
        <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
          {label}
        </p>
      )}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-black/20
          p-3
          transition
          hover:border-white/20
        "
      >
        <div
          className="
            h-10
            w-10
            rounded-xl
            border
            border-white/10
            shrink-0
          "
          style={{
            backgroundColor: color,
          }}
        />

        <span
          className="
            flex-1
            text-left
            font-mono
            text-sm
          "
        >
          {color}
        </span>
      </button>

      {open && (
        <div
          className="
      absolute
      left-0
      top-[calc(100%+12px)]
      z-[999]
      w-[260px]
      rounded-3xl
      border
      border-white/10
      bg-zinc-950
      p-4
      shadow-2xl
    "
        >
          <HexColorPicker
            color={color}
            onChange={onChange}
            style={{
              width: "100%",
              height: "180px",
            }}
          />

          <button
            onClick={() =>
              setOpen(false)
            }
            className="
        mt-4
        w-full
        rounded-xl
        bg-white
        px-4
        py-2
        text-sm
        font-medium
        text-black
      "
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}