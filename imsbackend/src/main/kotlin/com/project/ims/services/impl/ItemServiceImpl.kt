package com.project.ims.services.impl

import com.project.ims.domain.entities.ItemEntity
import com.project.ims.repositories.ItemRepo
import com.project.ims.services.ItemService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service


@Service
class ItemServiceImpl(private val itemRepo: ItemRepo):ItemService {
    override fun create(itemEntity: ItemEntity):ItemEntity{
        return itemRepo.save(itemEntity)
    }

    override fun list(): List<ItemEntity> {
        return itemRepo.findAll()
    }

    override fun get(id:Long):ItemEntity?{
        return itemRepo.findByIdOrNull(id)
    }

    override fun update(id:Long,itemEntity: ItemEntity):ItemEntity{
        val updatedItem=itemEntity.copy(id=id)
        return itemRepo.save(updatedItem)
    }

    override fun delete(id:Long){
        itemRepo.deleteById(id)
    }

}