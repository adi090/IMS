package com.project.ims.repositories

import com.project.ims.domain.entities.CategoryEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CategoryRepo:JpaRepository<CategoryEntity,Long?> {
}