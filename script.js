const products = [
  {
    id: "urban-hoodie-set",
    name: "Urban Hoodie Set",
    category: "Women",
    tag: "New",
    price: 42.99,
    oldPrice: 58.0,
    rating: 4.8,
    freeShipping: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#111111", "#e9e1d3", "#d9614f"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyOuresez7ZG7zNfCEkG1OzyoOCeA-PSr0RQ&s",
  },
  {
    id: "cloud-soft-sweatshirt",
    name: "Cloud Soft Sweatshirt",
    category: "Women",
    tag: "Popular",
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.7,
    freeShipping: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#d8c6ad", "#ffffff", "#6f7f83"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-C83SUJp79edxac4-PY5vhRg7qd2Sy2avQ&s",
  },
  {
    id: "essential-tee-pack",
    name: "Essential Tee 3-Pack",
    category: "Men",
    tag: "Value",
    price: 24.5,
    oldPrice: 32.0,
    rating: 4.6,
    freeShipping: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#fafafa", "#c55a42", "#262b2e"],
    image: "https://images.unsplash.com/photo-1716369786631-b8b9c7ac1dc4?auto=format&fit=crop&w=900&q=82",
  },
  {
    id: "street-runner-sneakers",
    name: "Street Runner Sneakers",
    category: "Shoes",
    tag: "Deal",
    price: 58.0,
    oldPrice: 72.0,
    rating: 4.9,
    freeShipping: true,
    sizes: ["35", "36", "37", "38", "39"],
    colors: ["#ffffff", "#cf4d55", "#101010"],
    image: "https://cdn2.shopclues.com/images1/thumbnails/118422/320/320/153720338-118422818-1769627720.jpg",
  },
  {
    id: "metro-trench-coat",
    name: "Metro Trench Coat",
    category: "Women",
    tag: "Premium",
    price: 89.99,
    oldPrice: 118.0,
    rating: 4.8,
    freeShipping: true,
    sizes: ["S", "M", "L"],
    colors: ["#c9b79c", "#2d2d2d", "#f0eadf"],
    image: "https://m.media-amazon.com/images/I/71FLpD2qD3L._AC_UY1000_.jpg",
  },
  {
    id: "light-wash-jeans",
    name: "Light Wash Straight Jeans",
    category: "Denim",
    tag: "Best seller",
    price: 39.99,
    oldPrice: 52.0,
    rating: 4.5,
    freeShipping: false,
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["#9fb4c9", "#6e829a", "#d4dce6"],
    image: "https://shopmashburn.com/cdn/shop/products/S61493_2.jpg?v=1654094544",
  },
  {
    id: "tailored-button-jacket",
    name: "Tailored Button Jacket",
    category: "Men",
    tag: "Sharp",
    price: 64.9,
    oldPrice: 86.0,
    rating: 4.6,
    freeShipping: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#6d7370", "#1f2933", "#c4a27b"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP07ArMbcgdMJNAaG8e1Gc6-swXPO369rwcA&s",
  },
  {
    id: "night-out-coat",
    name: "Night Out Black Coat",
    category: "Deals",
    tag: "Sale",
    price: 74.25,
    oldPrice: 99.0,
    rating: 4.7,
    freeShipping: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#0f0f0f", "#763c3c", "#f5f0e8"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNri01LTb74XgZDs_ObYt3mWrHRKgHbMMkw&s",
  },
];

const state = {
  category: "All",
  maxPrice: 100,
  freeShipping: false,
  search: "",
  sort: "featured",
  selectedSizes: {},
  cart: loadCart(),
};

const productGrid = document.querySelector("#productGrid");
const categoryFilters = document.querySelector("#categoryFilters");
const searchInput = document.querySelector("#searchInput");
const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector("#priceValue");
const shippingFilter = document.querySelector("#shippingFilter");
const sortSelect = document.querySelector("#sortSelect");
const resultCount = document.querySelector("#resultCount");
const cartCount = document.querySelector("#cartCount");
const cartDrawer = document.querySelector("#cartDrawer");
const drawerBackdrop = document.querySelector(".drawer-backdrop");
const cartItems = document.querySelector("#cartItems");
const subtotalValue = document.querySelector("#subtotalValue");
const shippingValue = document.querySelector("#shippingValue");
const totalValue = document.querySelector("#totalValue");
const checkoutModal = document.querySelector("#checkoutModal");
const checkoutForm = document.querySelector("#checkoutForm");
const modalItems = document.querySelector("#modalItems");
const modalTotal = document.querySelector("#modalTotal");
const toast = document.querySelector("#toast");

