"use client";

import { constructUrl, post } from "@/api/api";
import Link from "next/link";
import { useState } from "react";

export default function SignOutPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const res = await post({
      url: constructUrl("auth", "/api/users/signout"),
      body: {},
    });

    window.location.href = "/auth/signin";
  };

  return (
    <div className="fixed left-0 top-0 bg-slate-300 w-screen h-screen sm:ml-14">
      <div className="h-14 bg-slate-50 ">{/* Header Div */}</div>
      <h1 className="text-3xl">Signout</h1>
      <form onSubmit={onSubmit}>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
