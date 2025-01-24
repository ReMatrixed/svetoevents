import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import sortPlugin from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["src/**/*.{ts,tsx}"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
    },
  },
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/array-bracket-newline": ["error", "consistent"],
      "@stylistic/array-bracket-spacing": ["error"],
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/arrow-spacing": ["error"],
      "@stylistic/brace-style": ["error", "stroustrup"],
      "@stylistic/comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "never",
          importAttributes: "always-multiline",
          dynamicImports: "always-multiline",
        },
      ],
      "@stylistic/comma-spacing": ["error"],
      "@stylistic/comma-style": ["error"],
      "@stylistic/computed-property-spacing": ["error"],
      "@stylistic/curly-newline": ["error", { consistent: true }],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/function-call-spacing": ["error"],
      "@stylistic/function-paren-newline": ["error", "consistent"],
      "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/jsx-closing-bracket-location": ["error", "line-aligned"],
      "@stylistic/jsx-closing-tag-location": ["error", "line-aligned"],
      "@stylistic/jsx-curly-newline": ["error", "consistent"],
      "@stylistic/jsx-curly-spacing": ["error", "never"],
      "@stylistic/jsx-equals-spacing": ["error", "never"],
      "@stylistic/jsx-first-prop-new-line": ["error", "multiline"],
      "@stylistic/jsx-function-call-newline": ["error", "multiline"],
      "@stylistic/jsx-max-props-per-line": ["error", { when: "multiline" }],
      "@stylistic/jsx-pascal-case": "error",
      "@stylistic/jsx-one-expression-per-line": ["error"],
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/jsx-self-closing-comp": ["error"],
      "@stylistic/key-spacing": [
        "error", { beforeColon: false, afterColon: true, mode: "strict" },
      ],
      "@stylistic/keyword-spacing": ["error", { overrides: { if: { after: false } } }],
      "@stylistic/line-comment-position": ["error", { position: "above" }],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/max-len": [
        "error",
        {
          code: 80,
          ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
          ignoreStrings: true,
          ignoreUrls: true,
        },
      ],
      "@stylistic/member-delimiter-style": ["error"],
      "@stylistic/multiline-comment-style": [
        "error", "separate-lines",
      ],
      "@stylistic/newline-per-chained-call": [
        "error", { ignoreChainWithDepth: 2 },
      ],
      "@stylistic/no-extra-semi": ["error"],
      "@stylistic/no-floating-decimal": ["error"],
      "@stylistic/no-mixed-spaces-and-tabs": ["error"],
      "@stylistic/no-multi-spaces": ["error"],
      "@stylistic/no-multiple-empty-lines": ["error"],
      "@stylistic/no-trailing-spaces": ["error"],
      "@stylistic/no-whitespace-before-property": ["error"],
      "@stylistic/object-curly-newline": ["error", { consistent: true }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/operator-linebreak": ["error", "none"],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      // Can be changed in the future
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/rest-spread-spacing": ["error", "never"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/semi-spacing": [
        "error", { before: false, after: true },
      ],
      "@stylistic/semi-style": ["error", "last"],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/space-before-function-paren": [
        "error", { anonymous: "always", named: "never", asyncArrow: "always" },
      ],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": ["error"],
      "@stylistic/spaced-comment": ["error", "always"],
      "@stylistic/template-curly-spacing": ["error", "never"],
      "@stylistic/type-annotation-spacing": ["error"],
    },
  },
  {
    plugins: {
      "simple-import-sort": sortPlugin,
    },
    rules: {
      "simple-import-sort/imports": ["warn"],
      "simple-import-sort/exports": ["warn"],
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic
);
