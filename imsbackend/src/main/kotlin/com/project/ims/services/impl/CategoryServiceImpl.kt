package com.project.ims.services.impl

import com.project.ims.services.CategoryService
import com.project.ims.domain.entities.CategoryEntity
import com.project.ims.repositories.CategoryRepo
import org.springframework.stereotype.Service

@Service
class CategoryServiceImpl (val categoryrepo: CategoryRepo):CategoryService {
    override fun create(categoryEntity: CategoryEntity): CategoryEntity {
         return    categoryrepo.save(categoryEntity)
    }

    override fun list(): List<CategoryEntity> {
       return  categoryrepo.findAll()
    }


    override fun update(id: Long, categoryEntity: CategoryEntity): CategoryEntity {
        var existing = categoryrepo.findById(id).orElseThrow {
            RuntimeException("Category not found")
        }

        existing.name = categoryEntity.name
        existing.description = categoryEntity.description
//        existing.items = categoryEntity.items

        return categoryrepo.save(existing)
    }

    override fun delete(id:Long){
        categoryrepo.deleteById(id)
    }

}