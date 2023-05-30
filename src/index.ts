import {HypixelClient} from "./Client/client";
import {base64ToItems} from "./Skyblock/Item/item";
import {SackItem} from "./models/Skyblock/sacks";
import {CollectionType} from "./models/Skyblock/collections";

import express from 'express'
import fs from "fs";
const app = express()
let tc = new HypixelClient()

setTimeout(() => {
    app.get('/test', async (req, res) => {
        let itemsFile:any = fs.readFileSync(__dirname + '/resources/all_hypixel_items.json')
        let itemsJSON = JSON.parse(itemsFile)
        let allVars = new Map()

        for (let item of itemsJSON.items) {
            Object.keys(item).forEach(key => allVars.set(key, typeof item[key]))
        }
        res.json([...allVars.entries()])
    })
    app.listen(1000)
}, 0)

export const Client = HypixelClient
export const convertItems = base64ToItems
export const Enums = {
    SackItem: SackItem,
    CollectionItems: CollectionType,
}