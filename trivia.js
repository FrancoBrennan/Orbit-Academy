document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const dropzones = document.querySelectorAll(".dropzone");
  const checkBtn = document.querySelector(".check-btn");

  let dragged = null;

  // Iniciar drag
  draggables.forEach((item) => {
    item.addEventListener("dragstart", () => {
      dragged = item;
    });
  });

  // Permitir soltar
  dropzones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    zone.addEventListener("drop", () => {
      if (dragged) {
        // Restaurar solo el texto original
        const label = zone.querySelector(".drop-label");
        zone.innerHTML = label ? label.outerHTML : "";
        zone.appendChild(dragged);

        checkIfComplete();
      }
    });
  });

  // Verificar si todas las zonas están ocupadas
  function checkIfComplete() {
    const filled = Array.from(dropzones).every((zone) =>
      zone.querySelector(".draggable")
    );
    if (filled) {
      checkBtn.style.display = "inline-block";
    } else {
      checkBtn.style.display = "none";
    }
  }

  // Evaluar respuestas
  checkBtn.addEventListener("click", () => {
    dropzones.forEach((zone) => {
      const correct = zone.getAttribute("data-correct");
      const selected = zone.querySelector(".draggable");

      if (selected?.getAttribute("data-planet") === correct) {
        zone.classList.add("correct");
        zone.classList.remove("incorrect");
      } else {
        zone.classList.add("incorrect");
        zone.classList.remove("correct");
      }
    });
  });

  const resetBtn = document.querySelector(".reset-btn");

  resetBtn.addEventListener("click", () => {
    dropzones.forEach((zone) => {
      const label = zone.querySelector(".drop-label");
      zone.innerHTML = label ? label.outerHTML : "";
      zone.classList.remove("correct", "incorrect");
    });

    document.querySelector(".drag-options").append(...draggables);
    checkBtn.style.display = "none";
  });
});
