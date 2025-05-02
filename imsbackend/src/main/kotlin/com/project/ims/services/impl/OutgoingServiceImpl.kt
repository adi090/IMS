package com.project.ims.services.impl

import com.project.ims.domain.entities.OutgoingProductEntity
import com.project.ims.domain.entities.SupplierEntity
import com.project.ims.repositories.ItemRepo
import com.project.ims.repositories.OutgoingProdRepo
import com.project.ims.repositories.SupplierRepo
import com.project.ims.services.OutgoingService
import com.project.ims.services.SupplierService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service


@Service
class OutgoingServiceImpl(private val outgoingProdRepo:OutgoingProdRepo,private val itemRepo: ItemRepo): OutgoingService {
    override fun create(outgoingProductEntity: OutgoingProductEntity): OutgoingProductEntity {
        var item=itemRepo.findById(outgoingProductEntity.itemEntity.id)
            .orElseThrow { RuntimeException("Item not found") }

         if(item.quantity < outgoingProductEntity.quantity){
             throw RuntimeException("Not enough stock!")
         }
        item.quantity -= outgoingProductEntity.quantity
        itemRepo.save(item)


        return outgoingProdRepo.save(outgoingProductEntity)
    }

    override fun list(): List<OutgoingProductEntity> {
        return outgoingProdRepo.findAll()
    }

    override fun get(id:Long): OutgoingProductEntity?{
        return outgoingProdRepo.findByIdOrNull(id)
    }

    override fun update(id:Long,outgoingProductEntity: OutgoingProductEntity): OutgoingProductEntity {
        val existingProduct = outgoingProdRepo.findById(id)
            .orElseThrow { RuntimeException("OutgoingProduct not found") }
        var item=itemRepo.findById(outgoingProductEntity.itemEntity.id)
            .orElseThrow { RuntimeException("Item not found") }


        if(outgoingProductEntity.quantity > item.quantity){
            throw RuntimeException("Not enough stock!")
        }

        var quantityDifference=outgoingProductEntity.quantity-existingProduct.quantity

        if(quantityDifference>0 && item.quantity >=outgoingProductEntity.quantity){
            item.quantity-=quantityDifference
            itemRepo.save(item)
        }
        else if(quantityDifference<0 ){
            item.quantity-=quantityDifference
            itemRepo.save(item)
        }
        val updatedOutgoingProduct = outgoingProductEntity.copy(id = id)
        return outgoingProdRepo.save(updatedOutgoingProduct)

    }

    override fun delete(id:Long){
        outgoingProdRepo.deleteById(id)
    }

}