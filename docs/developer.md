# Developer

## Add a library

```bash
name="react-form"

npx nx g @nx/react:lib "@zoos/${name}"  \
    --directory="packages/${name}" \
    --bundler=vite \
    --publishable \
    --importPath="@zoos/${name}" \
    --globalCss true \
    --dry-run # Remove --dry-run to execute
```

### Set up for release

- Add `repository` and `publishConfig` to `package.json` (see existing library)
- Test the local build

  ```bash
  # Testing separately b/c we are allowing no tests (for now)
  npx nx run-many -t test --passWithNoTests
  # Lint and build
  npx nx run-many -t lint,build
  ```
