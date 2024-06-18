"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/stores";
import { WalletProvider } from "bitcoin-wallet-adapter";
import initMixpanel from "@/lib/mixpanelConfig";
import { ReactNode, useEffect, useState } from "react";
// import { SocketProvider } from "@/components/providers/socket";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type AuthViewProps = {
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initMixpanel();
  }, []);
  return (
    <Provider store={store}>
      <WalletProvider>
        {/* <SocketProvider> */}
          <html lang="en">
            <body className="bg-primary text-light_gray relative ">
              <main className=" max-w-screen-2xl mx-auto no-scrollbar relative pb-16 lg:pb-24">
                <Header />

                <div className="mt-32">{children}</div>
              </main>
              <div className="bg-secondary">
                <Footer />
              </div>
            </body>
          </html>
        {/* </SocketProvider> */}
      </WalletProvider>
    </Provider>
  );
}
