export const STORAGE_KEYS = {
  SETTINGS: 'chequegen-settings',
  STATS: 'chequegen-stats',
} as const;

export const KEYBOARD_SHORTCUTS = [
  { key: 'Ctrl + S', action: 'Save Cheque' },
  { key: 'Ctrl + P', action: 'Print / Export' },
  { key: 'Escape', action: 'Close Settings' },
  { key: 'H', action: 'Toggle Help' },
  { key: '?', action: 'Show Shortcuts' },
] as const;
