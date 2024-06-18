export interface ICollection {
    vault: string;
    created_at: string | number | Date;
    updated_at: string | number | Date;
    _id:string
    name: string;
    slug: string;
    supply: number;
    cover_icon: string;
    banner_icon: string;
    description: string;
    tags: string[];
    twitter_link?: string;
    discord_link?: string;
    website_link?: string;
    no_of_phases?:number
    launchpad_details: {
      wallet_address:string;
      steps_completed:number;
      published:boolean;
    };
    fee_in_btc: number | null;
    fee_address: string | null;
    collection_link: string;
  }