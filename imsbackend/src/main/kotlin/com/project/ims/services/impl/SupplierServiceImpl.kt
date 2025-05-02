package com.project.ims.services.impl


import com.project.ims.domain.entities.SupplierEntity
import com.project.ims.repositories.SupplierRepo
import com.project.ims.services.SupplierService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service


@Service
class SupplierServiceImpl(private val supplierRepo: SupplierRepo):SupplierService {
    override fun create(supplierEntity: SupplierEntity):SupplierEntity{
        return supplierRepo.save(supplierEntity)
    }

    override fun list(): List<SupplierEntity> {
        return supplierRepo.findAll()
    }

    override fun get(id:Long):SupplierEntity?{
        return supplierRepo.findByIdOrNull(id)
    }

    override fun update(id:Long,supplierEntity: SupplierEntity):SupplierEntity{
        val updatedSupplier=supplierEntity.copy(id=id)
        return supplierRepo.save(updatedSupplier)
    }

    override fun delete(id:Long){
        supplierRepo.deleteById(id)
    }

}