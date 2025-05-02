package com.project.ims.repositories

import com.project.ims.domain.entities.CustomerEntity
import org.springframework.data.jpa.repository.JpaRepository

interface CustomerRepo:JpaRepository<CustomerEntity,Long?> {

}