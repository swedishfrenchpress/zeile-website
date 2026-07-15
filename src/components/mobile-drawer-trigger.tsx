"use client";

import { Menu } from "lucide-react";
import { lazy, Suspense, useState } from "react";

const loadMobileDrawer = () =>
  import("@/components/mobile-drawer").then((module) => ({
    default: module.MobileDrawer,
  }));
const LazyMobileDrawer = lazy(loadMobileDrawer);

export function MobileDrawerTrigger() {
  const [requested, setRequested] = useState(false);
  const [open, setOpen] = useState(false);

  const requestDrawer = () => {
    setRequested(true);
    setOpen(true);
  };

  const warmDrawer = () => {
    void loadMobileDrawer();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={requestDrawer}
        onFocus={warmDrawer}
        onPointerEnter={warmDrawer}
        className="inline-flex h-11 w-11 items-center justify-center -mr-2"
      >
        <Menu className="size-6" />
      </button>
      {requested ? (
        <Suspense fallback={null}>
          <LazyMobileDrawer open={open} onOpenChange={setOpen} />
        </Suspense>
      ) : null}
    </>
  );
}
