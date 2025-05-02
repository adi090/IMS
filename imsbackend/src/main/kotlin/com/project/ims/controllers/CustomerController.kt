package com.project.ims.controllers

import com.project.ims.*

import com.project.ims.domain.dto.CustomerDto
import com.project.ims.domain.dto.SupplierDto
import com.project.ims.services.CustomerService

import jakarta.persistence.Entity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.function.EntityResponse

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping(path=["/customer"])
class CustomerController(private val customerService: CustomerService) {

    @PostMapping
    fun createCustomer(@RequestBody customerDto: CustomerDto): ResponseEntity<CustomerDto> {
        try {
            val supplier=  customerService.create(
                customerDto.toCustomerEntity()
            ) .toCustomerDto()
            return ResponseEntity(supplier, HttpStatus.CREATED)
        } catch (e: IllegalArgumentException ) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }

    }

    @GetMapping
    fun listCustomer():List<CustomerDto>{
        return customerService.list().map{it.toCustomerDto()}

    }


    @GetMapping(path=["/{id}"])
    fun customer(@PathVariable("id") id:Long): CustomerDto {
        println("Fetching customer with id: $id")
        return customerService.get(id)!!.toCustomerDto()
    }


    @PutMapping(path=["/{id}"])
    fun updateCustomer(@PathVariable("id") id:Long,@RequestBody customerDto: CustomerDto):ResponseEntity<CustomerDto>{
        val updatedCustomer= customerService.update(id,customerDto.toCustomerEntity())
        return  ResponseEntity(updatedCustomer.toCustomerDto(),HttpStatus.OK)
    }

    @DeleteMapping(path=["/{id}"])
    fun deleteCustomer(@PathVariable ("id") id:Long){
        customerService.delete(id)
    }
}