package com.project.ims

import com.project.ims.domain.entities.CategoryEntity
import com.project.ims.domain.dto.CategoryDto
import com.project.ims.domain.entities.ItemEntity
import com.project.ims.domain.dto.ItemDto
fun CategoryEntity.toCategoryDto():CategoryDto{
    return CategoryDto(
        id=this.id,
      name=this.name,
     description=this.description,
        items = this.items.map { it.toItemDto() }

    )
}

fun CategoryDto.toCategoryEntity():CategoryEntity{
    return CategoryEntity(
        id = this.id,
        name = this.name,
        description = this.description,

        items = this.items.map { it.toItemEntity() }.toMutableList()
    )
}

fun ItemEntity.toItemDto(): ItemDto {
    return ItemDto(
        id = this.id,
        name = this.name,
        description = this.description,
        quantity = this.quantity,
        price = this.price
    )
}

fun ItemDto.toItemEntity(): ItemEntity {
    return ItemEntity(
        id = this.id,
        name = this.name,
        description = this.description,
        quantity = this.quantity,
        price = this.price
    )
}
