package com.project.ims.domain.dto

import com.project.ims.domain.entities.CategoryEntity

data class ItemDto (
    val id: Long = 0,
    val name: String,
    val description: String? = null,
    val quantity: Int = 0,
    val price: Double = 0.0,
    val category: CategoryEntity? = null

)