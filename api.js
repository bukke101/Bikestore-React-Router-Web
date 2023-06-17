export async function getProducts(){
    const res = await fetch("/api/products")
    if (!res.ok) {
        throw {
            message: "Failed to fetch Products", 
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.products
}