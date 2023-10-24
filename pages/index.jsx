import MarketplacePost from "@/components/explore/MarketplacePost";
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
        <div className="fixed top-0 left-0 bg-white w-full">
          <h1 className="font-bold text-3xl pl-6">Opdag</h1>
          <input type="text" />
          <button>Search</button>
        </div>
        <div className="flex flex-wrap justify-around gap-y-4">
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
