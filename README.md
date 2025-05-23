# Vite Plugin: CSS Style Inject

A Vite plugin that **injects CSS dynamically into JavaScript** instead of generating separate CSS files, ensuring styles are always included within the final build output.

## 🚀 Features

- Prevents CSS file generation (`cssCodeSplit: false`).
- Injects styles directly into `document.head` using JavaScript.
- Works seamlessly with Vite build outputs.

## 🛠 Installation

```sh
npm install vite-plugin-css-style-inject -D
```

or

```sh
pnpm add vite-plugin-css-style-inject -D
```

## ⚙️ Usage

In `vite.config.ts` or `vite.config.js`, import and use the plugin:

```ts
import styleInjectPlugin from 'vite-plugin-css-style-inject';

export default {
  plugins: [styleInjectPlugin()],
};
```

## 📌 How It Works

1. **Prevents CSS file generation** by setting `cssCodeSplit: false`.
2. **Intercepts CSS assets** during the build and removes them.
3. **Injects styles** into JavaScript, ensuring they are dynamically inserted to the dom when the main script executed.

## 🧩 Example Injected Code

This plugin transforms CSS assets into a script like:

```js
(() => {
  const s = document.createElement('style');
  s.textContent = '.example { color: red; }';
  document.head.appendChild(s);
})();
```

## 🔗 Compatibility

- Works with **Vite ^5** and **modern ES modules**.
- Supports **both TypeScript and JavaScript** projects.

## 🛡️ License

MIT License.

---

Enjoy seamless CSS injection with Vite! 🚀
