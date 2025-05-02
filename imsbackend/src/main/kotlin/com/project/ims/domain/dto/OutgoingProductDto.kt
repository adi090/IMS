package com.project.ims.domain.dto

import java.util.*

data class OutgoingProductDto (
    var id:Long,
    var itemId:Long,
    var customerId:Long,
    var quantity:Int,
    var date: Date

)