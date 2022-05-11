import { LIGHT_COLOR_BUDGET, Color } from './color.mjs';

test('generates colours', () => {
    const color = Color.generate(LIGHT_COLOR_BUDGET);
    expect(color.values).toHaveLength(3);
    color.values.forEach(element => {
        expect(Math.floor(element)).toEqual(element);
        expect(element).toBeGreaterThanOrEqual(0);
        expect(element).toBeLessThanOrEqual(255);
    });
});

test('generates complimentary colours', () => {
    const color = Color.generate(LIGHT_COLOR_BUDGET);
    const colorSum = color.values.reduce((acc, cur) => acc + cur, 0);

    const compliment = color.compliment();
    const complimentSum = compliment.values.reduce((acc, cur) => acc + cur, 0);

    expect(colorSum + complimentSum).toEqual(3 * 0xFF);
});

test('does not exceed the budget when generating colours', () => {
    for (let i = 0; i < 100; ++i) {
        const color = Color.generate(LIGHT_COLOR_BUDGET);
        const sum = color.values.reduce((acc, cur) => acc + cur, 0);
        expect(sum).toBeLessThanOrEqual(LIGHT_COLOR_BUDGET);
    }
});

test('uses at least half of the budget when generating colours', () => {
    for (let i = 0; i < 100; ++i) {
        const color = Color.generate(LIGHT_COLOR_BUDGET);
        const sum = color.values.reduce((acc, cur) => acc + cur, 0);
        expect(sum).toBeGreaterThan(LIGHT_COLOR_BUDGET / 2);
    }
});

test('represents colours as CSS hexadecimal colour strings', () => {
    const stringed = `${Color.generate(LIGHT_COLOR_BUDGET)}`;
    expect(stringed).toMatch(/^#[0-9a-f]{6}$/);
});
