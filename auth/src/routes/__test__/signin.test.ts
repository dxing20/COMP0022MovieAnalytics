import { app } from "../../app";
import request from "supertest";
import { signupRequest } from "./signup.test";

async function signinRequest(
  username: string,
  password: string,
  expectStatus: number
) {
  const res = await request(app)
    .post("/api/users/signin")
    .send({ username, password })
    .expect(expectStatus);

  return res; // session storage stores jwt token
}

it("signin with invalid credentials", async () => {
  const res = await signinRequest("username", "password", 403);
  expect(res.get("Set-Cookie")).toBeUndefined();
  expect(res.body.errors[0].message).toEqual(
    "Username or password is incorrect"
  );
});

it("signin with valid credentials", async () => {
  await signupRequest("username", "password", "test", 201);

  const res = await signinRequest("username", "password", 200);
  expect(res.get("Set-Cookie")).toBeDefined();
  expect(res.body).toEqual({
    username: "username",
    password: expect.any(String),
  });
});

export { signinRequest };
