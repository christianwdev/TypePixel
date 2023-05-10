import {HypixelClient} from "./Client/client";
import {base64ToItems} from "./Skyblock/Item/item";
import {SackItem} from "./models/Skyblock/sacks";
import {CollectionType} from "./models/Skyblock/collections";

export default {
    Client: HypixelClient,
    convertItems: base64ToItems,

    Enums: {
        SackItem: SackItem,
        CollectionItems: CollectionType,
    }
}