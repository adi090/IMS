package com.project.ims.repositories

import com.project.ims.domain.entities.OutgoingProductEntity
import org.springframework.data.jpa.repository.JpaRepository

interface OutgoingProdRepo:JpaRepository<OutgoingProductEntity,Long?> {
}