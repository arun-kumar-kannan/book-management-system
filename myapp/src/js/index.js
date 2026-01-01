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
  });
}