products.forEach((product) => {
  state.selectedSizes[product.id] = product.sizes[Math.min(1, product.sizes.length - 1)];
});

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("trendmart-cart")) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("trendmart-cart", JSON.stringify(state.cart));
}

function renderCategories() {
  const categories = ["All", ...new Set(products.map((product) => product.category))];
  categoryFilters.innerHTML = categories
    .map((category) => {
      const count = category === "All" ? products.length : products.filter((product) => product.category === category).length;
      const active = state.category === category ? "active" : "";
      return `
        <button class="category-button ${active}" type="button" data-action="set-category" data-category="${category}">
          <span>${category}</span>
          <span>${count}</span>
        </button>
      `;
    })
    .join("");
}

function filteredProducts() {
  const query = state.search.trim().toLowerCase();
  let list = products.filter((product) => {
    const matchesCategory = state.category === "All" || product.category === state.category;
    const matchesPrice = product.price <= state.maxPrice;
    const matchesShipping = !state.freeShipping || product.freeShipping;
    const matchesSearch = !query || `${product.name} ${product.category} ${product.tag}`.toLowerCase().includes(query);
    return matchesCategory && matchesPrice && matchesShipping && matchesSearch;
  });

  if (state.sort === "low") {
    list = [...list].sort((a, b) => a.price - b.price);
  }
  if (state.sort === "high") {
    list = [...list].sort((a, b) => b.price - a.price);
  }
  if (state.sort === "rating") {
    list = [...list].sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderProducts() {
  const list = filteredProducts();
  resultCount.textContent = `${list.length} ${list.length === 1 ? "item" : "items"} shown`;

  if (!list.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No products match your filters.</h3>
        <p>Reset filters or search for another clothing item.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = list.map(renderProductCard).join("");
}

function renderProductCard(product) {
  const selectedSize = state.selectedSizes[product.id];
  const sizes = product.sizes
    .map((size) => {
      const active = selectedSize === size ? "active" : "";
      return `<button class="size-button ${active}" type="button" data-action="select-size" data-product-id="${product.id}" data-size="${size}">${size}</button>`;
    })
    .join("");
  const colors = product.colors.map((color) => `<span class="swatch" style="background:${color}" aria-hidden="true"></span>`).join("");

  return `
    <article class="product-card">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-tag">${product.tag}</span>
        <button class="favorite-button" type="button" data-action="favorite" aria-label="Save ${product.name}">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M20.8 4.6c-1.8-1.7-4.7-1.5-6.3.4L12 7.8 9.5 5C7.9 3.1 5 2.9 3.2 4.6c-2 1.9-2.1 5.1-.2 7.1l9 9 9-9c1.9-2 1.8-5.2-.2-7.1Z"></path>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <div class="meta-row">
          <span>${product.category}</span>
          <span>${product.rating} rating</span>
        </div>
        <h3>${product.name}</h3>
        <div class="price-row">
          <strong>${money(product.price)}</strong>
          <span class="old-price">${money(product.oldPrice)}</span>
        </div>
        <div class="shipping-row">
          <span>${product.freeShipping ? "Free shipping" : "Shipping calculated"}</span>
          <span>In stock</span>
        </div>
        <div class="size-row" aria-label="Choose size for ${product.name}">${sizes}</div>
        <div class="color-row" aria-label="Available colors">${colors}</div>
        <div class="product-actions">
          <button class="product-button secondary" type="button" data-action="add-cart" data-product-id="${product.id}">Add to cart</button>
          <button class="product-button primary" type="button" data-action="buy-now" data-product-id="${product.id}">Buy now</button>
        </div>
      </div>
    </article>
  `;
}

function renderCart() {
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = itemCount;

  if (!state.cart.length) {
    cartItems.innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty.</h3>
        <p>Add clothing items to start the checkout role-play.</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = state.cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return `
          <div class="cart-line">
            <img src="${product.image}" alt="${product.name}" />
            <div>
              <div class="cart-line-top">
                <h3>${product.name}</h3>
                <strong>${money(product.price * item.quantity)}</strong>
              </div>
              <p>Size ${item.size} - ${money(product.price)} each</p>
              <div class="quantity-row">
                <div class="quantity-controls" aria-label="Quantity for ${product.name}">
                  <button type="button" data-action="decrease" data-cart-id="${item.cartId}" aria-label="Decrease quantity">-</button>
                  <strong>${item.quantity}</strong>
                  <button type="button" data-action="increase" data-cart-id="${item.cartId}" aria-label="Increase quantity">+</button>
                </div>
                <button class="remove-button" type="button" data-action="remove" data-cart-id="${item.cartId}">Remove</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  const subtotal = state.cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + product.price * item.quantity;
  }, 0);
  const shipping = !state.cart.length || subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  subtotalValue.textContent = money(subtotal);
  shippingValue.textContent = shipping ? money(shipping) : "Free";
  totalValue.textContent = money(total);
  modalItems.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
  modalTotal.textContent = money(total);

  saveCart();
}

function addToCart(productId) {
  const product = products.find((entry) => entry.id === productId);
  const size = state.selectedSizes[productId] || product.sizes[0];
  const cartId = `${productId}-${size}`;
  const existing = state.cart.find((item) => item.cartId === cartId);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ cartId, productId, size, quantity: 1 });
  }

  renderCart();
  showToast(`${product.name} added to cart.`);
}

function changeQuantity(cartId, amount) {
  const item = state.cart.find((entry) => entry.cartId === cartId);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.cartId !== cartId);
  }
  renderCart();
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  drawerBackdrop.hidden = false;
  document.body.classList.add("drawer-open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  drawerBackdrop.hidden = true;
  document.body.classList.remove("drawer-open");
}

function openCheckout() {
  if (!state.cart.length) {
    showToast("Add at least one item before checkout.");
    return;
  }
  closeCart();
  checkoutModal.showModal();
  document.body.classList.add("modal-open");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function resetFilters() {
  state.category = "All";
  state.maxPrice = 100;
  state.freeShipping = false;
  state.search = "";
  state.sort = "featured";
  searchInput.value = "";
  priceRange.value = "100";
  shippingFilter.checked = false;
  sortSelect.value = "featured";
  priceValue.textContent = "$100";
  renderCategories();
  renderProducts();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const { action, productId, category, size, cartId } = target.dataset;

  if (action === "set-category") {
    state.category = category;
    renderCategories();
    renderProducts();
  }

  if (action === "select-size") {
    state.selectedSizes[productId] = size;
    renderProducts();
  }

  if (action === "add-cart") {
    addToCart(productId);
  }

  if (action === "buy-now") {
    addToCart(productId);
    openCart();
  }

  if (action === "favorite") {
    target.classList.toggle("active");
    showToast(target.classList.contains("active") ? "Saved to favorites." : "Removed from favorites.");
  }

  if (action === "open-cart") openCart();
  if (action === "close-cart") closeCart();
  if (action === "open-checkout") openCheckout();
  if (action === "close-checkout") checkoutModal.close();
  if (action === "reset-filters") resetFilters();
  if (action === "increase") changeQuantity(cartId, 1);
  if (action === "decrease") changeQuantity(cartId, -1);
  if (action === "remove") {
    state.cart = state.cart.filter((item) => item.cartId !== cartId);
    renderCart();
  }
});

document.querySelectorAll("[data-nav-category]").forEach((link) => {
  link.addEventListener("click", () => {
    state.category = link.dataset.navCategory;
    renderCategories();
    renderProducts();
  });
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});

priceRange.addEventListener("input", (event) => {
  state.maxPrice = Number(event.target.value);
  priceValue.textContent = money(state.maxPrice).replace(".00", "");
  renderProducts();
});

shippingFilter.addEventListener("change", (event) => {
  state.freeShipping = event.target.checked;
  renderProducts();
});

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

checkoutModal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkoutModal.close();
  state.cart = [];
  renderCart();
  checkoutForm.reset();
  showToast("Demo order placed. Your role-play purchase is complete.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
  }
});

renderCategories();
renderProducts();
renderCart();
