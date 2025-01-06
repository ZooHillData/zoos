# Developer

## Add a library

### Generate library

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

### Installing dependencies:

**Note -** when installing dependencies in new library, make sure to run `npm install` at monorepo root to init the workspace. Once workspace initialized, can install with `npm install --workspace=@zoos/react-table` <package>`

### Add to `package.json`

```json
{
  "repository": { "url": "https://github.com/zoohilldata/zoos.git" },
  "publishConfig": {
    "access": "public"
  }
}
```

### Add to `project.json`, replacing `<LIBRARY_NAME>`

```json
{
  "targets": {
    "release": {
      "executor": "nx-release:build-update-publish",
      "options": {
        "libName": "<LIBRARY_NAME>"
      }
    }
  }
}
```

### Test release

```bash
# Testing separately b/c we are allowing no tests (for now)
npx nx run-many -t test --passWithNoTests
# Lint and build
npx nx run-many -t lint,build,release
#
npx semantic-release
```
