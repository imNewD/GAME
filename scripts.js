document.addEventListener("DOMContentLoaded", function () {
  const gameBoard = document.getElementById("game-board");
  const searchBarBlue = document.getElementById("search-bar-blue");
  const searchBarRed = document.getElementById("search-bar-red");
  const blueBox = document.getElementById("blue-box");
  const redBox = document.getElementById("red-box");

  gameBoard.addEventListener("click", function (e) {
    const clickedElement = e.target;
    if (clickedElement.classList.contains("player-square")) {
      clickedElement.classList.toggle("selected");
    }
  });

  searchBarBlue.addEventListener("keydown", function (e) {
    handleSearchBarKeydown(e, "blue", searchBarBlue, blueBox);
  });

  searchBarRed.addEventListener("keydown", function (e) {
    handleSearchBarKeydown(e, "red", searchBarRed, redBox);
  });

  function handleSearchBarKeydown(e, color, searchBar, box) {
    if (e.key === "Enter") {
      const inputText = searchBar.value.trim();
      const parts = inputText.split("*");
      const count = parts.length === 2 ? parseInt(parts[0]) : 1;
      const imagePath = parts[parts.length - 1];

      if (!isNaN(count) && count > 0) {
        createPlayerSquares(color, count, imagePath, box);
      }
    }
  }

  function createPlayerSquares(color, count, imagePath, box) {
    for (let i = 0; i < count; i++) {
      const square = createPlayerSquare(color, i * 80, i * 80, imagePath);
      placeSquare(square, box);
      gameBoard.appendChild(square);
      makeDraggable(square);
    }
  }

  function createPlayerSquare(color, x, y, imagePath) {
    const square = document.createElement("div");
    square.classList.add("player-square", color);

    const image = document.createElement("img");
    image.src = imagePath;
    square.appendChild(image);

    square.style.left = x + "px";
    square.style.top = y + "px";

    square.addEventListener("click", function () {
      square.classList.toggle("selected");
    });

    return square;
  }

  function placeSquare(square, box) {
    const boxRect = box.getBoundingClientRect();
    square.style.left =
      boxRect.left + Math.random() * (boxRect.width - 60) + "px";
    square.style.top =
      boxRect.top + Math.random() * (boxRect.height - 60) + "px";
  }

  function makeDraggable(element) {
    let offsetX,
      offsetY,
      isDragging = false;

    element.addEventListener("mousedown", function (e) {
      isDragging = true;
      offsetX = e.clientX - element.getBoundingClientRect().left;
      offsetY = e.clientY - element.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", function (e) {
      if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        element.style.left = x + "px";
        element.style.top = y + "px";

        checkNeutralBoxes(element);
      }
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
    });
  }

  function checkNeutralBoxes(element) {
    const neutralBoxes = document.querySelectorAll(".neutral-box");
    neutralBoxes.forEach((box) => {
      const boxRect = box.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      if (
        elementRect.left < boxRect.right &&
        elementRect.right > boxRect.left &&
        elementRect.top < boxRect.bottom &&
        elementRect.bottom > boxRect.top
      ) {
        if (element.classList.contains("blue")) {
          box.style.backgroundColor = "blue";
        } else if (element.classList.contains("red")) {
          box.style.backgroundColor = "red";
        }
      }
    });
  }

  // Create and position neutral boxes
  createNeutralBoxes(10);

  function createNeutralBoxes(count) {
    for (let i = 0; i < count; i++) {
      const neutralBox = document.createElement("div");
      neutralBox.classList.add("neutral-box");
      let left, top;

      // Ensure neutral boxes do not spawn closer than 500px to the spawning boxes
      do {
        left = Math.random() * (window.innerWidth - 100);
        top = Math.random() * (window.innerHeight - 100);
      } while (
        isWithinSpawnBox(left, top, blueBox) ||
        isWithinSpawnBox(left, top, redBox)
      );

      neutralBox.style.left = left + "px";
      neutralBox.style.top = top + "px";
      makeDraggable(neutralBox);

      gameBoard.appendChild(neutralBox);
    }
  }

  function isWithinSpawnBox(x, y, spawnBox) {
    const spawnBoxRect = spawnBox.getBoundingClientRect();
    return (
      x > spawnBoxRect.left &&
      x < spawnBoxRect.right &&
      y > spawnBoxRect.top &&
      y < spawnBoxRect.bottom
    );
  }
});
