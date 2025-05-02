package com.project.ims.services

import com.project.ims.domain.entities.CategoryEntity
import com.project.ims.domain.entities.ItemEntity

interface ItemService {
    fun create(itemEntity: ItemEntity): ItemEntity


    fun  list():List<ItemEntity>

   fun get(id: Long): ItemEntity?
    fun update(id:Long,itemEntity: ItemEntity):ItemEntity

    fun delete(id:Long)
}