import { describe, it, expect } from "vitest"

describe("Sample Test", () => {
  it("should pass a simple test", () => {
    expect(1 + 1).toBe(2)
  })

  it("should work with arrays", () => {
    const numbers = [1, 2, 3]
    expect(numbers).toHaveLength(3)
    expect(numbers).toContain(2)
  })
})
