package com.project.ims.services

import com.project.ims.domain.entities.OutgoingProductEntity
import com.project.ims.domain.entities.PurchaseProductEntity
import com.project.ims.domain.entities.SupplierEntity

interface PurchaseService {
    fun create(purchaseProductEntity: PurchaseProductEntity): PurchaseProductEntity


    fun  list():List<PurchaseProductEntity>

    fun get(id: Long): PurchaseProductEntity?
    fun update(id:Long,purchaseProductEntity: PurchaseProductEntity): PurchaseProductEntity

    fun delete(id:Long)
}