package com.project.ims

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ImsApplication

fun main(args: Array<String>) {
	runApplication<ImsApplication>(*args)
}
