package com.project.ims.repositories

import com.project.ims.domain.entities.SupplierEntity
import org.springframework.data.jpa.repository.JpaRepository

interface SupplierRepo:JpaRepository<SupplierEntity,Long?> {
}