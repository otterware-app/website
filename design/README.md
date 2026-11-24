# marketing.pen

Every image on the site is made here, in pen.dev, then exported to `public/`. Open
`marketing.pen` with the Pen app (it reads the shader and images beside it).

## Sections

- **Painted icons**: the Otter mark and the module icons, Otter's own glyphs repainted as brush
  strokes on linen by `shaders/brush-oil.glsl`. Without a tile they are the site's mark
  (`public/img/mark.png`, 0.25x) and module icons (`public/img/icons/<name>.png`, 0.5x).
- **Building blocks**: the Permission card component (Otter's real approval card).
- **Paintings**: oil studies generated with pen.dev's AI image tool. The section's note holds
  the shared style prompt; give any new painting that same prompt so the set stays one hand.
  Their sources are in `images/paint/`; they export at 2x to `public/img/paint/<name>.webp`.
- **Heroes**: each page's top image, a painting with Otter's screen over its lower third. The
  screen never covers more than that: the painting is the mood, the screen is the product.
  `og` is the social card (1x png to `public/og.png`).
- **Screens**: Otter's screens and close-ups on their own, nothing behind them, and the four
  permission cards.

A frame named `img/hero` exports at 2x webp to `public/img/hero.webp`, `shot/calendar` to
`public/img/shot/calendar.webp`, and so on. Exports include the shadow, so update the `<img>`
width and height to the file's real size.

## Screens (`images/ui/`)

Otter's current screens, exported in light mode from the otter repository's `design/otter.pen`
with their text rewritten for the site (Robin at Northwind, the agent Scout). To refresh one:
copy the screen in `otter.pen` into a scratch frame with `theme: {mode: "light"}`, change its
text there, export it at 2x and delete the copy, so `otter.pen` is unchanged. Save it under a
new file name: Pen keeps an image it has loaded until the name changes. Leave out sample data
that reads as a demo (failed runs, model names, odd counts).

Check that anything a screen or a caption shows still ships (`docs/features.md` in the otter
repository) before exporting it.

## Git LFS

`design/`'s images and `marketing.pen` are in Git LFS (`.gitattributes`); run `git lfs install`
once before cloning. `public/` stays in plain git, so the deploy needs no LFS.
