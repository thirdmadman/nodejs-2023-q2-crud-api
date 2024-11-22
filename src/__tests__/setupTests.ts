/// <reference types="vitest/globals" />

import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.resetModules();
});
