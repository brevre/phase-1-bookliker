document.addEventListener("DOMContentLoaded", function() {});
document.addEventListener("DOMContentLoaded", () => {
    const listPanel = document.getElementById("list-panel");
    const showPanel = document.getElementById("show-panel");
  
    // Step 1: List Books
    function listBooks() {
      fetch("http://localhost:3000/books")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((book) => renderBookTitle(book));
        });
    }
  
    function renderBookTitle(book) {
      const li = document.createElement("li");
      li.textContent = book.title;
      li.addEventListener("click", () => showBookDetails(book));
      listPanel.appendChild(li);
    }
  
    // Step 2: Show Details
    function showBookDetails(book) {
      showPanel.innerHTML = ""; // Clear the show panel
  
      const bookDiv = document.createElement("div");
      bookDiv.innerHTML = `
        <h2>${book.title}</h2>
        <img src="${book.img_url}" alt="${book.title}" />
        <p>${book.description}</p>
      `;
  
      const likeButton = document.createElement("button");
      likeButton.textContent = "Like";
      likeButton.addEventListener("click", () => likeBook(book));
  
      const usersList = document.createElement("ul");
      usersList.innerHTML = "<strong>Users who liked this book:</strong>";
  
      book.users.forEach((user) => {
        const userLi = document.createElement("li");
        userLi.textContent = user.username;
        usersList.appendChild(userLi);
      });
  
      bookDiv.appendChild(likeButton);
      bookDiv.appendChild(usersList);
      showPanel.appendChild(bookDiv);
    }
  
    // Step 3: Like a Book
    function likeBook(book) {
      const userId = 1; // Example user ID, you can change this accordingly
      const existingUsers = book.users.map((user) => user.id);
  
      if (!existingUsers.includes(userId)) {
        book.users.push({ id: userId, username: "pouros" });
  
        fetch(`http://localhost:3000/books/${book.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ users: book.users }),
        })
          .then((response) => response.json())
          .then((data) => showBookDetails(data)); // Re-render book details
      }
    }
  
    // Initial fetch to render book titles
    listBooks();
  });
  