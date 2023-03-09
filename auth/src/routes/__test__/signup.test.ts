import request from "supertest";
import { app } from "../../app";

async function signupRequest(
  username: string,
  password: string,
  adminKey: string,
  expectStatus: number
) {
  const res = await request(app)
    .post("/api/users/signup")
    .send({ username, password, adminKey })
    .expect(expectStatus);

  return res; // session storage stores jwt token
}

it("signup with no admin key", async () => {
  const res = await signupRequest("username", "password", "", 400);
  expect(res.get("Set-Cookie")).toBeUndefined();
  expect(res.body.errors[0].message).toEqual(
    "Adding new users requires admin privileges"
  );
});

it("signup with admin key", async () => {
  const res = await signupRequest("test", "test", "test", 201);
  expect(res.get("Set-Cookie")).toBeDefined();
  expect(res.body).toEqual({
    username: "test",
    password: expect.any(String),
  });
});

it("signup with wrong admin key", async () => {
  const res = await signupRequest("test", "test", "test123", 403);
  expect(res.get("Set-Cookie")).toBeUndefined();
  expect(res.body.errors[0].message).toEqual("Admin key is incorrect");
});

it("bad username and password", async () => {
  const res = await signupRequest("", "22", "test", 400);
  expect(res.get("Set-Cookie")).toBeUndefined();
  expect(res.body.errors.length).toEqual(2);
});

export { signupRequest };
