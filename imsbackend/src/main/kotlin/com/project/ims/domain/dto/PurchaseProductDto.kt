package com.project.ims.domain.dto

import java.util.*

data class PurchaseProductDto (
    var id:Long,
    var itemId:Long,
    var supplierId:Long,
    var quantity:Int,
    var date: Date

)