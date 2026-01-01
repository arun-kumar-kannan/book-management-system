"use strict";
class Book {
  constructors(title, author, year) {
    this.id = parseInt(Math.random() * 10000);
    this.title = title;
    this.author = author;
    this.year = year;
    this.rating = [];
    this.review = [];
    this.image = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f";
  }
}

// Local storage

// get data
let books = JSON.parse(localStorage.getItem("books")) || [];

// set data
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Render books

function renderBooks() {
  const container = document.querySelector(".book-container");
  container.innerHTML = "";

  // For each container
  books.foreach((book) => {
    // let avgRating;
    // if (book.rating.length > 0) {
    //   const sum = book.rating.reduce((a, b) => a + b, 0);
    //   avgRating = (sum / book.rating.length).toFixed(1);
    // } else {
    //   avgRating = "No ratings";
    // }
    const averageRating =
      book.rating.length > 0
        ? book.rating.reduce((a, b) => a + b, 0) / book.rating.length
        : "No Rating";
    //

    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `<img src ="${book.image}"/>
  <h3>${book.title}</h3>
  <p>📝 ${book.author}(${book.year})</p>
  <p class ="rating">⭐️ ${averageRating}</p> 
  <input type="number" min="1" max="5" placeholder="Rate (1-5)">
  <button class="rate-btn">Add Rating</button>
  <textarea placeholder="Write Review"></textarea>
  <button class="review-btn">Add Review</button>
  ${book.review
    .map(
      (review) =>
        `<div class = "review"><b>${review.username}:<b>${review.content}</div>`
    )
    .join("")}
    <button class="delete-btn">Delete Book</button>`;

    // Add Rating

    card.querySelector(".rate-btn").onclick = () => {
      const value = Number(card.querySelector("input").value);
      if (value >= 1 && value <= 5) {
        book.rating.push(value);
        saveBooks();
        renderBooks();
      }
    };

    // Add review
    card.querySelector(".review-btn").onclick = () => {
      const text = card.querySelector("textarea").value;
      if (text.trim()) {
        book.review.push({ username: "User", content: text });
        saveBooks();
        renderBooks();
      }
    };

    // Delete book
    card.querySelector(".delete-btn").onclick = () => {
      books = books.filter((b) => b.id !== book.id);
      saveBooks();
      renderBooks();
    };

    container.appendChild(card);
  });
}

document.getElementById("addBookBtn").onclick = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;

  const book = new Book(title, author, year);
  books.push(book);
  saveBooks();
  renderBooks();

  // Make them empty after adding the book
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("year").value = "";
};

// App initialization
renderBooks();
