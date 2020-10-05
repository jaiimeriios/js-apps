import { pages } from '../controllers/index'
let content = document.querySelector('#root')

const router = async (route) => {

    content.innerHTML = ''

    switch (route) {
        case '': {
            return content.appendChild(pages.home())
        }
        case '#/': {
            return content.appendChild(pages.home())
        }
        case '#/posts': {
            return content.appendChild(await pages.posts())
        }
        case '#/products': {
            return content.appendChild(pages.products())
        }
        default: {
            return content.appendChild(pages.notFound())
        }
    }
}

export { router }