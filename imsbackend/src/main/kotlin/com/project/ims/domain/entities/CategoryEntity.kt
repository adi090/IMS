package com.project.ims.domain.entities

import jakarta.persistence.*

@Entity
@Table(name = "categories")
data class CategoryEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var name: String,

    var description: String? = null,

    @OneToMany(mappedBy = "category", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    var items: MutableList<ItemEntity> = mutableListOf()
)
