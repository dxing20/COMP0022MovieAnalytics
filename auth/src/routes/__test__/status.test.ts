import request from "supertest";
import { app } from "../../app";
import { signupRequest } from "./signup.test";

async function statusRequest(
  username: string,
  password: string,
  cookie: string[],
  expectStatus: number
) {
  if (cookie.length === 0) {
    const res = await request(app)
      .post("/api/users/status")
      .send({ username, password })
      .expect(expectStatus);
    return res;
  }

  const res = await request(app)
    .post("/api/users/status")
    .set("Cookie", cookie)
    .send({ username, password })
    .expect(expectStatus);

  return res; // session storage stores jwt token
}

it("status before", async () => {
  const res = await statusRequest("username", "password", [], 200);

  expect(res.body).toEqual({ loggedIn: false, username: null });
});

it("status after", async () => {
  const res = await signupRequest("username", "password", "test", 201);
  const cookie = res.get("Set-Cookie");

  const res2 = await statusRequest("username", "password", cookie, 200);
});
