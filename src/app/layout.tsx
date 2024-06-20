"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/stores";
import { WalletProvider } from "bitcoin-wallet-adapter";
import { ReactNode, useEffect, useState } from "react";
// import { SocketProvider } from "@/components/providers/socket";
import Header from "@/components/Header";

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
  
  return (
    <Provider store={store}>
      <WalletProvider>
        {/* <SocketProvider> */}
        <html lang="en">
          <body className="bg-primary text-light_gray relative ">
            <main className="  no-scrollbar relative pb-16 lg:pb-24">
              <Header />
              <div className="pt-24">{children}</div>
            </main>
          </body>
        </html>
        {/* </SocketProvider> */}
      </WalletProvider>
    </Provider>
  );
}
