package com.project.ims.domain.entities

import jakarta.persistence.*


@Entity
@Table(name = "customers")
data class CustomerEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    var name:String,
    var address:String,
    var email:String,
    var phone:Long
)
