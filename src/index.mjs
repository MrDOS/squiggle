import { LIGHT_COLOR_BUDGET, Color } from './color.mjs';

const svg = (colorA, colorB) => `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <style>

    svg {
        background-color: #000000;
        shape-rendering: crispEdges;
    }

    </style>
    <path d="M 10,8 v 8 l 8,-8 H 8" style="fill: ${colorA};" />
    <circle cx="24" cy="20" r="4" style="fill: ${colorB};" />
    <g style="fill: none; stroke: #ffffff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;">
        <path d="M 4,12 8,4" />
        <path d="m 16,18 -8,4 4,4 -8,4" />
        <path d="m 18,2 8,8" />
        <path d="m 22,28 8,-8" />
    </g>
</svg>`;

export default {
    async fetch() {
        const colorA = Color.generate(LIGHT_COLOR_BUDGET);
        const colorB = colorA.compliment();
        const image = svg(colorA, colorB);

        return new Response(image, {
            headers: {
                'content-type': 'image/svg+xml',
            },
        });
    }
};
