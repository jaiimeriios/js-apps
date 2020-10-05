import views from '../views/posts.html'

const getPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return await response.json()
}

const Posts = async () => {

    const divElement = document.createElement('div')
    divElement.innerHTML = views
    
    const posts = await getPosts()
    const postElements = divElement.querySelector('#posts')

    divElement.querySelector('#totalPosts').innerHTML = posts.length

    posts.forEach((element) => {
        postElements.innerHTML += `
        <li class="list-group-item border-info bg-dark text-white p-4">
            <h5> <span class="bg-info px-1">${element.id}</span> ${element.title}</h5>
            <p>${element.body}</p>
        </li>
        `
    });

    return divElement
}

export default Posts