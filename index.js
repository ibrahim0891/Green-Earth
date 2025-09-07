
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
let totalPriceDisplay = getElement('total-price')
let cartCount = getElement('cart-count')


let openSidebar = () => {
    sidebar.style.width = '66%'
}
let closeSidebar = () => {
    sidebar.style.width = '0'
}
let focusCart = (e) => {  
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
            setTimeout(() => {
                loadTreesByCategory(selectCategroyByIndex)
            }, 1500);
        })
    })

}


let cartTemplate = (data) => {
    let { id, name, price, quantity, totalPrice } = data
    // console.log(data);
    return `
  <div class="bg-green-50 rounded-md p-4 flex items-center justify-between">
    <div>
        <h4 class="text-xl font-semibold"> ${name}</h4>
        <p>
            ৳${price} × ${quantity} = ${totalPrice}
        </p>
    </div>
    <button class="p-2 bg-red-50" onclick='deleteItem(${id})'>
        <i class="ph ph-x"></i>
    </button>
</div>
  `
}

let emptyCartTemplate = `
    <div>
        <img src="https://cdn2.iconfinder.com/data/icons/scenes-19/1000/e-commerce___online_shopping_buy_purchase_empty_cart_order-512.png" class="w-48 m-auto" alt="">
        <p class="text-center text-lg font-semibold my-12 text-black"> Cart is Empty</p>
    </div>
`

let cartArray = []

let deleteItem = (id) => {
    let targetElementIndex = cartArray.indexOf(cartArray.find(item => item.id == id ))
    cartArray.splice(targetElementIndex , 1)
    reRenderCart()
}

let reRenderCart = () => {
    cart.innerHTML = ''
    cartArray.forEach(el => {
        cart.innerHTML += cartTemplate(el)
    })
    totalPriceDisplay.innerText = totalPrice()
    cartCount.innerText = cartArray.length
    cartArray.length == 0 && (cart.innerHTML = emptyCartTemplate)

}
let addToCartArray = (data) => {
    let match = cartArray.find((item) => item.id == data.id)
    if (!match) {
        cartArray.unshift(data)
        cart.innerHTML += cartTemplate(data)
        totalPriceDisplay.innerText = totalPrice()
    } else {
        let matchedIndex = cartArray.indexOf(match)
        let matchedItem = cartArray[matchedIndex]
        matchedItem['quantity'] += 1
        matchedItem['totalPrice'] = matchedItem.quantity * matchedItem.price
        reRenderCart()
    }
}
let addToCart = (id, name, price) => {
    let itemData = {
        id,
        name,
        price,
        quantity: 1,
        totalPrice: price
    }
    addToCartArray(itemData) 
    reRenderCart()
}

let totalPrice = () => {
    let price = cartArray.map(item => item.totalPrice).reduce((a, b) => a + b, 0)
    return price
}

let treeCardTemplate = (data) => {
    let { id, image, name, description, price, category } = data
    return `
  <div class="bg-white p-6 rounded-xl space-y-4 rounded-md"> 
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
            <button onclick="addToCart(${id},'${name}',${price})" class="bg-green-dark py-3 text-white w-full rounded-full text-lg transition-all active:scale-90">
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