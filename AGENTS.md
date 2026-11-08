# otterware.app

Otter's site: Otter's page and a page per module. Otter itself is at `otter.otterware.app` (and
Otter Drive, a module that is also a drive of its own, at `drive.otterware.app`); those show no
marketing, this site does.

The words, everywhere on the site:

- **Otter**: the app, made by Otterware. Never "Otter Mail", except the iPhone app, which keeps
  that name (Otter Mail for iPhone).
- **Modules**: the areas of work in Otter: Mail, Calendar, Drive, Tasks, and Code (soon). Not
  "products" or "apps". People will add and remove them.
- **Plugins**: what adds features, UI and agent tools to a module, and brings its connectors
  (Sign-in codes, Calendar invitations, Translation, Todoist, Otter Drive). Not "extensions".
- **Connectors**: the accounts and services plugins connect: Gmail, Outlook, IMAP, Google
  Calendar, Todoist, Otter Drive, an OpenClaw gateway, Hermes.
- **Agents**: the user's own (Claude Code, Codex, OpenClaw, Hermes, OpenRouter), over every
  module. Otter is where you work with them, not one more AI.
- **Scheduled**: what agents run on a schedule, landing in Otter. Not "automations".

The layout:

- `public/`: the pages and their files. `index.html` is Otter's page; `mail/`, `calendar/`,
  `drive/`, `tasks/` and `agents/` the modules' (`mail/privacy/`, `mail/terms/`: Otter's policy
  and terms, which Google's OAuth consent screen links to, so they keep their URLs; so does the
  changelog at `mail/changelog/`). `apps/` holds the icons: Otter's (Otterware's mark), each
  module's, and the agent's (the Pilot), from the Otterware production kit. `style.css` styles
  every page; `office.js` draws Mail's hero (Mail as a small office); `site.js` renames the
  nav's account link once this browser is signed in to Otter.
- Every page has an empty `<nav class="nav"></nav>` and `<footer></footer>`, filled by
  `scripts/layout.ts`, and names what it is about with `<body data-app="mail">` (`otter` for
  Otter's own pages), which adds the module's bar under the nav and points "Sign in" at Otter.
  Modules still to come are in the nav, unlinked.
- `changelog/mail/`: Otter's notes, copied from the otter repository by the changelog workflow
  (hourly). Write notes there, in otter, not here.
- `scripts/build.ts` assembles `dist/` (wrangler runs it before deploying); `scripts/dev.ts`
  serves the site for development.

`pnpm dev` to preview at http://localhost:4321, `pnpm test` before handing work back. Workers
Builds deploys on pushes to `main`, so merging a pull request deploys it. Never deploy it by
hand.

Keep it small: plain HTML and CSS, a script only where a page needs one, no framework. Say only
what ships (mark what's coming as soon). When a module launches, moves or goes away, update the
nav (`scripts/layout.ts`), Otter's page and the footer.
