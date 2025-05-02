package com.project.ims.services

import com.project.ims.domain.entities.CustomerEntity


interface CustomerService {
    fun create(customerEntity: CustomerEntity): CustomerEntity


    fun  list():List<CustomerEntity>

    fun get(id: Long): CustomerEntity?
    fun update(id:Long,supplierEntity: CustomerEntity): CustomerEntity

    fun delete(id:Long)
}