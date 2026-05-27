# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Claude-Specific Notes

- No test framework is configured. Do not assume a test runner exists.
- When adding shadcn/ui components, run from the app directory:
  `pnpm dlx shadcn@latest add <component> -c apps/web`. Components land in
  `packages/ui/src/components/`.
