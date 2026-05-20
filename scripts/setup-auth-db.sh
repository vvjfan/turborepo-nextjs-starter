#!/bin/bash
set -euo pipefail

echo "==> Installing Better Auth CLI..."
npx auth@latest migrate

echo "==> Done. Better Auth schema created."
