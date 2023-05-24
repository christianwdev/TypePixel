# TypePixel
JavaScript library built on Typescript to better manage data received from Hypixel API endpoints.

- [Types](#types)
  - ... todo

- [API](#api)
  - [Client](#client)

## API

### Client(config)
- `config` JS Object with options to change how client acts.

Constructs a new Client. This allows you to run API requests that will return their typescript counterparts and without the mess of handling it yourself.

#### getUserProfiles
- `uuid` Mojang created UUID
- `params` JS Object with parameters that allow you to change the returning object.
  - `justGetIdentifiers` Option to just return profile_id, cute_name, game_mode, and if it's selected. `Defaults to false`
  - `constructItems` Allows the API to convert item_bytes into items on backpacks, etc. `Defaults to true`
  - `keepItemBytes` Whether or not to return the item_bytes key. `Defaults to false`
  - `readableNames` Converts items like ink_sack_4 to Lapis or Cocoa Beans, ender_stone to end_stone. `Defaults to true`
- returns: `Profile[]`

Requires an API Hypixel key

#### getAuctions
- `page` integer page number, `Defaults to 0`
- `convertItemBytes` Converts item_bytes to item `Defaults to false`
- returns:
```
{
    type: string,

        page?: number,
        total_pages?: number,
        total_auctions?: number,
        last_updated?: number,

        message: string,
        auctions: Auction[]
}
```
Does not require an API key

#### getEndedAuctions
- `convertItemBytes` Converts item_bytes to item `Defaults to false`

Grabs auctions ended in the past 60 seconds. Does not require an API Key

- returns:
```
{
    type: string,
        last_updated?: number,
        message: string,
        auctions: EndedAuction[]
}
```