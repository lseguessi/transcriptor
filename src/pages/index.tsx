import Head from "next/head";
import { useEffect } from "react";
import { checkSession } from "@/lib/authorized/auth";
import { useRouter } from "next/router";
import FullLoading from "@/components/commons/FullLoading";
import Login from "./login";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const check = checkSession();
    if (check) {
      router.push("/home")
    } else {
      router.push("/login")

    }
  }, []);

  return (
    <>
      <FullLoading />
    </>
  );
}
