package com.project.ims.controllers

import com.project.ims.*
import com.project.ims.domain.dto.CategoryDto
import com.project.ims.domain.dto.OutgoingProductDto
import com.project.ims.domain.dto.SupplierDto
import com.project.ims.domain.entities.CategoryEntity
import com.project.ims.repositories.CustomerRepo
import com.project.ims.repositories.ItemRepo
import com.project.ims.services.OutgoingService
import com.project.ims.services.SupplierService
import jakarta.persistence.Entity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.function.EntityResponse

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping(path=["/outgoing"])
class OutgoingController(private val outgoingService: OutgoingService,private val itemRepo: ItemRepo,private val customerRepo: CustomerRepo) {

    @PostMapping
    fun createOutgoingProduct(@RequestBody outgoingProductDto: OutgoingProductDto): ResponseEntity<OutgoingProductDto> {
        val item = itemRepo.findById(outgoingProductDto.itemId)
            .orElseThrow { RuntimeException("Item not found") }

        val customer = customerRepo.findById(outgoingProductDto.customerId)
            .orElseThrow { RuntimeException("Customer not found") }

        val outgoingProduct = outgoingProductDto.toOutgoingProductEntity(item, customer)

     val outgoingProd=   outgoingService.create(outgoingProduct)
      return ResponseEntity(outgoingProd.toOutgoingProductDto(),HttpStatus.CREATED)

    }

    @GetMapping
    fun listOutgoingProduct():List<OutgoingProductDto>{
        return outgoingService.list().map{it.toOutgoingProductDto()}

    }


    @GetMapping(path=["/{id}"])
    fun OutgoingProduct(@PathVariable("id") id:Long): OutgoingProductDto {
        println("Fetching supplier with id: $id")
        return outgoingService.get(id)!!.toOutgoingProductDto()
    }


    @PutMapping(path=["/{id}"])
    fun updateOutgoingProduct(@PathVariable("id") id:Long,@RequestBody outgoingProductDto: OutgoingProductDto):ResponseEntity<OutgoingProductDto>{
        val item = itemRepo.findById(outgoingProductDto.itemId)
            .orElseThrow { RuntimeException("Item not found") }

        val customer = customerRepo.findById(outgoingProductDto.customerId)
            .orElseThrow { RuntimeException("Customer not found") }
        val updatedOutgoingProduct= outgoingService.update(id,outgoingProductDto.toOutgoingProductEntity(item,customer))
        return  ResponseEntity(updatedOutgoingProduct.toOutgoingProductDto(),HttpStatus.OK)
    }

    @DeleteMapping(path=["/{id}"])
    fun deleteOutgoingProduct(@PathVariable ("id") id:Long){
        outgoingService.delete(id)
    }
}