package com.project.ims.services

import com.project.ims.domain.entities.CategoryEntity
import com.project.ims.domain.entities.ItemEntity
import com.project.ims.domain.entities.SupplierEntity

interface SupplierService {
    fun create(supplierEntity: SupplierEntity): SupplierEntity


    fun  list():List<SupplierEntity>

    fun get(id: Long): SupplierEntity?
    fun update(id:Long,supplierEntity: SupplierEntity):SupplierEntity

    fun delete(id:Long)
}