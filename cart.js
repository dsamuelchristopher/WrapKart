// Initialize cart
document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById("cart-count");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

    const cartContainer = document.getElementById("cart-container");
    if (cartContainer) {
        displayCartItems(cartItems);
    }
});

// Function to add items to the cart
function addToCart(productName, price) {
    const cartCount = document.getElementById("cart-count");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product already exists in the cart
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

    alert(`${productName} added to the cart!`);
}

// Function to display cart items in cart.html
function displayCartItems(cartItems) {
    const cartContainer = document.getElementById("cart-container");
    if (!cartContainer) return;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartContainer.innerHTML = "";
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                <div class="quantity-container">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <p><strong>Total:</strong> $${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        const cartSummary = document.createElement("div");
        cartSummary.classList.add("cart-summary");
        const totalValue = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        cartSummary.innerHTML = `
            <h3>Cart Summary</h3>
            <p>Total value: $${totalValue.toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartSummary);
    }
}

// Function to update item quantity
function updateQuantity(index, change) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems[index].quantity += change;

    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
}

// Function to remove items from the cart
function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
}








// // Initialize cart
// document.addEventListener("DOMContentLoaded", () => {
//     const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     const cartContainer = document.getElementById("cart-container");
//     let totalValue = 0;

//     // Display each item in the cart
//     cartItems.forEach(item => {
//         const cartItemDiv = document.createElement("div");
//         cartItemDiv.classList.add("cart-item");

//         cartItemDiv.innerHTML = `
//             <p>${item.name}</p>
//             <p>Price: $${item.price}</p>
//             <div class="quantity-control">
//                 <button class="decrease" data-name="${item.name}">-</button>
//                 <span class="quantity">${item.quantity}</span>
//                 <button class="increase" data-name="${item.name}">+</button>
//             </div>
//             <p class="total-price">Total: $${(item.price * item.quantity).toFixed(2)}</p>
//         `;

//         cartContainer.appendChild(cartItemDiv);
//         totalValue += item.price * item.quantity;
//     });

//     // Update total value
//     const cartTotal = document.getElementById("cart-total");
//     cartTotal.textContent = `$${totalValue.toFixed(2)}`;
// });

// // Function to add items to the cart
// function addToCart(productName, price) {
//     const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     let productExists = false;

//     // Check if the product already exists in the cart
//     cartItems.forEach(item => {
//         if (item.name === productName) {
//             item.quantity += 1; // Increase quantity if product exists
//             productExists = true;
//         }
//     });

//     if (!productExists) {
//         // If product doesn't exist, add it to the cart with quantity 1
//         cartItems.push({ name: productName, price: price, quantity: 1 });
//     }

//     // Update cart in localStorage
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));

//     // Refresh cart display
//     displayCart();
//     alert(`${productName} added to the cart!`);
// }

// // Function to update the cart UI and total value
// function displayCart() {
//     const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     const cartContainer = document.getElementById("cart-container");
//     cartContainer.innerHTML = ""; // Clear previous items
//     let totalValue = 0;

//     cartItems.forEach(item => {
//         const cartItemDiv = document.createElement("div");
//         cartItemDiv.classList.add("cart-item");

//         cartItemDiv.innerHTML = `
//             <p>${item.name}</p>
//             <p>Price: $${item.price}</p>
//             <div class="quantity-control">
//                 <button class="decrease" data-name="${item.name}">-</button>
//                 <span class="quantity">${item.quantity}</span>
//                 <button class="increase" data-name="${item.name}">+</button>
//             </div>
//             <p class="total-price">Total: $${(item.price * item.quantity).toFixed(2)}</p>
//         `;

//         cartContainer.appendChild(cartItemDiv);
//         totalValue += item.price * item.quantity;
//     });

//     // Update total value
//     const cartTotal = document.getElementById("cart-total");
//     cartTotal.textContent = `$${totalValue.toFixed(2)}`;

//     // Add event listeners for quantity change buttons
//     const decreaseButtons = document.querySelectorAll(".decrease");
//     const increaseButtons = document.querySelectorAll(".increase");

//     decreaseButtons.forEach(button => {
//         button.addEventListener("click", (e) => {
//             const productName = e.target.getAttribute("data-name");
//             updateQuantity(productName, -1);
//         });
//     });

//     increaseButtons.forEach(button => {
//         button.addEventListener("click", (e) => {
//             const productName = e.target.getAttribute("data-name");
//             updateQuantity(productName, 1);
//         });
//     });
// }

// // Function to update the quantity of an item
// function updateQuantity(productName, change) {
//     const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//     cartItems.forEach(item => {
//         if (item.name === productName) {
//             item.quantity += change;

//             // Prevent negative quantity
//             if (item.quantity < 1) {
//                 item.quantity = 1;
//             }
//         }
//     });

//     // Update cart in localStorage
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));

//     // Refresh the cart UI
//     displayCart();
// }
