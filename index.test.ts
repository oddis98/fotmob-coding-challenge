import { it, expect } from "@jest/globals";
import { includeExclude, range } from "./index";

it("should return an array of numbers", () => {
  expect(range(5, 10)).toEqual([5, 6, 7, 8, 9, 10]);
});
