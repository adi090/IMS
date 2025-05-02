package com.project.ims.domain.entities

import jakarta.persistence.*

@Entity
@Table(name = "items")
data class ItemEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="item_id_seq")
    @SequenceGenerator(name = "item_id_seq", sequenceName = "item_id_seq", allocationSize = 1)

    val id: Long = 0,

    val name: String,

    val description: String? = null,

    var quantity: Int = 0,

    val price: Double = 0.0,
//    val promo:String?=null,
//    @OneToMany(mappedBy = "item")
//    val transactions: List<TransactionEntity> = listOf(),
    @ManyToOne
    @JoinColumn(name = "category_id")
    val category: CategoryEntity? = null

)

