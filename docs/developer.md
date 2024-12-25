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
