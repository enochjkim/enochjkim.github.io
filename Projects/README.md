# Project photos

Put project images in the matching folder:

- `Structures/`
- `Composites/`
- `NASA Research/`
- `Analysis & Simulation/`
- `Propulsion/`
- `Other Projects/`

Then add one entry per image in `js/project-galleries.js`:

```js
structures: [
    {
        image: "Projects/Structures/rocket-frame.jpg",
        title: "Rocket frame assembly",
        text: "Vehicle-level structural integration before testing.",
        alt: "Rocket frame assembly on a workbench"
    }
]
```

You can add as many entries as needed. The gallery automatically changes its layout for the number of photos and stacks into a compact two-column layout on mobile. Every entry needs an image path, title, text, and alt text.

Use web-friendly image files such as `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, or `.avif`. Avoid spaces in filenames when possible.
