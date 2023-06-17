import { createServer, Model, Response } from "miragejs"


createServer({
    models: {
        products: Model,
    },

    seeds(server) {
        server.create("product", { id: "1", userId: "456", name: "Badlands", price: 300, description: "desc", image: "https://www.zenwebcart.com/user_data/images/products/alive/Badlands/alive-badlands_gry02.jpg", color: "grey", brand: "Alive", category: "frames" })
        server.create("product", { id: "2", userId: "123", name: "LPL", price: 320, description: "desc", image: "https://crucialbmxshop.com/media/catalog/product/cache/f67f05e4d31cd8e88ffb2a91d2eddda2/1/4/143484785.jpg", color: "black", brand: "Alive", category: "frames" })
        server.create("product", { id: "3", userId: "123", name: "Grad Type", price: 320, description: "desc", image: "https://crucialbmxshop.com/media/catalog/product/cache/f67f05e4d31cd8e88ffb2a91d2eddda2/1/4/143484418.jpg", color: "black", brand: "Alive", category: "frames" })
        server.create("product", { id: "4", userId: "123", name: "ISM V2", price: 220, description: "desc", image: "https://cdn.shopify.com/s/files/1/0222/8387/8464/products/1e69d880-58d4-4f80-8e2b-e3aed30529b7_1512x.jpg?v=1665746990", color: "black", brand: "Stranger", category: "frames" })
        server.create("product", { id: "5", userId: "123", name: "Royale", price: 220, description: "desc", image: "https://cdn.shopify.com/s/files/1/0222/8387/8464/products/263b7c34-deae-491b-b41e-bad7b1a65c17_1512x.jpg?v=1664974001", color: "raw", brand: "Stranger", category: "frames" })
        server.create("product", { id: "6", userId: "456", name: "Survive", price: 60, description: "desc", image: "https://cdn.shopify.com/s/files/1/0605/8351/0230/products/ALIVEINDUSTRY-SurviveBars-Black_1980x.jpg?v=1659524782", color: "black", brand: "Alive", category: "handlebars" })
        server.create("product", { id: "7", userId: "456", name: "TG2000", price: 70, description: "desc", image: "https://cdn.shopify.com/s/files/1/0605/8351/0230/products/ALIVEINDUSTRY-TG20004PCBars-Black_900x.jpg?v=1659519671", color: "black", brand: "Alive", category: "handlebars" })
        server.create("product", { id: "8", userId: "456", name: "Come Over", price: 50, description: "desc", image: "https://cdn.shopify.com/s/files/1/1097/3280/products/come-over-bar-1_1024x1024.jpg?v=1586539639", color: "black", brand: "Stranger", category: "handlebars" })
        server.create("product", { id: "9", userId: "456", name: "Nasbar", price: 50, description: "desc", image: "https://cdn.shopify.com/s/files/1/1097/3280/products/stranger-churchill-bar-site_1024x1024.jpg?v=1575173341", color: "black", brand: "Stranger", category: "handlebars" })
    
    },

    routes() {
        this.namespace = "api"
        this.logging = false

        this.get("/products", (schema, request) => {
            // return new Response(400, {}, {error: "Error fetching data"})
            return schema.products.all()
        })
        
        this.get("/products/:id", (schema, request) => {
            const id = request.params.id
            return schema.products.find(id)
        })


        this.get("/admin/products", (schema, request) => {
            // Hard-code the hostId for now
            return schema.products.where({ userId: "123" })
        })

        this.get("/admin/products/:id", (schema, request) => {
            // Hard-code the hostId for now
            const id = request.params.id
            return schema.products.findBy({ id, userId: "123" })
        })
    }
})