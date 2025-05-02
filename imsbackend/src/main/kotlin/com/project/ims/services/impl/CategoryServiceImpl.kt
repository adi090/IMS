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
//
    override fun list(): List<CategoryEntity> {
       return  categoryrepo.findAll()
    }
//
//    override fun get(id: Long): AuthorEntity? {
//        TODO("Not yet implemented")
//    }
//
//    override fun fullUpdate(id: Long, authorEntity: AuthorEntity): AuthorEntity {
//        TODO("Not yet implemented")
//    }
}