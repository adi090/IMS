package com.project.ims.services.impl

import com.project.ims.domain.entities.CustomerEntity
import com.project.ims.domain.entities.SupplierEntity
import com.project.ims.repositories.CustomerRepo
import com.project.ims.repositories.SupplierRepo
import com.project.ims.services.CustomerService
import com.project.ims.services.SupplierService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service


@Service
class CustomerServiceImpl(private val customerRepo: CustomerRepo): CustomerService {
    override fun create(customerEntity: CustomerEntity): CustomerEntity {
        return customerRepo.save(customerEntity)
    }

    override fun list(): List<CustomerEntity> {
        return customerRepo.findAll()
    }

    override fun get(id:Long): CustomerEntity?{
        return customerRepo.findByIdOrNull(id)
    }

    override fun update(id:Long,customerEntity: CustomerEntity): CustomerEntity {
        val updatedCustomer=customerEntity.copy(id=id)
        return customerRepo.save(updatedCustomer)
    }

    override fun delete(id:Long){
        customerRepo.deleteById(id)
    }

}