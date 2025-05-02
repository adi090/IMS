package com.project.ims.controllers

import com.project.ims.*
import com.project.ims.domain.dto.CategoryDto
import com.project.ims.domain.dto.OutgoingProductDto
import com.project.ims.domain.dto.PurchaseProductDto
import com.project.ims.domain.dto.SupplierDto
import com.project.ims.domain.entities.CategoryEntity
import com.project.ims.domain.entities.PurchaseProductEntity
import com.project.ims.repositories.CustomerRepo
import com.project.ims.repositories.ItemRepo
import com.project.ims.repositories.SupplierRepo
import com.project.ims.services.OutgoingService
import com.project.ims.services.PurchaseService
import com.project.ims.services.SupplierService
import jakarta.persistence.Entity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.function.EntityResponse

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping(path=["/purchase"])
class PurchaseController(private val purchaseService: PurchaseService,private val itemRepo: ItemRepo,private val supplierRepo: SupplierRepo) {

    @PostMapping
    fun createPurchaseProduct(@RequestBody purchaseProductDto: PurchaseProductDto): ResponseEntity<PurchaseProductDto> {
        val item = itemRepo.findById(purchaseProductDto.itemId)
            .orElseThrow { RuntimeException("Item not found") }

        val supplier = supplierRepo.findById(purchaseProductDto.supplierId)
            .orElseThrow { RuntimeException("Customer not found") }

        val purchaseProduct = purchaseProductDto.toPurchaseProductEntity(item, supplier)

        val outgoingProd=   purchaseService.create(purchaseProduct)
        return ResponseEntity(purchaseProduct.toPurchaseProductDto(),HttpStatus.CREATED)

    }

    @GetMapping
    fun listPurchaseProduct():List<PurchaseProductDto>{

        return purchaseService.list().map{it.toPurchaseProductDto()}

    }


    @GetMapping(path=["/{id}"])
    fun PurchaseProduct(@PathVariable("id") id:Long): PurchaseProductDto {
        println("Fetching product with id: $id")
        return purchaseService.get(id)!!.toPurchaseProductDto()
    }


    @PutMapping(path=["/{id}"])
    fun updatePurchaseProduct(@PathVariable("id") id:Long,@RequestBody purchaseProductDto: PurchaseProductDto):ResponseEntity<PurchaseProductDto>{
        val item = itemRepo.findById(purchaseProductDto.itemId)
            .orElseThrow { RuntimeException("Item not found") }

        val supplier = supplierRepo.findById(purchaseProductDto.supplierId)
            .orElseThrow { RuntimeException("Supplier not found") }
        val updatedPurchaseProduct= purchaseService.update(id,purchaseProductDto.toPurchaseProductEntity(item,supplier))
        return  ResponseEntity(updatedPurchaseProduct.toPurchaseProductDto(),HttpStatus.OK)
    }

    @DeleteMapping(path=["/{id}"])
    fun deletePurchaseProduct(@PathVariable ("id") id:Long){
        purchaseService.delete(id)
    }
}