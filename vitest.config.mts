import { defineConfig } from "vitest/config";

// Unit tests only, for logic that must not silently regress. The dwell clock
// is the reason this exists: it decides whether a visit reads as a bounce or
// as a considered decline, it has broken twice, and both times the symptom was
// a plausible looking zero rather than an error.
export default defineConfig({
  test: {
    include: ["app/**/*.test.ts"],
    environment: "node",
  },
});
