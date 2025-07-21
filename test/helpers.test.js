import { it, expect, describe } from "vitest";
import { isDecimalNumber, isIntegerNumber } from "../js/helpers";

describe("isDecimalNumber", () => {
  it("Should not fail, empty string", () => {
    const str = "";
    expect(isDecimalNumber(str)).toBe(true);
  });
  it("Should not fail, .", () => {
    const str = ".";
    expect(isDecimalNumber(str)).toBe(true);
  });
  it("Should not fail, 1", () => {
    const str = "1";
    expect(isDecimalNumber(str)).toBe(true);
  });
  it("Should not fail, 1.", () => {
    const str = "1.";
    expect(isDecimalNumber(str)).toBe(true);
  });
  it("Should not fail, .1", () => {
    const str = ".1";
    expect(isDecimalNumber(str)).toBe(true);
  });
  it("Should not fail, .12", () => {
    const str = ".12";
    expect(isDecimalNumber(str)).toBe(true);
  });
  it("Should not fail, 1.1", () => {
    const str = "1.1";
    expect(isDecimalNumber(str)).toBe(true);
  });

  it("Should fail, a", () => {
    const str = "a";
    expect(isDecimalNumber(str)).toBe(false);
  });

  it("Should fail, 1..", () => {
    const str = "1..";
    expect(isDecimalNumber(str)).toBe(false);
  });

  it("Should fail, ..1", () => {
    const str = "..1";
    expect(isDecimalNumber(str)).toBe(false);
  });
});

describe("isIntegerNumber", () => {
  it("Should not fail, empty string", () => {
    const str = "";
    expect(isIntegerNumber(str)).toBe(true);
  });
  it("Should not fail, 1", () => {
    const str = "1";
    expect(isIntegerNumber(str)).toBe(true);
  });
  it("Should not fail, 12", () => {
    const str = "12";
    expect(isIntegerNumber(str)).toBe(true);
  });
  it("Should fail, a", () => {
    const str = "a";
    expect(isIntegerNumber(str)).toBe(false);
  });
  it("Should fail, .", () => {
    const str = ".";
    expect(isIntegerNumber(str)).toBe(false);
  });
  it("Should fail, 1.", () => {
    const str = "1.";
    expect(isIntegerNumber(str)).toBe(false);
  });
  it("Should fail, 1..", () => {
    const str = "1..";
    expect(isIntegerNumber(str)).toBe(false);
  });
  it("Should fail, .1", () => {
    const str = ".1";
    expect(isIntegerNumber(str)).toBe(false);
  });
});
