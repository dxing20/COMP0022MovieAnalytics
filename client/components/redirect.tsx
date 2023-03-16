"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function RedirectSignin({ loggedIn }: { loggedIn: string }) {
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      router.replace("/");
    }

    router.replace("/auth/signin");
  }, []);

  return <div>Loading</div>;
}

export default RedirectSignin;
