"use client";

import { constructUrl, post } from "@/api/api";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const res = await post({
      url: constructUrl("auth", "/api/users/signup"),
      body: {
        username,
        password,
        adminKey,
      },
    });
    if (res.username != null) {
      window.location.href = "/";
    } else {
      console.log(res);
    }
  };

  return (
    <div className="fixed left-0 top-0 bg-slate-300 w-screen h-screen sm:ml-14">
      <div className="h-14 bg-slate-50 ">{/* Header Div */}</div>
      <h1 className="text-3xl">Signup</h1>
      <form onSubmit={onSubmit}>
        <label className="mr-1" htmlFor="username">
          Username:
        </label>
        <input
          className="mr-2"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="mr-1" htmlFor="password">
          Password:
        </label>
        <input
          className="mr-2"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="mr-1" htmlFor="adminkey">
          Admin Key:
        </label>
        <input
          className="mr-2"
          type="password"
          id="adminKey"
          name="adminkey"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>

      <Link href="/auth/signin">Signin</Link>
    </div>
  );
}
