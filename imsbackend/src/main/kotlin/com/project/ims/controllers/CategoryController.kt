package com.project.ims.controllers

import com.project.ims.domain.dto.CategoryDto
import com.project.ims.domain.entities.CategoryEntity
import com.project.ims.services.CategoryService
import com.project.ims.toCategoryDto
import com.project.ims.toCategoryEntity
import jakarta.persistence.Entity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.function.EntityResponse

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping(path=["/categories"])
class CategoryController(private val categoryService: CategoryService) {

    @PostMapping
    fun createCategory(@RequestBody categoryDto: CategoryDto): ResponseEntity<CategoryDto> {
        try {
            val category=  categoryService.create(
                categoryDto.toCategoryEntity()
            ) .toCategoryDto()
            return ResponseEntity(category, HttpStatus.CREATED)
        } catch (e: IllegalArgumentException ) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }

    }

    @GetMapping
    fun listCategory():List<CategoryDto>{
        return categoryService.list().map{it.toCategoryDto()}

    }




    @PutMapping(path=["/{id}"])
    fun updateCategory(@PathVariable("id") id:Long,@RequestBody categoryDto: CategoryDto):ResponseEntity<CategoryDto>{
       val updatedCategory= categoryService.update(id,categoryDto.toCategoryEntity())
       return  ResponseEntity(updatedCategory.toCategoryDto(),HttpStatus.OK)
    }

    @DeleteMapping(path=["/{id}"])
    fun deleteCategory(@PathVariable ("id") id:Long){
        categoryService.delete(id)
    }
}