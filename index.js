let getElement = (id) => {
    return document.getElementById(id)
}
let bringIntoView = (el) => {
    el.scrollIntoView({ behavior: "smooth", block: "center" })
}

let sidebar = getElement('sidebar')
let cart = getElement('cart')

let openSidebar = () => {
    sidebar.style.width = '66%'
}
let closeSidebar = () => {
    sidebar.style.width = '0'
}

let focusCart = () => {
    bringIntoView(cart)
}