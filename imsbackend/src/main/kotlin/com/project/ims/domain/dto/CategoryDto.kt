package com.project.ims.domain.dto

import com.project.ims.domain.entities.ItemEntity

data class CategoryDto (
    val id: Long = 0,
    val name: String,
    val description: String? = null,
    val items: List<ItemDto>
    )