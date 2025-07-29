// MUJI Website JavaScript - Updated with fixes and real images

class MujiWebsite {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("muji-cart")) || [];
    this.products = [
      {
        id: 1,
        name: "Minimalist Desk Organizer",
        price: 2900,
        category: "office",
        image: "deskorg.png",
        description:
          "A thoughtfully designed desk organizer that brings order to your workspace.",
      },
      {
        id: 2,
        name: "Cotton Storage Box",
        price: 1900,
        category: "storage",
        image: "cottonbox.png",
        description:
          "Soft cotton storage box perfect for organizing clothes, toys, or household items.",
      },
      {
        id: 3,
        name: "Bamboo Pen Holder",
        price: 1200,
        category: "office",
        image: "penholder.png",
        description:
          "Simple and elegant pen holder crafted from sustainable bamboo.",
      },
      {
        id: 4,
        name: "Linen Table Runner",
        price: 3400,
        category: "textiles",
        image: "tablerunner.png",
        description:
          "Premium linen table runner that adds natural elegance to your dining table.",
      },
      {
        id: 5,
        name: "Ceramic Mug Set",
        price: 2800,
        category: "home",
        image: "mug.png",
        description: "Set of two minimalist ceramic mugs with a matte finish.",
      },
      {
        id: 6,
        name: "Wooden Coat Hanger",
        price: 1500,
        category: "home",
        image: "hanger.png",
        description:
          "Elegant wooden coat hanger made from sustainable beech wood.",
      },
    ];

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupCart();
    this.setupPageSpecific();
    this.updateCartUI();
  }

  // Navigation Setup
  setupNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
    const closeMobileMenu = document.getElementById("close-mobile-menu");

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => this.openMobileMenu());
    }

    if (closeMobileMenu) {
      closeMobileMenu.addEventListener("click", () => this.closeMobileMenu());
    }

    if (mobileMenuOverlay) {
      mobileMenuOverlay.addEventListener("click", () => this.closeMobileMenu());
    }

    // Mobile cart toggle
    const mobileCartToggle = document.getElementById("mobile-cart-toggle");
    if (mobileCartToggle) {
      mobileCartToggle.addEventListener("click", () => {
        this.closeMobileMenu();
        setTimeout(() => this.openCart(), 300);
      });
    }

    // Close menu when clicking on mobile menu links
    const mobileLinks = document.querySelectorAll("#mobile-menu a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu());
    });
  }

  openMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

    if (mobileMenu && mobileMenuOverlay) {
      mobileMenu.classList.remove("-translate-x-full");
      mobileMenu.classList.add("translate-x-0", "mobile-menu-open");
      mobileMenuOverlay.classList.remove("opacity-0", "pointer-events-none");
      mobileMenuOverlay.classList.add(
        "opacity-100",
        "mobile-menu-overlay-visible"
      );
      document.body.style.overflow = "hidden";
    }
  }

  closeMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

    if (mobileMenu && mobileMenuOverlay) {
      mobileMenu.classList.remove("translate-x-0", "mobile-menu-open");
      mobileMenu.classList.add("-translate-x-full");
      mobileMenuOverlay.classList.remove(
        "opacity-100",
        "mobile-menu-overlay-visible"
      );
      mobileMenuOverlay.classList.add("opacity-0", "pointer-events-none");
      document.body.style.overflow = "";
    }
  }

  // Cart Setup
  setupCart() {
    const cartToggle = document.getElementById("cart-toggle");
    const closeCart = document.getElementById("close-cart");
    const cartOverlay = document.getElementById("cart-overlay");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (cartToggle) {
      cartToggle.addEventListener("click", () => this.openCart());
    }

    if (closeCart) {
      closeCart.addEventListener("click", () => this.closeCart());
    }

    if (cartOverlay) {
      cartOverlay.addEventListener("click", () => this.closeCart());
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (this.cart.length > 0) {
          this.navigateTo("checkout.html");
        } else {
          this.showNotification("Your cart is empty!", "error");
        }
      });
    }

    // Product card click handlers
    document.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      if (productCard) {
        const productId = productCard.dataset.productId;
        if (productId) {
          this.navigateToProduct(productId);
        }
      }
    });
  }

  openCart() {
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlay = document.getElementById("cart-overlay");

    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.add("cart-slide-in");
      cartOverlay.classList.add("cart-overlay-visible");
      document.body.style.overflow = "hidden";
    }
  }

  closeCart() {
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlay = document.getElementById("cart-overlay");

    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.remove("cart-slide-in");
      cartOverlay.classList.remove("cart-overlay-visible");
      document.body.style.overflow = "";
    }
  }

  // Page-specific setup
  setupPageSpecific() {
    const currentPage = this.getCurrentPage();

    switch (currentPage) {
      case "index":
        this.setupHomePage();
        break;
      case "products":
        this.setupProductsPage();
        break;
      case "product-detail":
        this.setupProductDetailPage();
        break;
      case "checkout":
        this.setupCheckoutPage();
        break;
      case "contact":
        this.setupContactPage();
        break;
    }
  }

  getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes("products.html")) return "products";
    if (path.includes("product-detail.html")) return "product-detail";
    if (path.includes("checkout.html")) return "checkout";
    if (path.includes("about.html")) return "about";
    if (path.includes("contact.html")) return "contact";
    return "index";
  }

  setupHomePage() {
    // Hero animations
    const heroElements = document.querySelectorAll(
      ".animate-fade-in-up, .animate-fade-in-up-delay, .animate-fade-in-up-delay-2"
    );
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, index * 200);
    });
  }

  setupProductsPage() {
    this.renderProducts(this.products);
    this.setupProductFilters();
  }

  setupProductFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const category = e.target.dataset.category;

        // Update active state
        filterBtns.forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");

        // Filter products
        const filteredProducts =
          category === "all"
            ? this.products
            : this.products.filter((product) => product.category === category);

        this.renderProducts(filteredProducts);
      });
    });
  }

  renderProducts(products) {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    products.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.className =
        "product-card group cursor-pointer opacity-0 translate-y-4";
      productCard.dataset.productId = product.id;

      productCard.innerHTML = `
                <div class="bg-white border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-500 hover:scale-[1.02]">
                    <div class="aspect-square bg-gradient-to-br from-amber-50 to-amber-50 flex items-center justify-center p-8">
                        <img src="${product.image}" alt="${
        product.name
      }" class="w-full h-full object-cover">
                    </div>
                    <div class="p-6">
                        <h3 class="text-lg font-light text-neutral-800 mb-2">${
                          product.name
                        }</h3>
                        <p class="text-neutral-600 text-sm mb-3 capitalize">${
                          product.category
                        }</p>
                        <p class="text-lg text-neutral-800">¥${product.price.toLocaleString()}</p>
                    </div>
                </div>
            `;

      productsGrid.appendChild(productCard);

      // Animate in
      setTimeout(() => {
        productCard.style.opacity = "1";
        productCard.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  setupProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number.parseInt(urlParams.get("id"));

    if (!productId) {
      this.navigateTo("products.html");
      return;
    }

    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      this.navigateTo("products.html");
      return;
    }

    this.populateProductDetails(product);
    this.setupQuantityControls();
    this.setupProductActions(product);
  }

  populateProductDetails(product) {
    const elements = {
      "breadcrumb-product": product.name,
      "product-category": product.category,
      "product-name": product.name,
      "product-price": `¥${product.price.toLocaleString()}`,
      "product-description": product.description,
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });

    // Set main image
    const mainImage = document.getElementById("main-product-image");
    if (mainImage) {
      mainImage.src = product.image;
      mainImage.alt = product.name;
    }
  }

  setupQuantityControls() {
    let quantity = 1;
    const quantityEl = document.getElementById("quantity");
    const decreaseBtn = document.getElementById("decrease-qty");
    const increaseBtn = document.getElementById("increase-qty");

    if (decreaseBtn) {
      decreaseBtn.addEventListener("click", () => {
        if (quantity > 1) {
          quantity--;
          if (quantityEl) quantityEl.textContent = quantity;
        }
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener("click", () => {
        quantity++;
        if (quantityEl) quantityEl.textContent = quantity;
      });
    }

    return () => quantity; // Return getter function
  }

  setupProductActions(product) {
    const getQuantity = this.setupQuantityControls();

    const addToCartBtn = document.getElementById("add-to-cart-btn");
    const buyNowBtn = document.getElementById("buy-now-btn");

    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        const quantity = getQuantity();
        for (let i = 0; i < quantity; i++) {
          this.addToCart(product);
        }
        this.showNotification(
          `Added ${quantity} item${quantity > 1 ? "s" : ""} to cart`
        );
      });
    }

    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
        const quantity = getQuantity();
        this.cart = []; // Clear cart
        for (let i = 0; i < quantity; i++) {
          this.addToCart(product);
        }
        this.navigateTo("checkout.html");
      });
    }
  }

  setupCheckoutPage() {
    // --- FIX: Refresh cart data from localStorage ---
    // Ensure the checkout page uses the absolute latest cart data.
    // This is crucial when navigating from product-detail.html after adding an item.
    const storedCart = JSON.parse(localStorage.getItem("muji-cart")) || [];
    this.cart = storedCart; // Update the instance's cart reference with the fresh data
    // --- End of FIX ---

    // Now check if the freshly loaded cart is empty
    if (this.cart.length === 0) {
      this.navigateTo("products.html");
      return;
    }

    // Proceed with rendering and calculations using the updated this.cart
    this.renderCheckoutItems(); // This updates the #checkout-items div
    this.calculateTotals(); // This updates the #subtotal and #final-total spans
    this.setupCheckoutForm();
  }

  renderCheckoutItems() {
    const checkoutItems = document.getElementById("checkout-items");
    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    // Group cart items by product
    const groupedItems = {};
    this.cart.forEach((item) => {
      if (groupedItems[item.id]) {
        groupedItems[item.id].quantity++;
      } else {
        groupedItems[item.id] = { ...item, quantity: 1 };
      }
    });

    Object.values(groupedItems).forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className =
        "flex items-center gap-4 pb-4 border-b border-neutral-200 last:border-b-0";
      itemEl.innerHTML = `
                <img src="${item.image}" alt="${
        item.name
      }" class="w-16 h-16 object-cover bg-neutral-100">
                <div class="flex-1">
                    <h4 class="font-light text-neutral-800">${item.name}</h4>
                    <p class="text-neutral-600 text-sm">Quantity: ${
                      item.quantity
                    }</p>
                </div>
                <div class="text-right">
                    <p class="font-medium">¥${(
                      item.price * item.quantity
                    ).toLocaleString()}</p>
                </div>
            `;
      checkoutItems.appendChild(itemEl);
    });
  }

  calculateTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = 500;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById("subtotal");
    const finalTotalEl = document.getElementById("final-total");

    if (subtotalEl) subtotalEl.textContent = `¥${subtotal.toLocaleString()}`;
    if (finalTotalEl) finalTotalEl.textContent = `¥${total.toLocaleString()}`;
  }

  setupCheckoutForm() {
    const placeOrderBtn = document.getElementById("place-order-btn");
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleOrderSubmission();
      });
    }
  }

  handleOrderSubmission() {
    const form = document.getElementById("checkout-form");
    if (!form || !form.checkValidity()) {
      if (form) form.reportValidity();
      return;
    }

    const btn = document.getElementById("place-order-btn");
    const originalText = btn ? btn.textContent : "";

    if (btn) {
      btn.textContent = "Processing...";
      btn.disabled = true;
    }

    setTimeout(() => {
      alert("Thank you for your order! This is a demo checkout.");
      this.cart = [];
      localStorage.setItem("muji-cart", JSON.stringify(this.cart));
      this.navigateTo("index.html");
    }, 2000);
  }

  setupContactPage() {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", this.handleContactForm.bind(this));
    }
  }

  handleContactForm(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : "";

    if (submitBtn) {
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.");
      form.reset();
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }, 1500);
  }

  // Cart Management
  addToCart(product) {
    this.cart.push(product);
    localStorage.setItem("muji-cart", JSON.stringify(this.cart));
    this.updateCartUI();
    this.openCart(); // Open the cart sidebar to show the updated cart
  }

  removeFromCart(productId) {
    const index = this.cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      localStorage.setItem("muji-cart", JSON.stringify(this.cart));
      this.updateCartUI();
    }
  }

  updateCartUI() {
    this.updateCartCount();
    this.updateCartItems();
  }

  updateCartCount() {
    const cartCounts = document.querySelectorAll(
      ".cart-count, .mobile-cart-count"
    );

    cartCounts.forEach((element) => {
      if (element) {
        element.textContent = this.cart.length;
        if (this.cart.length > 0) {
          element.style.opacity = "1";
          element.style.transform = "scale(1)";
        } else {
          element.style.opacity = "0";
          element.style.transform = "scale(0)";
        }
      }
    });
  }

  updateCartItems() {
    const cartItems = document.getElementById("cart-items");
    const cartFooter = document.getElementById("cart-footer");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) return;

    if (this.cart.length === 0) {
      if (emptyCartMessage) emptyCartMessage.style.display = "block";
      if (cartFooter) cartFooter.style.display = "none";
      cartItems.innerHTML =
        '<p class="text-neutral-500 text-center py-8">Your cart is empty</p>';
    } else {
      if (emptyCartMessage) emptyCartMessage.style.display = "none";
      if (cartFooter) cartFooter.style.display = "block";

      // Group items by product
      const groupedItems = {};
      this.cart.forEach((item) => {
        if (groupedItems[item.id]) {
          groupedItems[item.id].quantity++;
        } else {
          groupedItems[item.id] = { ...item, quantity: 1 };
        }
      });

      let total = 0;
      cartItems.innerHTML = "";

      Object.values(groupedItems).forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className =
          "flex items-center gap-4 py-4 border-b border-neutral-200 last:border-b-0";
        cartItem.innerHTML = `
                    <img src="${item.image}" alt="${
          item.name
        }" class="w-16 h-16 object-cover bg-neutral-100">
                    <div class="flex-1">
                        <h4 class="font-light text-neutral-800">${
                          item.name
                        }</h4>
                        <p class="text-neutral-600 text-sm">Qty: ${
                          item.quantity
                        } × ¥${item.price.toLocaleString()}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-medium">¥${itemTotal.toLocaleString()}</p>
                        <button class="text-neutral-400 hover:text-neutral-600 text-sm mt-1" onclick="mujiWebsite.removeFromCart(${
                          item.id
                        })">Remove</button>
                    </div>
                `;

        cartItems.appendChild(cartItem);
      });

      if (cartTotal) cartTotal.textContent = `¥${total.toLocaleString()}`;
    }
  }

  // Utility Functions
  navigateTo(page) {
    window.location.href = page;
  }

  navigateToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-lg shadow-lg z-50 opacity-0 transition-all duration-300 ${
      type === "success" ? "bg-neutral-800 text-white" : "bg-red-500 text-white"
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = "1";
    }, 50);

    // Animate out and remove
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 2000);
  }
}

// Global Functions for onclick handlers
function navigateTo(page) {
  if (window.mujiWebsite) {
    window.mujiWebsite.navigateTo(page);
  } else {
    window.location.href = page;
  }
}

function smoothScrollTo(selector) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Initialize the website when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.mujiWebsite = new MujiWebsite();
});
