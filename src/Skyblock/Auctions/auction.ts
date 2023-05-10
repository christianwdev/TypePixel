import {Auction} from "../../models/Skyblock/auction";
import {base64ToItems} from "../Item/item";

export async function parseAuctionsPage(auctionsData:any, convertItemBytes: boolean = false):Promise<Auction[]> {

    let auctions:Auction[] = []

    for (let unparsedAuction of auctionsData.auctions) {
        let auction:Auction = { ...unparsedAuction }

        if (convertItemBytes) {
            auction.item = (await base64ToItems(auction.item_bytes))[0]
        }

        auctions.push(auction)
    }

    return auctions
}