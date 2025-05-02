package com.project.ims.services


import com.project.ims.domain.entities.CategoryEntity
import org.springframework.stereotype.Service


interface CategoryService {
    fun create(categoryEntity: CategoryEntity):CategoryEntity


    fun list():List<CategoryEntity>
//
//    fun get(id: Long): CategoryEntity?
//
//    fun fullUpdate(id:Long,CategoryEntity: CategoryEntity):CategoryEntity
}