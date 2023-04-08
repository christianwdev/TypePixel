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

    api_key: string

    constructor(api_key: string) {
        this.api_key = api_key
    }

    async makeRequest(endpoint: PublicEndpoints | AuthorizedEndpoints) {
        if (!isValidEndpoint(endpoint)) {
            throw new Error('Invalid endpoint provided, please ensure you only pass through either a PublicEndpoint or a AuthorizedEndpoint.');
        }

        if (isEndpointAuthorized(endpoint) && !this.api_key) {
            throw new Error('You must supply an Hypixel API Key to make API requests to authorized endpoints.');
        }


    }

    async getUserProfiles(uuid: string, justGetIdentifiers: boolean = false) {

    }

    async getAuctions(page: number) {

    }

}