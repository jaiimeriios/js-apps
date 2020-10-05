export default () => {
    const views = `
        <h1>Hello World</h1>
        <p>Lorem Ipsum Dolor Sit Amet</p>
    `

    const divElement = document.createElement('div')
    divElement.classList = 'text-white'
    divElement.innerHTML = views

    return divElement
}