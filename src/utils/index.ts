export function shortenString(str: string, length?: number): string {
    if (str.length <= (length || 8)) {
      return str;
    }
    const start = str.slice(0, 4);
    const end = str.slice(-4);
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