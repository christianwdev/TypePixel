import {HypixelClient} from "./Client/client";
import {base64ToItems} from "./Skyblock/Item/item";
import {SackItem} from "./models/Skyblock/sacks";
import {CollectionType} from "./models/Skyblock/collections";

import express from 'express'
const app = express()
let tc = new HypixelClient()

setTimeout(() => {
    app.get('/test', async (req, res) => {
        res.json(await tc.getBazaar())
    })
    app.listen(1000)
}, 0)

export const Client = HypixelClient
export const convertItems = base64ToItems
export const Enums = {
    SackItem: SackItem,
    CollectionItems: CollectionType,
}