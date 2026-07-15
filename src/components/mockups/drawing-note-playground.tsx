"use client";

import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { Eraser, RotateCcw, Trash2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

const VIEWBOX_SIZE = 100;
const MIN_BRUSH_WIDTH = 1;
const MAX_BRUSH_WIDTH = 24;
const DEFAULT_BRUSH_WIDTH = 6;
const ERASER_COLOR = "#ffffff";

const INKS = [
  { name: "Black", value: "#1c1c1f" },
  { name: "Red", value: "#e63836" },
  { name: "Orange", value: "#f2851a" },
  { name: "Green", value: "#2e943d" },
  { name: "Blue", value: "#2663eb" },
  { name: "Purple", value: "#7d3bed" },
  { name: "Brown", value: "#5a3825" },
  { name: "Tan", value: "#e5bc93" },
] as const;

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  id: number;
  color: string;
  width: number;
  points: Point[];
}

interface DrawingNotePlaygroundProps {
  promptLabel: string;
  canvasPlaceholder: string;
  localDisclosure: string;
  conversionPrompt: string;
  conversionAction: string;
  conversionHref: string;
  inkLabel: string;
  brushLabel: string;
  eraserLabel: string;
  undoLabel: string;
  clearLabel: string;
}

function pointFromPointer(
  clientX: number,
  clientY: number,
  element: SVGSVGElement
): Point {
  const bounds = element.getBoundingClientRect();
  const x = ((clientX - bounds.left) / bounds.width) * VIEWBOX_SIZE;
  const y = ((clientY - bounds.top) / bounds.height) * VIEWBOX_SIZE;

  return {
    x: Math.max(0, Math.min(VIEWBOX_SIZE, x)),
    y: Math.max(0, Math.min(VIEWBOX_SIZE, y)),
  };
}

function strokePath(points: Point[]) {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const point = points[0];
    return `M ${point.x} ${point.y} L ${point.x + 0.001} ${point.y + 0.001}`;
  }
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length - 1; index += 1) {
    const point = points[index];
    const next = points[index + 1];
    const midpointX = (point.x + next.x) / 2;
    const midpointY = (point.y + next.y) / 2;
    path += ` Q ${point.x} ${point.y} ${midpointX} ${midpointY}`;
  }
  const last = points[points.length - 1];
  return `${path} L ${last.x} ${last.y}`;
}

function DrawingStrokes({ strokes }: { strokes: Stroke[] }) {
  return strokes.map((stroke) => (
    <path
      key={stroke.id}
      d={strokePath(stroke.points)}
      fill="none"
      stroke={stroke.color}
      strokeWidth={stroke.width}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ));
}

