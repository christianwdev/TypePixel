import { Item } from "../../models/Skyblock/items";

export interface AuctionBid {
    auction_id: string,
    bidder: string,
    profile_id: string,
    amount: number,
    timestamp: number,
}

export interface Auction {
    uuid: string,
    auctioneer: string,
    profile_id: string,
    coop: string[],
    start: number,
    end: number,
    item_name: string,
    item_lore: string,
    extra: string,
    category: string,
    tier: string,
    starting_bid: number,
    item_bytes: string,
    claimed_false: boolean,
    highest_bid_amount: number,
    bin: boolean,
    last_updated: number,
    bids: AuctionBid[],
    item_uuid: string,

    // Optional or Custom
    item?: Item
}

export interface EndedAuction {
    auction_id: string,
    seller: string,
    seller_profile: string,
    buyer: string,
    timestamp: number,
    price: number,
    bin: boolean,

    item_bytes?: string,
    item?: Item,
}