
let getElement = (id) => {
    return document.getElementById(id)
}
let bringIntoView = (el) => {
    el.scrollIntoView({ behavior: "smooth", block: "center" })
}
let getDataFromServer = async (url) => {
    let res = await fetch(url)
    let data = await res.json()
    return data;
}

let loadingTemplate = `
    <div class="py-12 flex items-center justify-center">
    <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="black"></l-ring>
    </div>
`

let sidebar = getElement('sidebar')
let cart = getElement('cart')
let cardContainer = getElement('card-container')
let categoryContainer = getElement("categories")

let cardLoader = getElement('cardLoader')


let openSidebar = () => {
    sidebar.style.width = '66%'
}
let closeSidebar = () => {
    sidebar.style.width = '0'
}
let focusCart = () => {
    bringIntoView(cart)
}

let categoryTemplate = (categoryName) => ` <span class="shrink-0 "> ${categoryName}</span>`


let categoryUrl = 'https://openapi.programming-hero.com/api/categories'



let loadCategories = async () => {
    categoryContainer.innerHTML = ''
    let data = await getDataFromServer(categoryUrl);
    data.categories.forEach((category) => {
        categoryContainer.innerHTML += categoryTemplate(category.category_name)
    })

    let categories = [...categoryContainer.children]
    categories[0].classList.add('active')

    categories.forEach(el => {
        el.addEventListener('click', (e) => {
            categories.forEach((el) => {
                el.classList.remove('active')
            })
            cardLoader.style.display = 'flex'
            cardContainer.innerHTML = ''
            e.target.classList.add('active')
            let selectCategroyByIndex = categories.indexOf(e.target) + 1
            loadTreesByCategory(selectCategroyByIndex)
        })
    })

}


let cartArray = []

let addToCartArray = (id, name, price) => {
    let itemData = {
        id,
        name,
        price,
        quantity: 1,
        totalPrice: price
    }
    let addToCartArray = (id) => {
        let match = cartArray.find((item) => item.id == id)
        if (!match) {
            cartArray.push(itemData)
        } else {
            let matchedIndex = cartArray.indexOf(match)
            let matchedItem = cartArray[matchedIndex]
            matchedItem['quantity'] += 1
            matchedItem['totalPrice'] = matchedItem.quantity * matchedItem.price
        }
    }
    addToCartArray(id)
    totalPrice()
}

let totalPrice = () => {
    let priceArray = cartArray.map(item => item.totalPrice).reduce((a,b)=> a+b , 0)
    console.log(priceArray);
}

let treeCardTemplate = (data) => {
    let { id, image, name, description, price, category } = data
    return `
  <div class="bg-white p-4 space-y-4 rounded-md"> 
        <div class="w-full aspect-video">
            <img src=${image} class="w-full h-full object-cover rounded-lg" alt="">
        </div>
        <div class="space-y-4">
            <h2 class="text-xl font-bold"> ${name}</h2>
            <p class="text-gray-500 text-sm md:text-md">
                ${description}
            </p>
            <div class="flex items-center justify-between text-lg">
                <span class="text-green-700 bg-green-light rounded-full p-2 px-4"> ${category}</span>
                <p>৳${price}</p>
            </div>
            <button onclick="addToCartArray(${id},'${name}',${price})" class="bg-green-dark py-3 text-white w-full rounded-full text-lg">
                Add to Cart
            </button>
        </div>
    </div>
  `
}

let loadTreesByCategory = async (id) => {
    let treeUrl = `https://openapi.programming-hero.com/api/category/${id}`
    let data = await getDataFromServer(treeUrl)
    cardContainer.innerHTML = ''
    cardLoader.style.display = 'none'
    data.plants.forEach(plant => {
        cardContainer.innerHTML += treeCardTemplate(plant)
    })
}

loadCategories()
loadTreesByCategory(1)