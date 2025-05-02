package com.project.ims.domain.entities

import jakarta.persistence.*


@Entity
@Table(name = "suppliers")
data class SupplierEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    var name:String,
    var address:String,
    var email:String,
    var phone:Long
)
