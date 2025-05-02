package com.project.ims.controllers

import com.project.ims.domain.dto.CategoryDto
import com.project.ims.domain.dto.SupplierDto
import com.project.ims.domain.entities.CategoryEntity
import com.project.ims.services.SupplierService
import com.project.ims.toCategoryDto
import com.project.ims.toCategoryEntity
import com.project.ims.toSupplierDto
import com.project.ims.toSupplierEntity
import jakarta.persistence.Entity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.function.EntityResponse

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping(path=["/supplier"])
class SupplierController(private val supplierService: SupplierService) {

    @PostMapping
    fun createSupplier(@RequestBody supplierDto: SupplierDto): ResponseEntity<SupplierDto> {
        try {
            val supplier=  supplierService.create(
                supplierDto.toSupplierEntity()
            ) .toSupplierDto()
            return ResponseEntity(supplier, HttpStatus.CREATED)
        } catch (e: IllegalArgumentException ) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }

    }

    @GetMapping
    fun listSupplier():List<SupplierDto>{
        return supplierService.list().map{it.toSupplierDto()}

    }


     @GetMapping(path=["/{id}"])
     fun supplier(@PathVariable("id") id:Long): SupplierDto {
         println("Fetching supplier with id: $id")
         return supplierService.get(id)!!.toSupplierDto()
     }


    @PutMapping(path=["/{id}"])
    fun updateSupplier(@PathVariable("id") id:Long,@RequestBody supplierDto: SupplierDto):ResponseEntity<SupplierDto>{
        val updatedSupplier= supplierService.update(id,supplierDto.toSupplierEntity())
        return  ResponseEntity(updatedSupplier.toSupplierDto(),HttpStatus.OK)
    }

    @DeleteMapping(path=["/{id}"])
    fun deleteSupplier(@PathVariable ("id") id:Long){
        supplierService.delete(id)
    }
}