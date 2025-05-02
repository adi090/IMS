package com.project.ims.services

import com.project.ims.domain.entities.OutgoingProductEntity
import com.project.ims.domain.entities.SupplierEntity

interface OutgoingService {
    fun create(outgoingProductEntity: OutgoingProductEntity): OutgoingProductEntity


    fun  list():List<OutgoingProductEntity>

    fun get(id: Long): OutgoingProductEntity?
    fun update(id:Long,outgoingProductEntity: OutgoingProductEntity): OutgoingProductEntity

    fun delete(id:Long)
}