/** Shared motion tokens; mirrors `--ease-out-expo` in globals.css. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Reveal as soon as the element's top edge is 10% above the bottom of the
 * viewport. Using a margin instead of a visible-area ratio means very tall
 * sections (like the CV) still reveal straight away.
 */
export const REVEAL_VIEWPORT = {
  once: true,
  margin: "0px 0px -10% 0px",
} as const;
