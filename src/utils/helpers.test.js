import { formatTimestamp } from "./helpers";

describe("formatTimestamp", () => {
  /* Verify that this function properly formats a random PM time. */
  it("will return '6:30 PM, February 12th, 2023' properly formatted.", () => {
    expect(formatTimestamp(1676244600000)).toEqual("6:30 PM | 2/12/2023");
  });

  /* Verify that this function properly formats a random AM time. */
  it("will return 'December 29, 2022 @ 6:30 AM' properly formatted.", () => {
    expect(formatTimestamp(1669980600000)).toEqual("6:30 AM | 12/2/2022");
  });
});
