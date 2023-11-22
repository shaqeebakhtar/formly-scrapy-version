"use client";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const helloQuery = trpc.hello.greeting.useQuery({ name: "shaqeeb" });

  return <h1>{helloQuery.data}</h1>;
}
