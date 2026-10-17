import { sha1Base64 } from "./sha1";

// Known-answer vectors for the inlined synchronous SHA-1. Each expected
// value was generated once with Node's createHash("sha1").update(text)
// .digest("base64") and hardcoded here, so this test pins the
// byte-compatibility contract without importing Node's crypto.
describe("sha1Base64", () => {
  const cases: Array<[string, string, string]> = [
    ["empty string", "", "2jmj7l5rSw0yVb/vlWAYkK/YBwk="],
    ["ascii", "abc", "qZk+NkcGgWq6PiVxeFDCbJzQ2J0="],
    ["two-byte utf-8", "caf\u00e9", "9CRFKpZzkYxvCbDN01sgvo5q59c="],
    ["three-byte utf-8", "\u65e5\u672c\u8a9e", "wSFAoP+05WSBtP4KeiUEDC6vqco="],
    ["four-byte utf-8 (emoji)", "\ud83d\ude00", "nFM2iKl5qFjL1qQ8n5GrpiRlHxg="],
    ["lone high surrogate encodes as U+FFFD", "\ud800", "m9t3J2wYUuH7BnggRygS/PYIQCQ="],
    ["lone low surrogate encodes as U+FFFD", "x\udc00y", "QZzEiOPNZyp9iGED8gv+IevAxaQ="],
    ["55 bytes (padding fits in one block)", "a".repeat(55), "wci73CJ5bijA4VFj0giZtlYh1lo="],
    ["56 bytes (padding needs an extra block)", "a".repeat(56), "wtszD2CDhUyZ1LW/tujynyAb5pk="],
    ["long input", "The quick brown fox jumps over the lazy dog", "L9ThxnotKPzthJ7hu3bnORuT6xI="],
  ];

  for (const [name, input, expected] of cases) {
    it(`hashes ${name}`, () => {
      expect(sha1Base64(input)).toBe(expected);
    });
  }

  it("returns 28 base64 characters for any input", () => {
    expect(sha1Base64("anything at all").length).toBe(28);
  });
});
