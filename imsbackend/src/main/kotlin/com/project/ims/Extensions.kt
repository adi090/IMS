package com.project.ims

import com.project.ims.domain.dto.*
import com.project.ims.domain.entities.*


fun CategoryEntity.toCategoryDto():CategoryDto{
    return CategoryDto(
        id=this.id,
      name=this.name,
     description=this.description,
        items = this.items.map { it.toItemDto() }

    )
}

//fun CategoryDto.toCategoryEntity():CategoryEntity{
//    return CategoryEntity(
//        id = this.id,
//        name = this.name,
//        description = this.description,
//        items = this.items.map { it.toItemEntity() }.toMutableList()
//
//    )
//}
fun CategoryDto.toCategoryEntity(): CategoryEntity {
    val categoryEntity = CategoryEntity(
        id = this.id,
        name = this.name,
        description = this.description
    )

    val itemEntities = this.items.map { it.toItemEntity(categoryEntity) }.toMutableList()
    categoryEntity.items = itemEntities

    return categoryEntity
}


fun ItemEntity.toItemDto(): ItemDto {
    return ItemDto(
        id = this.id,
        name = this.name,
        description = this.description,
        quantity = this.quantity,
        price = this.price,
        categoryId = this.category?.id
//        promo=this.promo
    )
}

//fun ItemDto.toItemEntity(): ItemEntity {
//    return ItemEntity(
//        id = this.id,
//        name = this.name,
//        description = this.description,
//        quantity = this.quantity,
//        price = this.price
//    )
//}
fun ItemDto.toItemEntity(category: CategoryEntity?): ItemEntity {
    return ItemEntity(
        id = this.id,
        name = this.name,
        description = this.description,
        quantity = this.quantity,
        price = this.price,
        category = category,
//        promo=this.promo
    )
}

fun SupplierDto.toSupplierEntity(): SupplierEntity {
    return SupplierEntity(
        id = this.id,
        name = this.name,
        address = this.address,
        email = this.email,
        phone = this.phone
    )
}
fun SupplierEntity.toSupplierDto(): SupplierDto {
    return SupplierDto(
        id = this.id,
        name = this.name,
        address = this.address,
        email = this.email,
        phone = this.phone
    )
}


fun CustomerDto.toCustomerEntity():CustomerEntity{
    return CustomerEntity(
        id = this.id,
        name = this.name,
        address = this.address,
        email = this.email,
        phone = this.phone
    )
}

fun CustomerEntity.toCustomerDto():CustomerDto{
    return CustomerDto(
        id = this.id,
        name = this.name,
        address = this.address,
        email = this.email,
        phone = this.phone
    )
}


fun OutgoingProductDto.toOutgoingProductEntity(item: ItemEntity, customer: CustomerEntity): OutgoingProductEntity {
    return OutgoingProductEntity(
        itemEntity = item,
        customerEntity = customer,
        quantity = this.quantity,
        date =this.date
    )
}

fun OutgoingProductEntity.toOutgoingProductDto(): OutgoingProductDto {
    return OutgoingProductDto(
        id=this.id,
        itemId = this.itemEntity.id,
        customerId = this.customerEntity.id,
        quantity = this.quantity,
        date = this.date
    )
}

fun PurchaseProductDto.toPurchaseProductEntity(item: ItemEntity, supplier: SupplierEntity): PurchaseProductEntity {
    return PurchaseProductEntity(
        itemEntity = item,
        supplierEntity = supplier,
        quantity = this.quantity,
        date =this.date
    )
}

fun PurchaseProductEntity.toPurchaseProductDto(): PurchaseProductDto {
    return PurchaseProductDto(
        id=this.id,
        itemId = this.itemEntity.id,
        supplierId = this.supplierEntity.id,
        quantity = this.quantity,
        date = this.date
    )
}
