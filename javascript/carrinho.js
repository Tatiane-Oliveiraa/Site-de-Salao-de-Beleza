// Dark mode toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById("toggle-dark");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("modoEscuro", isDark);
    toggleBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  });

  const isDark = localStorage.getItem("modoEscuro") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Modo Claro";
  }

  // Inicializa os botões de quantidade
  initQuantityButtons();
  atualizarTotal();

  // Alerta de compra finalizada
  document.querySelector('.checkout-btn').addEventListener('click', () => {
    alert('Compra finalizada com sucesso! Obrigado por comprar no Studio Sublime.');
  });

  // Botão para zerar o carrinho
  const resetBtn = document.getElementById('reset-cart');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.quantity').forEach(qtySpan => {
        qtySpan.textContent = '0';
      });
      atualizarTotal();
    });
  }
});

function atualizarTotal() {
  let total = 0;
  document.querySelectorAll('.product').forEach(prod => {
    const price = parseFloat(prod.getAttribute('data-price'));
    const qty = parseInt(prod.querySelector('.quantity').textContent);
    total += price * qty;
  });
  document.getElementById('total-price').textContent = total.toFixed(2).replace('.', ',');
}

function initQuantityButtons() {
  document.querySelectorAll('.btn-increase').forEach(btn => {
    btn.addEventListener('click', e => {
      const qtySpan = e.target.parentElement.querySelector('.quantity');
      let qty = parseInt(qtySpan.textContent);
      qty++;
      qtySpan.textContent = qty;
      atualizarTotal();
    });
  });

  document.querySelectorAll('.btn-decrease').forEach(btn => {
    btn.addEventListener('click', e => {
      const qtySpan = e.target.parentElement.querySelector('.quantity');
      let qty = parseInt(qtySpan.textContent);
      if (qty > 0) {
        qty--;
        qtySpan.textContent = qty;
        atualizarTotal();
      }
    });
  });
}
