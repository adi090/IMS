package com.project.ims.domain.entities

import jakarta.persistence.*


@Entity
@Table(name="users")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id:Long=0,
    val name:String,
    val role:String,
    val email:String,
    val password:String,


)
