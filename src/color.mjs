export const LIGHT_COLOR_BUDGET = 2 * 0xFF;

// Based on Ninh Pham's comment on https://stackoverflow.com/a/13240395/640170.
const hex = (d, width) => Number(d).toString(16).padStart(width, '0');

export class Color {
    constructor(values) {
        this.values = values;
    }

    toString() {
        return '#' + this.values.map(d => hex(d, 2)).join('');
    }

    compliment() {
        return new Color([
            255 - this.values[0],
            255 - this.values[1],
            255 - this.values[2],
        ]);
    }

    static generate(budget) {
        const values = [];
        let i = 0;
        for (; i < 2; ++i) {
            values[i] = Math.floor(Math.random() * Math.min(255, budget));
            budget = Math.max(0, budget - values[i]);
        }
        values[i] = Math.min(255, budget);
        return new Color(values);
    }
}
