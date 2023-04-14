import {HypixelClient} from "./Client/client";
import {base64ToItems} from "./Skyblock/Item/item";
import {SackItem} from "./models/Skyblock/sacks";
import {CollectionType} from "./models/Skyblock/collections";

const express = require('express')
const app = express()

function init() {
    console.log("Backend is running")

    const client = new HypixelClient('c2845978-2e09-4c44-8598-a63bde43c948')

    app.get('/profile', async (req: any, res: any) => {
        try {
            const {uuid} = req.query
            res.json(await client.getUserProfiles(uuid))
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    })

    app.listen(1000)
}
init()

export default {
    Client: HypixelClient,
    convertItems: base64ToItems,

    Enums: {
        SackItem: SackItem,
        CollectionItems: CollectionType,
    }
}