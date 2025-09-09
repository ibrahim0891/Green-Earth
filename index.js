

let getElement = (id) => {
    return document.getElementById(id)
}
let bringIntoView = (el) => {
    el.scrollIntoView({ behavior: "smooth", block: "center" })
}
let getDataFromServer = async (url) => {
    try {
        let res = await fetch(url)
        let data = await res.json()
        return data;
    } catch (error) {  
        return false //false return korchi jate pore conditionaly step newya ay
    }
}

let sidebar = getElement('sidebar')
let cart = getElement('cart')
let cardContainer = getElement('card-container')
let categoryContainer = getElement("categories")
let modalContainer = getElement("modal-container")

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

let openModal = async (id) => { 
    modalContainer.classList.remove('hidden')
    let randomDelay = Math.floor(Math.random() * 1001) + 1500 
    setTimeout(() => {
        loadModalData(id)
    }, randomDelay);
}
let closeModal = () => {
    modalContainer.innerHTML = `
    <div class="mx-w-96 w-60 flex items-center justify-center bg-white rounded-xl aspect-square">
        <div class="py-12 flex items-center justify-center">
            <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="black"></l-ring>
        </div>
    </div>`
    modalContainer.classList.add('hidden')
}

let loadModalData = async (id) => {
    let data = await getPlantDetail(id)
    modalContainer.innerHTML = modalTemplate(data)
}


let errorTemplate = (message , cause ) =>  `
    <div
        class="w-full bg-red-50 cursor-not-allowed text-red-800 aspect-video max-w-[540px] xl:mt-24 sm:aspect-auto flex items-center justify-center text-center p-12 sm:p-28 rounded-md flex-col gap-2">
        <p class="font-bold text-xl">
            ${message}
        </p>
       ${cause}
    </div>
`

let modalTemplate = (data) => {
    let { id, image, name, description, price, category } = data
    return `
    <div class="bg-white w-full max-w-96 rounded-xl">
        <div class="bg-white p-6 rounded-xl space-y-4  ">
            <div class="w-full aspect-video">
                <img src=${image} class="w-full h-full object-cover rounded-lg" alt="">
            </div>
            <div class="space-y-4">
                <h2 class="text-xl font-bold "> ${name}</h2>
                <p class="text-gray-500 text-sm md:text-md">
                    ${description}
                </p>
                <div class="flex items-center justify-between text-xs">
                    <span class="text-green-700 bg-green-light rounded-full p-2 px-4"> ${category}</span>
                    <p>৳${price}</p>
                </div>
                <div class="flex items-center justify-between gap-4 text-xs">
                    <button onclick="closeModal()"
                        class="bg-green-light py-3 text-green-900 w-full rounded-full transition-all active:scale-90">
                        Close
                    </button>
                    <button onclick="addToCart(${id},'${name}',${price})"
                        class="bg-green-dark py-3 text-white w-full rounded-full transition-all active:scale-90">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
    `
}

let loadingTemplate = `
    <div class="py-12 flex items-center justify-center cursor-wait">
        <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="black"></l-ring>
    </div>
`
let categoryTemplate = (categoryName) => ` <span class="shrink-0 "> ${categoryName}</span>`

let cartTemplate = (data) => {
    let { id, name, price, quantity, totalPrice } = data
    
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

let treeCardTemplate = (data) => {
    let { id, image, name, description, price, category } = data
    return `
  <div class="bg-white p-6 space-y-4 rounded-md"> 
        <div class="w-full aspect-video">
            <img src=${image} class="w-full h-full object-cover rounded-lg" alt="">
        </div>
        <div class="space-y-4">
            <h2 class="text-xl font-bold hover:underline cursor-pointer" onclick='openModal(${id})' > ${name}</h2>
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

let loadCategories = async () => {
    let categoryUrl = 'https://openapi.programming-hero.com/api/categories'
    let data = await getDataFromServer(categoryUrl);
    categoryContainer.innerHTML = categoryTemplate('All plants')
    
    data.categories.forEach((category) => {
        categoryContainer.innerHTML += categoryTemplate(category.category_name)
    })
    
    let categories = [...categoryContainer.children]
    categories[0].classList.add('active')


    categories.forEach((el, index) => {
        el.addEventListener('click', (e) => {
            categories.forEach((el) => {
                el.classList.remove('active')
            })
            cardLoader.style.display = 'flex'
            cardContainer.innerHTML = ''
            e.target.classList.add('active')

            let randomDelay = Math.floor(Math.random() * 1001) + 1500 

            if (index == 0) {
                setTimeout(() => loadAllPlants(), randomDelay);
            } else {
                let selectCategroyByIndex = categories.indexOf(e.target)
                setTimeout(() => loadTreesByCategory(selectCategroyByIndex), randomDelay);
            }

        })
    })
}



let cartArray = []

let deleteItem = (id) => {
    let targetElementIndex = cartArray.indexOf(cartArray.find(item => item.id == id))
    cartArray.splice(targetElementIndex, 1)
    reRenderCart()
}
let totalPrice = () => {
    let price = cartArray.map(item => item.totalPrice).reduce((a, b) => a + b, 0)
    return price
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

let getPlantDetail = async (id) => {
    let plantDetailUrl = `https://openapi.programming-hero.com/api/plant/${id}`
    let data = await getDataFromServer(plantDetailUrl) 
    return data.plants
}


let loadAllPlants = async () => {
    let allPlantsUrl = `https://openapi.programming-hero.com/api/plants`
    try {
        let data = await getDataFromServer(allPlantsUrl)
        if(!data){
            throw new Error('Failed to get data' ,{
                cause : 'No internet connection' , 
            })
        }
        cardContainer.innerHTML = ''
        cardLoader.style.display = 'none'
        data.plants.forEach(plant => {
            cardContainer.innerHTML += treeCardTemplate(plant)
        })
    } catch (error) {
        if (error) cardLoader.innerHTML = errorTemplate(error.message , error.cause)
    }
}
 
loadAllPlants() 