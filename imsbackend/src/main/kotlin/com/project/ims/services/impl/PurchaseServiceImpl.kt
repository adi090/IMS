package com.project.ims.services.impl

import com.project.ims.domain.entities.OutgoingProductEntity
import com.project.ims.domain.entities.PurchaseProductEntity
import com.project.ims.domain.entities.SupplierEntity
import com.project.ims.repositories.ItemRepo
import com.project.ims.repositories.OutgoingProdRepo
import com.project.ims.repositories.PurchaseProdRepo
import com.project.ims.repositories.SupplierRepo
import com.project.ims.services.OutgoingService
import com.project.ims.services.PurchaseService
import com.project.ims.services.SupplierService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service


@Service
class PurchaseServiceImpl(private val purchaseProdRepo: PurchaseProdRepo,private val itemRepo: ItemRepo): PurchaseService {
    override fun create(purchaseProductEntity: PurchaseProductEntity): PurchaseProductEntity {
        var item=itemRepo.findById(purchaseProductEntity.itemEntity.id)
            .orElseThrow { RuntimeException("Item not found") }


        item.quantity += purchaseProductEntity.quantity
        itemRepo.save(item)


        return purchaseProdRepo.save(purchaseProductEntity)
    }

    override fun list(): List<PurchaseProductEntity> {
        return purchaseProdRepo.findAll()
    }

    override fun get(id:Long): PurchaseProductEntity?{
        return purchaseProdRepo.findByIdOrNull(id)
    }

    override fun update(id:Long,purchaseProductEntity: PurchaseProductEntity): PurchaseProductEntity {
        val existingProduct = purchaseProdRepo.findById(id)
            .orElseThrow { RuntimeException("Purchased Product  not found") }
        var item=itemRepo.findById(purchaseProductEntity.itemEntity.id)
            .orElseThrow { RuntimeException("Item not found") }


        if(purchaseProductEntity.quantity > item.quantity){
            throw RuntimeException("Not enough stock!")
        }

        var quantityDifference=purchaseProductEntity.quantity-existingProduct.quantity

        if(quantityDifference>0 && item.quantity >=purchaseProductEntity.quantity){
            item.quantity-=quantityDifference
            itemRepo.save(item)
        }
        else if(quantityDifference<0 ){
            item.quantity-=quantityDifference
            itemRepo.save(item)
        }
        val updatedOutgoingProduct = purchaseProductEntity.copy(id = id)
        return purchaseProdRepo.save(updatedOutgoingProduct)

    }

    override fun delete(id:Long){
        purchaseProdRepo.deleteById(id)
    }

}