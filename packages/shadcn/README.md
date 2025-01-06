# @zoos/shadcn

Very simple wrapper around shadcn UI components.

Currently, Tailwind and CSS is stored in the Zoos app. This package should also export the styling portion of the solution for easy integration.

## Features

### Small extensions / mods to Shad

- add `"success"` and `"warning"` variants to `Button`.

### CSS Variables - More control

Wire in css variables to provide greater flexibility:

- `--dialog-overlay` - overlay color for dialogs
- `--primary-accent` - primary accent color, used for hover
- `--primary-muted` - primary muted color, used for disabled
