"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const Pages = [
  { path: "/inline", title: "Inline" },
  { path: "/image", title: "<img>" },
  { path: "/font", title: "Font" },
  { path: "/sprite", title: "Sprite" },
] as const;

export default function SlideNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const currentIndex = Pages.findIndex((page) => page.path === pathname);

  const handleNext = useCallback(() => {
    const nextIndex = Math.min(currentIndex + 1, Pages.length - 1);
    if (nextIndex === currentIndex) {
      return;
    }
    router.push(Pages[nextIndex].path);
  }, [currentIndex, router]);

  const handlePrevious = useCallback(() => {
    const previousIndex = Math.max(0, currentIndex - 1);
    if (previousIndex === currentIndex) {
      return;
    }
    router.push(Pages[previousIndex].path);
  }, [currentIndex, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "Space") {
        event.preventDefault();
        event.stopPropagation();
        handleNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        handlePrevious();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious]);

  return (
    <div className="absolute bottom-0 p-4 flex gap-2 w-full justify-between">
      <button
        type="button"
        onClick={handlePrevious}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentIndex === 0}
      >
        Previous (←) |{" "}
        <span className="font-bold">
          {currentIndex > 0 ? Pages[currentIndex - 1]?.title : Pages[0]?.title}
        </span>
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentIndex === Pages.length - 1}
      >
        Next (→, Space) |{" "}
        <span className="font-bold">
          {currentIndex < Pages.length - 1
            ? Pages[currentIndex + 1]?.title
            : Pages[Pages.length - 1]?.title}
        </span>
      </button>
    </div>
  );
}
