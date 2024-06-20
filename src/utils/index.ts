export function shortenString(str: string, length?: number): string {
    if (str.length <= (length || 8)) {
      return str;
    }
    const start = str.slice(0, 8);
    const end = str.slice(-8);
    return `${start}...${end}`;
  }


  export async function getBTCPriceInDollars() {
    try {
      const response = await fetch(
        "https://api.coinbase.com/v2/prices/BTC-USD/spot"
      );
      const data = await response.json();
      const priceInDollars = Number(data["data"]["amount"]);
      return priceInDollars;
    } catch (error) {
      console.error("Error fetching BTC price:", error);
      return null;
    }
  }

  export function convertSatoshiToBTC(satoshi:number) {
    const SATOSHI_IN_ONE_BTC = 100000000;
    return satoshi / SATOSHI_IN_ONE_BTC;
  }
  export function convertSatoshiToUSD(satoshi:number, btcPrice:number) {
    const SATOSHI_IN_ONE_BTC = 100000000;
    return (satoshi / SATOSHI_IN_ONE_BTC)* btcPrice;
  }