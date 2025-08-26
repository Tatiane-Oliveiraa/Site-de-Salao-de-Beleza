 const toggleBtn = document.getElementById("toggle-dark");

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("modoEscuro", isDark);
      toggleBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
    });

    window.addEventListener("load", () => {
      const isDark = localStorage.getItem("modoEscuro") === "true";
      if (isDark) {
        document.body.classList.add("dark-mode");
        toggleBtn.textContent = "☀️ Modo Claro";
      }
    });