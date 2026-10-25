let cart = JSON.parse(localStorage.getItem('picanha_sierra_cart')) || [];
let currentProduct = null;
let currentQuantity = 1;

// ELEMENTOS DOM
const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalPrice = document.getElementById('cart-total-price');

const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');
const modalTotalPrice = document.getElementById('modal-total-price');
const qtyValue = document.getElementById('qty-value');
const addToCartBtn = document.getElementById('add-to-cart-btn');

const checkoutModal = document.getElementById('checkout-modal');
const checkoutBtn = document.getElementById('checkout-btn');
const closeCheckoutBtn = document.getElementById('close-checkout');
const confirmOrderBtn = document.getElementById('confirm-order-btn');

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  updateCartUI();
  setupEvents();
});

function setupEvents() {
  // Filtros de Categoria
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts(e.target.dataset.category);
    });
  });

  // Abrir e Fechar Carrinho
  openCartBtn.addEventListener('click', () => cartDrawer.classList.add('active'));
  closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));

  // Quantidade no Modal
  document.getElementById('qty-plus').addEventListener('click', () => { currentQuantity++; updateModalPrice(); });
  document.getElementById('qty-minus').addEventListener('click', () => { if(currentQuantity > 1) currentQuantity--; updateModalPrice(); });

  // Fechar Modais
  closeModalBtn.addEventListener('click', () => productModal.classList.remove('active'));
  closeCheckoutBtn.addEventListener('click', () => checkoutModal.classList.remove('active'));

  // Adicionar ao Carrinho
  addToCartBtn.addEventListener('click', addItemToCart);

  // Checkout
  checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) return alert('Seu carrinho está vazio!');
    cartDrawer.classList.remove('active');
    checkoutModal.classList.add('active');
  });

  confirmOrderBtn.addEventListener('click', handleOrderSubmit);
}

// RENDERIZAR PRODUTOS
function renderProducts(category) {
  productsGrid.innerHTML = '';
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" class="product-img" alt="${product.name}">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
          <button class="btn-primary" style="padding: 6px 12px; font-size: 12px;">Montar</button>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openProductModal(product));
    productsGrid.appendChild(card);
  });
}

// ABRIR MODAL
function openProductModal(product) {
  currentProduct = product;
  currentQuantity = 1;

  modalTitle.innerText = product.name;
  modalImg.src = product.image;
  modalDesc.innerText = product.description;

  // Doneness
  const donenessSec = document.getElementById('doneness-section');
  if(product.hasDoneness) donenessSec.classList.remove('hidden');
  else donenessSec.classList.add('hidden');

  // Removables
  const removablesSec = document.getElementById('removables-section');
  const removablesList = document.getElementById('removables-list');
  removablesList.innerHTML = '';
  if(product.customizations.removables.length > 0) {
    removablesSec.classList.remove('hidden');
    product.customizations.removables.forEach(item => {
      removablesList.innerHTML += `
        <label><input type="checkbox" value="${item}" class="remove-item"> Sem ${item}</label>
      `;
    });
  } else removablesSec.classList.add('hidden');

  // Extras
  const extrasSec = document.getElementById('extras-section');
  const extrasList = document.getElementById('extras-list');
  extrasList.innerHTML = '';
  if(product.customizations.extras.length > 0) {
    extrasSec.classList.remove('hidden');
    product.customizations.extras.forEach(extra => {
      extrasList.innerHTML += `
        <div class="checkbox-item">
          <label><input type="checkbox" value="${extra.name}" data-price="${extra.price}" class="extra-item"> ${extra.name}</label>
          <span>+ R$ ${extra.price.toFixed(2).replace('.', ',')}</span>
        </div>
      `;
    });
    // Add event listener aos extras pra recalcular preço
    document.querySelectorAll('.extra-item').forEach(el => el.addEventListener('change', updateModalPrice));
  } else extrasSec.classList.add('hidden');

  document.getElementById('modal-obs').value = '';
  updateModalPrice();
  productModal.classList.add('active');
}

// CALCULAR PREÇO DO MODAL
function calculateItemUnitTotal() {
  let total = currentProduct.price;
  document.querySelectorAll('.extra-item:checked').forEach(el => {
    total += parseFloat(el.dataset.price);
  });
  return total;
}

function updateModalPrice() {
  qtyValue.innerText = currentQuantity;
  const unitTotal = calculateItemUnitTotal();
  const grandTotal = unitTotal * currentQuantity;
  modalTotalPrice.innerText = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
}

// ADICIONAR AO CARRINHO
function addItemToCart() {
  const selectedExtras = [];
  document.querySelectorAll('.extra-item:checked').forEach(el => selectedExtras.push(el.value));

  const selectedRemovables = [];
  document.querySelectorAll('.remove-item:checked').forEach(el => selectedRemovables.push(el.value));

  const doneness = currentProduct.hasDoneness ? document.querySelector('input[name="doneness"]:checked').value : null;
  const obs = document.getElementById('modal-obs').value;

  const cartItem = {
    cartId: Date.now(),
    productId: currentProduct.id,
    name: currentProduct.name,
    unitPrice: calculateItemUnitTotal(),
    quantity: currentQuantity,
    doneness,
    extras: selectedExtras,
    removables: selectedRemovables,
    obs
  };

  cart.push(cartItem);
  saveCart();
  updateCartUI();
  productModal.classList.remove('active');
}

// ATUALIZAR CARRINHO
function updateCartUI() {
  cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.unitPrice * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <strong>${item.quantity}x ${item.name}</strong>
        <p style="font-size:11px; color:#aaa;">
          ${item.doneness ? `Ponto: ${item.doneness}<br>` : ''}
          ${item.extras.length ? `Adicionais: ${item.extras.join(', ')}<br>` : ''}
          ${item.removables.length ? `Sem: ${item.removables.join(', ')}<br>` : ''}
          ${item.obs ? `Obs: ${item.obs}` : ''}
        </p>
        <span style="color:var(--accent); font-size:13px;">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
      </div>
      <button onclick="removeItem(${item.cartId})" style="background:none; border:none; color:#e74c3c; cursor:pointer;">&times;</button>
    `;
    cartItemsList.appendChild(div);
  });

  cartTotalPrice.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeItem(cartId) {
  cart = cart.filter(i => i.cartId !== cartId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('picanha_sierra_cart', JSON.stringify(cart));
}

// ENVIAR PEDIDO
function handleOrderSubmit() {
  const table = document.getElementById('table-number').value;
  if(!table) return alert('Por favor, informe a Mesa ou Retirada.');

  const payment = document.getElementById('payment-method').value;
  const orderNum = Math.floor(1000 + Math.random() * 9000);

  alert(`🚀 PEDIDO ENVIADO COM SUCESSO!\n\nNúmero do Pedido: #${orderNum}\nLocal: ${table}\nPagamento: ${payment}\n\nObrigado por preferir o Picanha do Sierra!`);

  cart = [];
  saveCart();
  updateCartUI();
  checkoutModal.classList.remove('active');
}