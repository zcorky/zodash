import * as lstatus from "statuses";
import * as statuses from "../src/statuses";

describe("@zodash/statuses", () => {
  it("OK === 200", () => {
    expect(lstatus("ok")).toBe(statuses.OK);
  });

  it("CREATED === 201", () => {
    expect(lstatus("created")).toBe(statuses.CREATED);
  });

  it("NO_CONTENT === 204", () => {
    expect(lstatus("no content")).toBe(statuses.NO_CONTENT);
  });

  it("NOT_MODIFIED === 304", () => {
    expect(lstatus("NOT MODIFIED")).toBe(statuses.NOT_MODIFIED);
  });

  it("BAD_REQUEST === 400", () => {
    expect(lstatus("BAD REQUEST")).toBe(statuses.BAD_REQUEST);
  });

  it("UNAUTHORIZED === 401", () => {
    expect(lstatus("UNAUTHORIZED")).toBe(statuses.UNAUTHORIZED);
  });

  it("FORBIDDEN === 403", () => {
    expect(lstatus("FORBIDDEN")).toBe(statuses.FORBIDDEN);
  });

  it("NOT_FOUND === 404", () => {
    expect(lstatus("NOT FOUND")).toBe(statuses.NOT_FOUND);
  });

  it("METHOD_NOT_ALLOWED === 405", () => {
    expect(lstatus("METHOD NOT ALLOWED")).toBe(statuses.METHOD_NOT_ALLOWED);
  });

  it("INTERNAL_SERVER_ERROR === 500", () => {
    expect(lstatus("INTERNAL SERVER ERROR")).toBe(statuses.INTERNAL_SERVER_ERROR);
  });

  it("BAD_GATEWAY === 502", () => {
    expect(lstatus("BAD GATEWAY")).toBe(statuses.BAD_GATEWAY);
  });

  it("SERVICE_UNAVAILABLE === 503", () => {
    expect(lstatus("SERVICE UNAVAILABLE")).toBe(statuses.SERVICE_UNAVAILABLE);
  });

  it("GATEWAY_TIMEOUT === 504", () => {
    expect(lstatus("GATEWAY TIMEOUT")).toBe(statuses.GATEWAY_TIMEOUT);
  });
});
