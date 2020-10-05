import views from '../views/404.html'

const NotFound = () => {

    const divElement = document.createElement('div')
    divElement.innerHTML = views

    return divElement
}

export default NotFound