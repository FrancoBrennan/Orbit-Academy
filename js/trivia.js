document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const dropzones = document.querySelectorAll(".dropzone");
  const checkBtn = document.querySelector(".check-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const dragContainer = document.querySelector(".drag-options");

  let dragged = null;
  let selectedItem = null;
  const isMobile = window.innerWidth <= 992;

  // DRAG & DROP para escritorio
  if (!isMobile) {
    draggables.forEach((item) => {
      item.addEventListener("dragstart", () => {
        dragged = item;
      });
    });

    dropzones.forEach((zone) => {
      zone.addEventListener("dragover", (e) => e.preventDefault());

      zone.addEventListener("drop", () => {
        if (dragged) {
          const label = zone.querySelector(".drop-label");
          zone.innerHTML = label ? label.outerHTML : "";
          zone.appendChild(dragged);
          checkIfComplete();
        }
      });
    });
  }

  // TAP + TAP para móviles
  if (isMobile) {
    draggables.forEach((item) => {
      item.addEventListener("click", () => {
        if (selectedItem) {
          selectedItem.classList.remove("selected");
        }
        selectedItem = item;
        item.classList.add("selected");
      });
    });

    dropzones.forEach((zone) => {
      zone.addEventListener("click", () => {
        if (selectedItem && !zone.querySelector(".draggable")) {
          const label = zone.querySelector(".drop-label");
          zone.innerHTML = label ? label.outerHTML : "";
          zone.appendChild(selectedItem);
          selectedItem.classList.remove("selected");
          selectedItem = null;
          checkIfComplete();
        }
      });
    });
  }

  function checkIfComplete() {
    const filled = Array.from(dropzones).every((zone) =>
      zone.querySelector(".draggable")
    );
    checkBtn.style.display = filled ? "inline-block" : "none";
  }

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

  resetBtn.addEventListener("click", () => {
    dropzones.forEach((zone) => {
      const label = zone.querySelector(".drop-label");
      zone.innerHTML = label ? label.outerHTML : "";
      zone.classList.remove("correct", "incorrect");
    });

    dragContainer.append(...draggables);
    draggables.forEach((el) => el.classList.remove("selected"));
    checkBtn.style.display = "none";
    selectedItem = null;
  });
});
