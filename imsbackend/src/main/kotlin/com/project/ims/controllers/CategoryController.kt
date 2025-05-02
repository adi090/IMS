package com.project.ims.controllers

import com.project.ims.domain.dto.CategoryDto
import com.project.ims.services.CategoryService
import com.project.ims.toCategoryDto
import com.project.ims.toCategoryEntity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


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
}