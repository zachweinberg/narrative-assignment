import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/buy-orders");
  }, []);

  return null;
};

export default Index;