import views from '../views/posts.html'

const Posts = () => {

    const divElement = document.createElement('div')
    divElement.innerHTML = views

    return divElement
}

export default Posts