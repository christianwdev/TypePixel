import {Auction, EndedAuction} from "../../models/Skyblock/auction";
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

export async function parseEndedAuctions(auctionsData:any, convertItemBytes: boolean = false):Promise<EndedAuction[]> {

    let auctions:EndedAuction[] = []

    for (let unparsedAuction of auctionsData.auctions) {
        let auction:EndedAuction = { ...unparsedAuction }

        if (convertItemBytes && auction.item_bytes) {
            auction.item = (await base64ToItems(auction.item_bytes))[0]
        }

        auctions.push(auction)
    }

    return auctions
}