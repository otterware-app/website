# otterware.app

Otter's site: Otter's page (`/`), a page per module (`/mail/`, `/calendar/`, `/drive/`,
`/tasks/`, `/agents/`), and Otter's changelog, privacy policy and terms (`/mail/changelog/`,
`/mail/privacy/`, `/mail/terms/`). Otter itself is at otter.otterware.app, Otter Drive at
drive.otterware.app, the Otter account at accounts.otterware.app.

Plain HTML and CSS in `public/`, assembled in `dist/` by `scripts/build.ts` and served by a
Cloudflare Worker. Workers Builds deploys it on every push to `main`.

```sh
pnpm install
pnpm dev     # http://localhost:4321, rebuilt at each visit
pnpm build   # dist/
pnpm test
```
