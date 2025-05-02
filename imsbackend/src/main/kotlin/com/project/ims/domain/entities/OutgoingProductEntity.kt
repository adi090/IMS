package com.project.ims.domain.entities

import jakarta.persistence.*


@Entity
@Table(name = "outgoingProduct")
data class OutgoingProductEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    val itemEntity: ItemEntity,

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    val customerEntity: CustomerEntity,

    var quantity:Int,
    @Temporal(TemporalType.DATE)
    var date: java.util.Date
)
