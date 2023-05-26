import {Profile} from "../models/Skyblock/profile";
import {convertJSONToProfile} from "../Skyblock/Profile/profile";
import {Auction, EndedAuction} from "../models/Skyblock/auction";
import {parseAuctionsPage, parseEndedAuctions} from "../Skyblock/Auctions/auction";
import {ClientConfig} from "../models/Client/clientconfig";
import {Product} from "../models/Skyblock/bazaar";

const fetch = require('node-fetch')

export enum PublicEndpoints {
    ACTIVE_AUCTIONS = 'https://api.hypixel.net/skyblock/auctions',
    ENDED_AUCTIONS = 'https://api.hypixel.net/skyblock/auctions_ended',
    BAZAAR = 'https://api.hypixel.net/skyblock/bazaar',
    BINGO_GOALS = 'https://api.hypixel.net/resources/skyblock/bingo',
    ELECTION = 'https://api.hypixel.net/resources/skyblock/election',
    SKILLS = 'https://api.hypixel.net/resources/skyblock/skills',
    COLLECTIONS = 'https://api.hypixel.net/resources/skyblock/collections',
    FIRESALES = 'https://api.hypixel.net/skyblock/firesales',
}

export enum AuthorizedEndpoints {
    SKYBLOCK_PROFILE = 'https://api.hypixel.net/skyblock/profile',
    SKYBLOCK_PROFILES = 'https://api.hypixel.net/skyblock/profiles',
    AUCTION = 'https://api.hypixel.net/skyblock/auction',
    SKYBLOCK_NEWS = 'https://api.hypixel.net/skyblock/news',
    PLAYER_BINGO = 'https://api.hypixel.net/skyblock/bingo',

}

function isValidEndpoint(endpoint: PublicEndpoints | AuthorizedEndpoints): boolean {
    return Object.values(PublicEndpoints).includes(endpoint as PublicEndpoints) ||
        Object.values(AuthorizedEndpoints).includes(endpoint as AuthorizedEndpoints);
}

function isEndpointAuthorized(endpoint: PublicEndpoints | AuthorizedEndpoints): boolean {
    return Object.values(AuthorizedEndpoints).includes(endpoint as AuthorizedEndpoints);
}

export class HypixelClient {

    config:ClientConfig

    constructor(config:ClientConfig = {
        auction_cache_duration: 300,
        profile_cache_duration: 600,
    }) {
        this.config = config
    }

    async makeRequest(endpoint: PublicEndpoints | AuthorizedEndpoints, params = '') {
        try {

            if (!isValidEndpoint(endpoint)) {
                throw new Error('Invalid endpoint provided, please ensure you only pass through either a PublicEndpoint or a AuthorizedEndpoint.');
            }

            if (isEndpointAuthorized(endpoint) && (!this.config.api_key || this.config.api_key.length < 1)) {
                throw new Error('You must supply an Hypixel API Key to make requests to authorized endpoints.');
            }

            let response = await fetch(endpoint + params)
            return response.json()

        } catch (e: any) {
            console.log(`There was an error when trying to fetch ${endpoint + params} because of `, e)
            return { success: false, message: e.message || '' }
        }
    }

    async getUserProfiles(uuid: string, params: any = {}):Promise<{ type: string, message: string, profiles: Profile[] }> {
        if (!this.config.api_key || this.config.api_key.length < 1) {
            throw new Error('You must supply an Hypixel API Key to get a users profiles.');
        }

        const allProfileData = await this.makeRequest(AuthorizedEndpoints.SKYBLOCK_PROFILES, `?uuid=${uuid}&key=${this.config.api_key}`)

        if (!allProfileData.success) {
            return { type: 'error', message: `Failed getting ${uuid}'s profiles.`, profiles: [] }
        }
        if (!allProfileData.profiles || !Array.isArray((allProfileData.profiles))) {
            return { type: 'error', message: `${uuid} has no available profiles.`, profiles: [] }
        }

        return {
            type: 'success',
            message: `Successfully fetched the profiles for ${uuid}.`,
            profiles: await convertJSONToProfile(allProfileData, params)
        }
    }

    async getAuctions(page: number = 0, convertItemBytes: boolean = false):Promise<
        {
            type: string,

            page?: number,
            total_pages?: number,
            total_auctions?: number,
            last_updated?: number,

            message: string,
            auctions: Auction[]
        }>
    {
        page = Math.floor(page) // Ensure it's a whole number.
        const auctionsData = await this.makeRequest(PublicEndpoints.ACTIVE_AUCTIONS, `?page=${page}`)

        if (!auctionsData.success) {
            return { type: 'error', message: auctionsData?.cause || auctionsData?.message || `Error occurred when fetching auctions page ${page}.`, auctions: [] }
        }

        return {
            type: 'success',

            page: auctionsData.page,
            total_pages: auctionsData.totalPages,
            total_auctions: auctionsData.totalAuctions,
            last_updated: auctionsData.lastUpdated,

            message: `Successfully fetched auctions page ${page}.`,
            auctions: await parseAuctionsPage(auctionsData, convertItemBytes)
        }
    }

    async getEndedAuctions(convertItemBytes: boolean = false):Promise<
        {
            type: string,
            last_updated?: number,
            message: string,
            auctions: EndedAuction[]
        }>
    {
        const auctionsData = await this.makeRequest(PublicEndpoints.ENDED_AUCTIONS)

        if (!auctionsData.success) {
            return { type: 'error', message: auctionsData?.cause || auctionsData?.message || `Error occurred when fetching ended auctions.`, auctions: [] }
        }

        return {
            type: 'success',
            last_updated: auctionsData.lastUpdated,

            message: `Successfully fetched auctions that have ended in the last 60 seconds.`,
            auctions: await parseEndedAuctions(auctionsData, convertItemBytes)
        }
    }

    async getBazaar():Promise<
        {
            type: string,
            last_updated?: number,
            message: string,
            products: Product[]
        }>
    {

        const bazaarData = await this.makeRequest(PublicEndpoints.BAZAAR)

        if (!bazaarData.success || !bazaarData.products) {
            return { type: 'error', message: bazaarData?.cause || bazaarData?.message || `Error occurred when fetching ended auctions.`, products: [] }
        }

        let remapped:Product[] = []
        let products = Object.values(bazaarData.products)
        products.forEach((prod: any) => remapped.push(prod))

        return {
            type: 'success',
            last_updated: bazaarData.lastUpdated,

            message: `Successfully fetched all bazaar products.`,
            products: remapped
        }
    }
}