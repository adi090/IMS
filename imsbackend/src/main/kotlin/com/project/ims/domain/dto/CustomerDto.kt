package com.project.ims.domain.dto

data class CustomerDto (
    var id:Long=0,
    var name:String,
    var address:String,
    var email:String,
    var phone:Long
)