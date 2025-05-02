package com.project.ims.controllers

import com.project.ims.domain.dto.ItemDto
import com.project.ims.domain.dto.RequestDto
import com.project.ims.repositories.CategoryRepo
import com.project.ims.services.ItemService
import com.project.ims.toItemDto
import com.project.ims.toItemEntity
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping(path=["/items"])
class ItemsController(private  val itemService: ItemService,private val categoryRepo: CategoryRepo) {

     @PostMapping
     fun createItem(@RequestBody itemDto:ItemDto):ResponseEntity<ItemDto>{
         val category = categoryRepo.findById(itemDto.categoryId!!)
             .orElseThrow { RuntimeException("Category not found for id: ${itemDto.categoryId}") }

//         val itemEntity = itemDto.toItemEntity(category)

         val createdItem= itemService.create(itemDto.toItemEntity(category)).toItemDto()
         return ResponseEntity(
             createdItem, HttpStatus.CREATED)
     }

    @GetMapping
    fun list():List<ItemDto>{
        return itemService.list().map{it.toItemDto()}
    }

    @GetMapping(path=["/{id}"])
    fun getItem(@PathVariable("id")id:Long):ResponseEntity<ItemDto>{
//        return itemService.get(id).toItemDto()
        val foundItem=itemService.get(id)?.toItemDto()

        foundItem?.let {
            return ResponseEntity(it,HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)

    }

    @PutMapping(path=["/{id}"])
    fun update(@PathVariable("id")id:Long,@RequestBody itemDto:ItemDto):ResponseEntity<ItemDto>{
        val category = categoryRepo.findById(itemDto.categoryId!!)
            .orElseThrow { RuntimeException("Category not found for id: ${itemDto.categoryId}") }

        val updatedItem=itemService.update(id,itemDto.toItemEntity(category)).toItemDto()
        return ResponseEntity(updatedItem,HttpStatus.OK)

    }

    @DeleteMapping(path=["/{id}"])
    fun delete(@PathVariable("id")id:Long){
        itemService.delete(id)
    }



     }



