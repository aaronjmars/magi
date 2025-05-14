import { Inter } from "next/font/google";
import Head from "next/head";
import React from "react";
import UploadComponent from "./components/UploadComponent";
import SearchBar from "./components/SearchBar";
import GenerateIPButton from "./components/GenerateIPButton";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Magi</title>
        <link rel="icon" href="/img/favicon.ico" sizes="any" />
      </Head>
      <main className={`${inter.className}`}>
        <UploadComponent />
        <GenerateIPButton />
        <div>
          <SearchBar />
        </div>
        <Toaster />
      </main>
    </>
  );
}
