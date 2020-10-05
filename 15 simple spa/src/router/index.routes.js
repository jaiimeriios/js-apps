import Home from '../views/home'
let content = document.querySelector('#root')

const router = (route) => {

    content.innerHTML = ''

    switch (route) {
        case '': {
            return content.appendChild(Home())
        }
        case '#/': {
            return content.appendChild(Home())
        }
        case '#/post':
            return console.log('Post')
        case '#/products':
            return console.log('Products')
        default:
            return console.log('404')
    }

}

export { router }