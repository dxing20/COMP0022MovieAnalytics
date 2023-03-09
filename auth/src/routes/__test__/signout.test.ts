import { cookie } from "express-validator";
import request from "supertest";
import { app } from "../../app";
import { signupRequest } from "./signup.test";

async function signoutRequest(
  username: string,
  password: string,
  cookie: string[],
  expectStatus: number
) {
  const res = await request(app)
    .post("/api/users/signout")
    .set("Cookie", cookie)
    .send({ username, password })
    .expect(expectStatus);

  return res; // session storage stores jwt token
}

it("signout clears jwt cookie", async () => {
  const res = await signupRequest("username", "password", "test", 201);
  //not equals 8
  expect(res.get("Set-Cookie")[0].indexOf(";")).not.toBe(8);
  let cookie = res.get("Set-Cookie");
  console.log(cookie);

  const res2 = await signoutRequest("username", "password", cookie, 200);
  expect(res2.get("Set-Cookie")[0].indexOf(";")).toEqual(8);
});

export { signoutRequest };
