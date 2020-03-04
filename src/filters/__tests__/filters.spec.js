import { upperCase } from "../filters";

describe("filters", () => {
  it("filter upperCase", () => {
    expect.assertions(1);
    const text = "hola";
    expect(upperCase(text)).toBe("HOLA");
  });
});
