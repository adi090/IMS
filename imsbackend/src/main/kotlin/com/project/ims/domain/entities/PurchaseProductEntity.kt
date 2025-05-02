package com.project.ims.domain.entities

import jakarta.persistence.*


@Entity
@Table(name = "purchase-product")
data class PurchaseProductEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    val itemEntity: ItemEntity,

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    val supplierEntity: SupplierEntity,

    var quantity:Int,

    @Temporal(TemporalType.DATE)
    var date: java.util.Date
)
