# eslint-plugin-relative-imports

[![npm version](https://badge.fury.io/js/eslint-plugin-relative-imports.svg)](https://badge.fury.io/js/eslint-plugin-relative-imports)

An eslint plugin that converts any absolute import paths to relative ones **if a file is imported from within the path/baseURL**.

Resolves absolute paths to paths on disk by parsing a `tsconfig.json` expected to be found in the root of the repository
using this plugin.

```ts
// ## Import sibling

// From within a file 
// src/Foo/Foo.js
// we want to import
// src/Foo/Baz.js

// OK
import Bar from "./Baz"; // valid relative path

// NOT OK
import Something from "src/Foo/Baz";
```

```ts
// ## Import descendant

// From within a file 
// src/Foo/Foo.js
// we want to import
// src/Foo/Bar/Bar.js

// OK
import Bar from "./Bar/Bar"; // valid relative path

// NOT OK
import Something from "src/Foo/Bar/Bar";
```
```ts
// ## Import with same baseURL

// From within a file 
// src/Foo/Foo.js
// we want to import
// src/Bar/Bar.js

// OK
import Bar from "../Bar/Bar"; // valid relative path

// NOT OK
import Something from "Bar/Bar";
```


## Prerequisites / Limitations

### Module resolution must be defined in `tsconfig.json`

A modern JS/TS-based project can not only define some sort of baseUrl like `src`, it can also define import aliases using [webpack`s resolve option](https://webpack.js.org/configuration/resolve/) or [path mappings specified tsconfig](https://www.typescriptlang.org/docs/handbook/module-resolution.html).

As an example, `~` can be an alias for all code under `<repository-root>/src`.

⚠️ This plugin only resolves module resolution configs `baseUrl` and `paths` defined in a single `tsconfig.json` in the repository root. ⚠️
It only supports the common [Node Module resolution strategy](https://www.typescriptlang.org/docs/handbook/module-resolution.html#module-resolution-strategies). There is no
support for
- [rootDirs](https://www.typescriptlang.org/tsconfig#rootDirs)
- multiple tsconfigs that extend each other.

Contributions to make this more flexible or to retrieve module resolution mappings out of a webpack config are welcome.

As a workaround to this limitation, a project can re-use or re-declare import aliases that are defined in a webpack config in the project`s tsconfig.

### Default set of file extensions used when resolving paths

When an alias is mapped to a single path, we assume that another mechanism (e.g. TypeScript or [no-unresolved](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md)) already ensures that the de-aliased path is valid.

When an alias is mapped to more than one path, we check what de-aliased path can be resolved. Here we assume a default set
of file extensions.

```js
[
    '.js',
    '.d.ts',
    '.ts',
    '.jsx',
    '.tsx',
    '.scss',
    '.css',
    '.svg',
    '.json',
]
```

Based on demand, this can be made configurable.

# How to contribute

See the [contributing](CONTRIBUTING.md) guide for broad instructions on how to get started with this project.

## Setup Instructions 

To install, run
```
yarn add -D eslint-plugin-relative-imports
```
or respectively
```
npm install --save-dev eslint-plugin-relative-imports
```

Then update your eslint config by adding `relative-imports` to the list of plugins,
and turn on the main rule `require-relative-imports` of this plugin.
```js
  // .eslintrc.js
  plugins: [
    // other plugins ..
    "relative-imports",
  ],
  rules: {
    // other rules ..
    "relative-imports/require-relative-imports": "error",
  }
```

# How this was born

Due to the use of embedding compiled TypeScript in a game engine. (see https://roblox-ts.com for more info), it is more efficient to use relative paths. It also is the only option when using some isolated containers. Therefore, a lint was required to force the imports to be relative where possible (under the baseURL). 


# TODOs
- [ ] check eslint settings to tell clients that this is a plugin for ts-parser
- [ ] Support windows -> e.g. read and use [platform specific segment separator](https://nodejs.org/api/path.html#pathsep)
- [ ] Performance testing, see https://www.darraghoriordan.com/2021/11/06/how-to-write-an-eslint-plugin-typescript/
- [ ] migrate to typescript !
- [ ] Add proper unit test using `RuleTester` from [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- [ ] Check for a lib that helps with dealing with globs instead of verbosely hand-rolling the string manipulation logic
- [ ] Solidify reverse mapping of path aliases with more tests, preferably using real world configs
- [ ] Try to find a lib to reverse-map tsconfig module resolution configs. This must have been solved somewhere else already. Eventually we can feed aliases to `enhanced-resolve`

# Acknowledgements

Thanks to the https://github.com/spicattutti/eslint-plugin-relative-imports-when-same-folder - the original project this was forked from.
