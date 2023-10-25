import React from 'react';
import {instance} from "../../commons/api";
import {ArgFetchType, ArgPostType, PackType} from "./packsTypes";




export const packApi = {
  packsGet: (arg?:ArgFetchType) => {
    return instance.get(`cards/pack?&page=${arg?.page}&pageCount=12&packName=${arg?.packName}&user_id=${arg?.user_id}&sortPacks=${arg?.sortPacks}&min=${arg?.min}&max=${arg?.max} `)
  },
  packPost: (cardsPack: ArgPostType) => {
    return instance.post('cards/pack', {cardsPack})
  },
  packRemove: (id: string) => {
    return instance.delete(`cards/pack?id=${id}`)
  },
  packUpdate(cardsPack: PackType) {
    return instance.put(`cards/pack`, {cardsPack})
  }
}


