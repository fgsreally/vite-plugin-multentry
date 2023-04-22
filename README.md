## vite-plugin-multentry
it will create another entry and inserted to html

```ts
//in vite.config
import multEntry from 'vite-plugin-multentry'
export default {
      plugins: [multEntry(['test.ts'])],
}

```

in html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script type="module" src="/assets/test-9ae0dcf3.js"></script>

```