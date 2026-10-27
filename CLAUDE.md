# odd-resource_model

Legacy library. Still used by production apps. Keep changes minimal.

## Toolchain

- Use Node 14.16.0.
- Run commands as `mise exec node@14.16.0 -- yarn <script>`. yarn is 1.22.19.
- Do not try newer Node versions; webpack 3 and babel 6 break on them.

## Checks

- `yarn test` runs mocha, but `test/test.spec.js` registers no tests. "0 passing" proves nothing.
- To verify a change, build into a temp dir and diff against a baseline build: `mise exec node@14.16.0 -- npx webpack --env build --output-path /tmp/<name>`.

## Consumers

- Apps install this repo by git URL and pin a commit SHA in their lockfile. A push to master reaches no app until that app re-locks.
- Apps load the committed build output, not `src/`. Commit rebuilt output only when you mean to ship a behavior change.
