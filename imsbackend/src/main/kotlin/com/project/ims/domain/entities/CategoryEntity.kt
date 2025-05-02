package com.project.ims.domain.entities

import jakarta.persistence.*

@Entity
@Table(name = "categories")
data class CategoryEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,

    val description: String? = null,

    @OneToMany(mappedBy = "category", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val items: MutableList<ItemEntity> = mutableListOf()
)
