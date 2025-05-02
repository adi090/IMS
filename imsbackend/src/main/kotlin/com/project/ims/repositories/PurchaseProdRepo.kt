package com.project.ims.repositories

import com.project.ims.domain.entities.PurchaseProductEntity
import org.springframework.data.jpa.repository.JpaRepository

interface PurchaseProdRepo:JpaRepository<PurchaseProductEntity,Long?> {
}