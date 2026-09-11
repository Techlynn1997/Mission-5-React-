import { useState } from "react";
import "./App.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <img src="Bear.png" alt="Logo" className="navbar-icon" />
      <h1>The Paper Pages</h1>
    </nav>
  );
}

export default function Books() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [filterGenre, setFilterGenre] = useState("");
  const [books, setBooks] = useState([
    {
      image: "The Psychology of Money.jpg",
      title: "The Psychology of Money",
      genre: "Personal finance",
      rating: 5,
    },
    {
      image: "I Will Teach You To Be Rich.jpg",
      title: "I Will Teach You To Be Rich",
      genre: "Personal finance",
      rating: 5,
    },
    {
      image: "The Essentialism.jpg",
      title: "The Essentialism",
      genre: "Self-help",
      rating: 4,
    },
    {
      image: "Atomic Habits.png",
      title: "Atomic Habits",
      genre: "Self-help",
      rating: 4,
    },
    {
      image: "The Alchemist.jpg",
      title: "The Alchemist",
      genre: "Philosophy",
      rating: 5,
    },
    {
      image: "The Courage to Be Disliked.jpg",
      title: "The Courage To Be Disliked",
      genre: "Philosophy",
      rating: 4,
    },
    {
      image: "Man's Searching for Meaning.jpg",
      title: "Man's Searching For Meaning",
      genre: "Philosophy",
      rating: 3,
    },
    {
      image: "Reclaim your heart.jpeg",
      title: "Reclaim your heart",
      genre: "Spirituality",
      rating: 5,
    },
  ]);

  const genres = Array.from(new Set(books.map((book) => book.genre)));

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleGenreChange(e) {
    setGenre(e.target.value);
  }
  function handleRatingChange(e) {
    setRating(e.target.value);
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    setImageFile(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !genre || !rating || !imageFile) {
      alert("Please fill in all fields before adding a book.");
      return;
    }

    const ratingValue = Number(rating);
    if (ratingValue < 1 || ratingValue > 5 || isNaN(ratingValue)) {
      alert("Rating must be a number between 1 and 5");
      return;
    }

    let imageURL = "";
    if (imageFile) {
      imageURL = URL.createObjectURL(imageFile);
    }

    const newBook = {
      image: imageURL,
      title,
      genre,
      rating: Number(rating),
    };

    setBooks([...books, newBook]);

    setTitle("");
    setGenre("");
    setRating("");
    setImageFile(null);

    e.target.reset();
  }

  const filteredBooks = filterGenre
    ? books.filter((book) => book.genre === filterGenre)
    : books;

  return (
    <>
      <Navbar />
      <div className="top-row">
        <div className="header-container">
          <label htmlFor="genreSelect">Books genre: </label>
          <select
            id="genreSelect"
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="">All genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="books-collection-container">
          Current books collection: {books.length}
        </div>
      </div>

      <div className="page-container">
        <div className="book-card">
          {filteredBooks.map((book) => (
            <Book key={book.title} {...book} />
          ))}
        </div>

        <form id="bookForm" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />

          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={handleGenreChange}
          />
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            min="1"
            max="5"
            step="1"
          />
          <label htmlFor="image" className="custom-file-label">
            Choose image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button id="submit" type="submit">
            Add books
          </button>
        </form>
      </div>
    </>
  );
}

function Book({ image, title, genre, rating }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h4>{title}</h4>
      <p>{genre}</p>
      Rating: {rating} {renderStars(Math.round(rating))}
    </div>
  );
}

function renderStars(rating) {
  const maxStars = 5;
  const filledStars = "⭐".repeat(rating);
  const emptyStars = "☆".repeat(maxStars - rating);
  return filledStars + emptyStars;
}