export function DrawingNotePlayground({
  promptLabel,
  canvasPlaceholder,
  localDisclosure,
  conversionPrompt,
  conversionAction,
  conversionHref,
  inkLabel,
  brushLabel,
  eraserLabel,
  undoLabel,
  clearLabel,
}: DrawingNotePlaygroundProps) {
  const reduceMotion = useHydratedReducedMotion();
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [ink, setInk] = useState<string>(INKS[0].value);
  const [brushWidth, setBrushWidth] = useState(DEFAULT_BRUSH_WIDTH);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const activeStrokeId = useRef<number | null>(null);
  const nextStrokeId = useRef(0);

  const undo = () => {
    setStrokes((current) => current.slice(0, -1));
  };

  const clear = () => {
    activeStrokeId.current = null;
    setStrokes([]);
  };

  const startStroke = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (tool === "eraser" && strokes.length === 0) return;

    const point = pointFromPointer(
      event.clientX,
      event.clientY,
      event.currentTarget
    );
    const bounds = event.currentTarget.getBoundingClientRect();
    const id = nextStrokeId.current;
    nextStrokeId.current += 1;
    activeStrokeId.current = id;
    event.currentTarget.setPointerCapture(event.pointerId);

    setStrokes((current) => [
      ...current,
      {
        id,
        color: tool === "eraser" ? ERASER_COLOR : ink,
        width: (brushWidth / bounds.width) * VIEWBOX_SIZE,
        points: [point],
      },
    ]);
  };

  const continueStroke = (event: PointerEvent<SVGSVGElement>) => {
    const id = activeStrokeId.current;
    if (id === null) return;
    const point = pointFromPointer(
      event.clientX,
      event.clientY,
      event.currentTarget
    );

    setStrokes((current) =>
      current.map((stroke) => {
        if (stroke.id !== id) return stroke;
        const previous = stroke.points[stroke.points.length - 1];
        if (Math.hypot(point.x - previous.x, point.y - previous.y) < 0.12) {
          return stroke;
        }
        return { ...stroke, points: [...stroke.points, point] };
      })
    );
  };

  const finishStroke = (event: PointerEvent<SVGSVGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    activeStrokeId.current = null;
  };

  const handleCanvasKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      undo();
    }
  };

  const selectInk = (color: string) => {
    setInk(color);
    setTool("pen");
  };

  const previewDotSize = Math.max(6, Math.min(30, brushWidth * 1.15));
  const customInkSelected =
    tool === "pen" &&
    !INKS.some((preset) => preset.value.toLowerCase() === ink.toLowerCase());

  return (
    <div className="relative w-full text-left">
      <div className="mx-auto flex w-full max-w-[500px] min-w-0 flex-col gap-4">
        <h3 className="type-subhead text-foreground">{promptLabel}</h3>

        <div className="relative aspect-square overflow-hidden rounded-note border border-rose-hairline bg-canvas-white shadow-[var(--paper-shadow)] focus-within:border-primary focus-within:shadow-[var(--paper-shadow),0_0_16px_0_var(--rose-glow)]">
          <svg
            role="img"
            aria-label="Interactive drawing canvas"
            aria-describedby="drawing-canvas-help"
            tabIndex={0}
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            onPointerDown={startStroke}
            onPointerMove={continueStroke}
            onPointerUp={finishStroke}
            onPointerCancel={finishStroke}
            onKeyDown={handleCanvasKeyDown}
            className={cn(
              "absolute inset-0 z-10 h-full w-full touch-none select-none outline-none",
              tool === "eraser" ? "cursor-cell" : "cursor-crosshair"
            )}
          >
            <DrawingStrokes strokes={strokes} />
          </svg>

          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center font-display text-xl font-semibold text-[#8c8c8c] transition-opacity duration-200",
              strokes.length > 0 ? "opacity-0" : "opacity-100"
            )}
          >
            {canvasPlaceholder}
          </span>
          <span id="drawing-canvas-help" className="sr-only">
            Draw with a mouse, finger, or stylus. Press Command Z or Control Z
            to undo the last stroke.
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="type-label text-muted-foreground">{inkLabel}</span>
          <div
            role="group"
            aria-label={inkLabel}
            className={cn(
              "grid grid-cols-5 gap-1 sm:grid-cols-9",
              tool === "eraser" && "opacity-45"
            )}
          >
            {INKS.map((preset) => {
              const selected =
                tool === "pen" &&
                preset.value.toLowerCase() === ink.toLowerCase();
              return (
                <button
                  key={preset.value}
                  type="button"
                  aria-pressed={selected}
                  aria-label={preset.name}
                  onClick={() => selectInk(preset.value)}
                  className="group inline-flex min-h-11 items-center justify-center rounded-full"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-6 rounded-full border border-foreground/15 transition-transform duration-200 ease-out-quart group-hover:scale-110 motion-reduce:transition-none",
                      selected &&
                        "scale-110 ring-2 ring-ring ring-offset-2 ring-offset-background"
                    )}
                    style={{ backgroundColor: preset.value }}
                  />
                </button>
              );
            })}

            <label
              className={cn(
                "relative inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full",
                customInkSelected &&
                  "after:pointer-events-none after:absolute after:size-9 after:rounded-full after:ring-2 after:ring-ring after:ring-offset-2 after:ring-offset-background"
              )}
            >
              <span
                aria-hidden="true"
                className="relative flex size-7 items-center justify-center rounded-full bg-[conic-gradient(#e63836,#f6c344,#2e943d,#25a9d9,#2663eb,#7d3bed,#e63836)]"
              >
                <span
                  className="size-4 rounded-full border border-white/50"
                  style={{ backgroundColor: ink }}
                />
              </span>
              <input
                type="color"
                value={ink}
                onChange={(event) => selectInk(event.target.value)}
                aria-label="Color wheel. Pick any color"
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center"
          >
            {tool === "pen" ? (
              <span
                className="rounded-full"
                style={{
                  width: previewDotSize,
                  height: previewDotSize,
                  backgroundColor: ink,
                }}
              />
            ) : (
              <span
                className="rounded-full border-2 border-foreground"
                style={{ width: previewDotSize, height: previewDotSize }}
              />
            )}
          </span>
          <label className="flex min-h-11 min-w-0 flex-1 flex-col justify-center gap-2">
            <span className="sr-only">{brushLabel}</span>
            <input
              type="range"
              min={MIN_BRUSH_WIDTH}
              max={MAX_BRUSH_WIDTH}
              step={1}
              value={brushWidth}
              onChange={(event) => setBrushWidth(Number(event.target.value))}
              aria-label={tool === "eraser" ? `${eraserLabel} size` : brushLabel}
              aria-valuetext={`${brushWidth} points`}
              className="w-full cursor-pointer accent-primary"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-pressed={tool === "eraser"}
            onClick={() =>
              setTool((current) => (current === "eraser" ? "pen" : "eraser"))
            }
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
              tool === "eraser"
                ? "bg-rose-wash text-primary"
                : "bg-foreground/5 text-muted-foreground hover:text-foreground"
            )}
          >
            <Eraser className="size-4" aria-hidden="true" />
            {eraserLabel}
          </button>
          <button
            type="button"
            onClick={undo}
            disabled={strokes.length === 0}
            className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            aria-label={undoLabel}
            title={undoLabel}
          >
            <RotateCcw className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={strokes.length === 0}
            className="ml-auto inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-destructive disabled:pointer-events-none disabled:opacity-30"
            aria-label={clearLabel}
            title={clearLabel}
          >
            <Trash2 className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{localDisclosure}</p>
          <AnimatePresence initial={false}>
            {strokes.length > 0 ? (
              <m.p
                aria-live="polite"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 6, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -4, filter: "blur(3px)" }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="type-subhead text-foreground"
              >
                {conversionPrompt}{" "}
                <a
                  href={conversionHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {conversionAction}
                </a>
              </m.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
