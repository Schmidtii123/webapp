import MarketplacePost from "@/components/explore/MarketplacePost";
import SearchBar from "@/components/explore/SearchBar";
import { useEffect, useState } from "react";
import { getAllBooks } from "@/firebase/firebase";

export default function Home() {
  const [books, setBooks] = useState([]);
  async function getData() {
    const data = await getAllBooks();
    setBooks(data);
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(books);

  return (
    <>
      <main className="flex flex-col w-full pb-24 pt-4">
        <SearchBar books={books} setFilteredBooks={setBooks} />
        <div className="flex flex-wrap justify-around gap-y-4 pt-24">
          {books.map((book) => (
            <MarketplacePost
              img={book.image}
              title={book.name}
              price={book.price}
            />
          ))}
          {books.map((book) => (
            <MarketplacePost
              img={book.image}
              title={book.name}
              price={book.price}
            />
          ))}
          {books.map((book) => (
            <MarketplacePost
              img={book.image}
              title={book.name}
              price={book.price}
            />
          ))}
          {books.map((book) => (
            <MarketplacePost
              img={book.image}
              title={book.name}
              price={book.price}
            />
          ))}
        </div>
      </main>
    </>
  );
}
