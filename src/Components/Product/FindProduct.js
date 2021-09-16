export const FindProduct = (id, name, products) => {
    return products && products.filter(product => {
        return product.id === id && product.name.split(" ").join("-") === name
    })[0]
}