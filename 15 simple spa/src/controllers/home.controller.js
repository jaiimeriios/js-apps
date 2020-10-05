import views from '../views/home.html'

const Home = () => {

    const divElement = document.createElement('div')
    divElement.innerHTML = views

    divElement.querySelector('#btnClick').addEventListener('click', () => {
        console.log('asdf')
    })

    return divElement
}

export default Home