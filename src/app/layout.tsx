"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/stores";
import { WalletProvider } from "bitcoin-wallet-adapter";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //
  return (
    <Provider store={store}>
      <WalletProvider customAuthOptions={{network:"testnet"}}>
        <html lang="en">
          <body className="bg-primary text-light_gray relative ">
            <main className="  no-scrollbar relative pb-16 lg:pb-24">
              <Header />
              <div className="pt-24">{children}</div>
            </main>
          </body>
        </html>
      </WalletProvider>
    </Provider>
  );
}
