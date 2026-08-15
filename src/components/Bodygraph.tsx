"use client";

import { motion } from "framer-motion";
import type { CenterKey } from "@/lib/humandesign";

type Mode = "reveal" | "loading" | "static";

interface Node {
  key: CenterKey;
  x: number;
  y: number;
  r: number;
}

/** Схематичный бодиграф: 9 центров в классической раскладке. */
const NODES: Node[] = [
  { key: "head", x: 100, y: 26, r: 13 },
  { key: "ajna", x: 100, y: 72, r: 13 },
  { key: "throat", x: 100, y: 118, r: 14 },
  { key: "g", x: 100, y: 168, r: 14 },
  { key: "heart", x: 148, y: 158, r: 11 },
  { key: "spleen", x: 44, y: 214, r: 12 },
  { key: "sacral", x: 100, y: 216, r: 15 },
  { key: "solar", x: 156, y: 214, r: 12 },
  { key: "root", x: 100, y: 268, r: 14 },
];

const CHANNELS: [CenterKey, CenterKey][] = [
  ["head", "ajna"],
  ["ajna", "throat"],
  ["throat", "g"],
  ["throat", "heart"],
  ["throat", "spleen"],
  ["throat", "solar"],
  ["g", "sacral"],
  ["g", "heart"],
  ["g", "spleen"],
  ["heart", "solar"],
  ["spleen", "sacral"],
  ["sacral", "solar"],
  ["sacral", "root"],
  ["spleen", "root"],
  ["solar", "root"],
];

const BY_KEY = NODES.reduce<Record<string, Node>>((acc, n) => {
  acc[n.key] = n;
  return acc;
}, {});

/** Порядок «зажигания» центров — снизу вверх, как поток энергии. */
const REVEAL_ORDER: CenterKey[] = [
  "root",
  "sacral",
  "spleen",
  "solar",
  "g",
  "heart",
  "throat",
  "ajna",
  "head",
];

export interface BodygraphProps {
  size?: number;
  defined?: CenterKey[];
  mode?: Mode;
  /** Цвет линий и контуров. По умолчанию — тёплый серый под светлый фон. */
  theme?: "light" | "dark";
  className?: string;
}

export default function Bodygraph({
  size = 300,
  defined,
  mode = "reveal",
  theme = "light",
  className,
}: BodygraphProps) {
  const activeSet = new Set<CenterKey>(defined ?? []);
  const litAll = mode === "loading";

  const lineColor = theme === "dark" ? "rgba(255,255,255,0.16)" : "#E8E0D8";
  const activeLine = "rgba(196, 137, 107, 0.55)";
  const emptyFill = theme === "dark" ? "rgba(255,255,255,0.04)" : "#FFFFFF";
  const emptyStroke = theme === "dark" ? "rgba(255,255,255,0.22)" : "#E8E0D8";

  const stepDelay = mode === "loading" ? 0.3 : 0.12;

  return (
    <svg
      viewBox="0 0 200 300"
      width={size}
      height={size}
      role="img"
      aria-label="Бодиграф Human Design: девять энергетических центров"
      className={className}
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <filter id="hd-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* каналы */}
      <g>
        {CHANNELS.map(([a, b]) => {
          const na = BY_KEY[a];
          const nb = BY_KEY[b];
          const isActive = litAll || (activeSet.has(a) && activeSet.has(b));
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={isActive ? activeLine : lineColor}
              strokeWidth={isActive ? 2.4 : 1.4}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            />
          );
        })}
      </g>

      {/* центры */}
      <g>
        {NODES.map((node) => {
          const orderIndex = REVEAL_ORDER.indexOf(node.key);
          const isDefined = litAll || activeSet.has(node.key);
          const delay = 0.25 + orderIndex * stepDelay;

          if (!isDefined) {
            return (
              <motion.circle
                key={node.key}
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={emptyFill}
                stroke={emptyStroke}
                strokeWidth={1.6}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            );
          }

          return (
            <g key={node.key}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="#C4896B"
                filter="url(#hd-glow)"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                  opacity: mode === "static" ? 1 : [0, 1, 0.86, 1],
                  scale: mode === "static" ? 1 : [0.4, 1.16, 1, 1],
                }}
                transition={{ duration: 0.85, delay, ease: "easeOut" }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="none"
                stroke="#C4896B"
                strokeWidth={1.5}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.5, 0], scale: [1, 1.9, 2.2] }}
                transition={{
                  duration: 1.6,
                  delay,
                  repeat: mode === "static" ? 0 : Infinity,
                  repeatDelay: 2.2,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
