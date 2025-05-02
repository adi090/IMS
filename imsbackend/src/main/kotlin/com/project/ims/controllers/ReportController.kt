package com.project.ims.controllers

import com.lowagie.text.*
import com.lowagie.text.pdf.PdfPTable
import com.lowagie.text.pdf.PdfWriter
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.awt.Font
import com.lowagie.text.Document
import java.time.LocalDateTime
//import com.lowagie.text.Font
import com.lowagie.text.FontFactory
import com.project.ims.repositories.ItemRepo
import com.project.ims.services.OutgoingService
import com.project.ims.services.PurchaseService
import com.project.ims.toOutgoingProductDto
import com.project.ims.toPurchaseProductDto
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin(origins = ["http://localhost:5173"])

@RestController
class ReportController(private val outgoingService: OutgoingService,private val itemRepo: ItemRepo,private val purchaseService: PurchaseService) {

    @GetMapping("/download-report")
    fun downloadPdfReport(response: HttpServletResponse) {
        response.contentType = "application/pdf"
        response.setHeader("Content-Disposition", "attachment; filename=inventory-report.pdf")

        val document = Document()
        PdfWriter.getInstance(document, response.outputStream)
        document.open()

        // Title
        val titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20f)
        document.add(Paragraph("Inventory Management System Report", titleFont))
        document.add(Paragraph("Generated on: ${LocalDateTime.now()}"))
        document.add(Paragraph("\n\n"))  // Space

        // Outgoing Items Section
        document.add(Paragraph("📤 Outgoing Items",FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20f)))
        document.add(Paragraph("\n"))

        val outgoingItems = fetchOutgoingItems()
        if (outgoingItems.isNotEmpty()) {
            document.add(createTable(outgoingItems))
        } else {
            document.add(Paragraph("No outgoing items found."))
        }

        document.add(Paragraph("\n\n"))  // Space

        // Purchased Items Section
        document.add(Paragraph("📥 Purchased (Restocked) Items", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20f)))
        document.add(Paragraph("\n"))

        val purchasedItems = fetchPurchasedItems()
        if (purchasedItems.isNotEmpty()) {
            document.add(createTable(purchasedItems))
        } else {
            document.add(Paragraph("No purchased items found."))
        }

        document.close()
    }

    private fun createTable(items: List<InventoryItem>): PdfPTable {
        val table = PdfPTable(3) // 3 columns
        table.widthPercentage = 100f

        table.addCell("Item Name")
        table.addCell("Quantity")
        table.addCell("Date")

        for (item in items) {
            table.addCell(item.name)
            table.addCell(item.quantity.toString())
            table.addCell(item.date.toString())
        }
        return table
    }

    private fun fetchOutgoingItems(): List<InventoryItem> {
        val outgoingProducts = outgoingService.list().map{it.toOutgoingProductDto()}

        return outgoingProducts.map {
            val item = itemRepo.findById(it.itemId)
                .orElseThrow { RuntimeException("Item not found for ID: ${it.itemId}") }

            InventoryItem(
                name = item.name,
                quantity = it.quantity,
                date = it.date.toString()
            )
        }
    }


    private fun fetchPurchasedItems(): List<InventoryItem> {
       val purchasedItems=purchaseService.list().map{it.toPurchaseProductDto()}
        return purchasedItems.map{
            val item = itemRepo.findById(it.itemId)
                .orElseThrow { RuntimeException("Item not found for ID: ${it.itemId}") }
            InventoryItem(
                name=item.name,
                quantity = it.quantity,
                date = it.date.toString()
            )
        }
    }

    data class InventoryItem(val name: String, val quantity: Int, val date: String)
}
