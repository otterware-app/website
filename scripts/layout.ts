// Every page's header and footer, so they are the same everywhere. A page has an empty
// <nav class="nav"></nav> and <footer></footer>, and names what it is about with
// <body data-app="mail">: Otter itself ("otter") or one of its modules. Run by build.ts and dev.ts.

type Module = {
  name: string;
  page: string;
  /** Where signing in from its pages takes you, and the signed-in link's label. */
  open: [label: string, href: string];
};

const OTTER = "https://otter.otterware.app/";
const DOWNLOAD = "https://github.com/otterware-app/otter/releases/latest";
const ACCOUNTS = "https://accounts.otterware.app/otter";

/** Otter, then its modules in the nav's order. */
const MODULES: Record<string, Module> = {
  otter: { name: "Otter", page: "/", open: ["Open Otter", OTTER] },
  agents: { name: "Agents", page: "/agents/", open: ["Open Otter", OTTER] },
  mail: { name: "Mail", page: "/mail/", open: ["Open Otter", OTTER] },
  calendar: { name: "Calendar", page: "/calendar/", open: ["Open Otter", OTTER] },
  drive: { name: "Drive", page: "/drive/", open: ["Open Otter Drive", "https://drive.otterware.app/"] },
  tasks: { name: "Tasks", page: "/tasks/", open: ["Open Otter", OTTER] },
};

/** The <body>'s data-app: what a page is about. */
const appOf = (html: string) => /<body[^>]*\sdata-app="([a-z]+)"/.exec(html)?.[1];

/**
 * The nav: Otter's modules, the changelog and the account. Signing in
 * from Otter's pages opens Otter, which signs in through the Otter account; from pages about
 * nothing in particular (the 404), the account itself. Once this browser is signed in, site.js
 * renames the link.
 */
export function siteNav(current?: string): string {
  const modules = Object.entries(MODULES)
    .filter(([id]) => id !== "otter")
    .map(
      ([id, module]) =>
        `<a href="${module.page}"${id === current ? ' aria-current="page"' : ""}>${module.name}</a>`,
    )
    .join("\n          ");
  const open = current ? MODULES[current]?.open : undefined;
  const account = open
    ? `<a class="account" href="${open[1]}" data-signed-in="${open[0]}">Sign in</a>`
    : `<a class="account" href="${ACCOUNTS}/sign-in" data-signed-in="Account" data-signed-in-href="${ACCOUNTS}/account">Sign in</a>`;
  return `<nav class="nav">
          <a class="logo" href="/" aria-label="Otter"><img src="/img/mark.png" alt="" width="24" height="24" /><span>Otter</span></a>
          <div class="apps" aria-label="Modules">
          ${modules}
          </div>
          <div class="links"><a href="/mail/changelog/">Changelog</a>${account}</div>
        </nav>`;
}

export function siteFooter(): string {
  return `<footer>
          <p class="footer-line">Enough reading.<br />Back to your day.</p>
          <nav aria-label="Modules">
            <h2>Modules</h2>
            <a href="/agents/">Agents</a><a href="/mail/">Mail</a><a href="/calendar/">Calendar</a
            ><a href="/drive/">Drive</a><a href="/tasks/">Tasks</a>
          </nav>
          <nav aria-label="Otter">
            <h2>Otter</h2>
            <a href="${DOWNLOAD}">Download</a><a href="${OTTER}">Open in your browser</a
            ><a href="/mail/changelog/">Changelog</a><a href="https://github.com/otterware-app/otter">Source code</a>
          </nav>
          <nav aria-label="Legal">
            <h2>Legal</h2>
            <a href="/mail/privacy/">Privacy</a><a href="/mail/terms/">Terms</a
            ><a href="https://github.com/otterware-app">GitHub</a>
          </nav>
          <p class="footer-legal">© 2026 Otterware</p>
        </footer>`;
}

/** A page with its nav and footer filled in, and the current page marked. */
export function withSiteLayout(html: string): string {
  const current = appOf(html);
  return html
    .replace('<nav class="nav"></nav>', () => siteNav(current))
    .replace("<footer></footer>", () => siteFooter());
}
