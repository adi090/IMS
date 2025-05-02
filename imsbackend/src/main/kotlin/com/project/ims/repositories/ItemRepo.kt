package com.project.ims.repositories

import com.project.ims.domain.entities.ItemEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ItemRepo:JpaRepository<ItemEntity,Long?> {
}