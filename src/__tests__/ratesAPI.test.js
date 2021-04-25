import axios from "axios";
import { getCurrency } from "../services/ratesAPI";
import { eur, usd } from "../__fixtures__/data";

jest.mock("axios");

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    const label = url.split("/").pop();
    let data;
    if (label === "EUR") {
      data = eur;
    } else if (label === "USD") {
      data = usd;
    } else {
      throw new Error("Wrong label");
    }
    return Promise.resolve({ data: data });
  });
});

describe("Get currency", () => {
  it("Get EUR", async () => {
    await expect(getCurrency("EUR")).resolves.toEqual(eur);
  });
  it("Get USD", async () => {
    await expect(getCurrency("USD")).resolves.toEqual(usd);
  });
  it("With wrong label", async () => {
    await expect(getCurrency("AAA")).rejects.toThrowError("Wrong label");
  });
});
