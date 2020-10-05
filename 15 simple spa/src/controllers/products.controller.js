import views from '../views/products.html'

const Products = () => {

    const divElement = document.createElement('div')
    divElement.innerHTML = views

    return divElement
}

export default Products