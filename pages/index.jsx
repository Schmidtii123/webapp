import MarketplacePost from "@/components/explore/MarketplacePost";
import SearchBar from "@/components/explore/SearchBar";
import FilterModal from "@/components/modal/FilterModal";
import { useEffect, useState } from "react";
import { getAllBooks } from "@/firebase/firebase";
import Book from "@/tabs/Book";
import { useFilterStore } from "./_app";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const { filter } = useFilterStore();

  async function getData() {
    const data = await getAllBooks();
    setBooks(data);
  }
  useEffect(() => {
    getData();
  }, []);

  const [filterTerm, setFilterTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    sort: "",
    major: "",
    semester: 0,
    condition: 0,
  });

  const handleFilterChange = (updatedOptions) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      ...updatedOptions,
    }));
  };

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <>
      {selectedBook && (
        <Book docID={selectedBook} redirect={() => setSelectedBook(null)} />
      )}
      <section className="fixed flex flex-col w-screen h-[100svh] py-4 gap-4 overflow-x-hidden overflow-y-scroll">
        <h1 className="text-2xl font-bold ml-4">Opdag</h1>
        <div className="flex justify-between pr-4 pl-4 pb-4 flex-center">
          {/* Filter SVG */}
          <button onClick={() => setOpenFilter(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </button>

          <div className="relative flex grow ml-2 items-center">
            <label htmlFor="search" className="absolute left-2">
              {/* Search SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </label>
            <input
              type="text"
              id="search"
              placeholder="Søg"
              className="bg-gray-200 pl-10 h-9 rounded-full w-full"
              onChange={(e) => setFilterTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-around gap-y-4">
          {books.length > 0 &&
            books
              .filter((book) =>
                book.name.toLowerCase().includes(filterTerm.toLowerCase())
              )
              .sort((a, b) => {
                if (filterOptions.sort === "lowToHigh") {
                  return b.price - a.price;
                } else if (filterOptions.sort === "highToLow") {
                  return a.price - b.price;
                } else {
                  return 0;
                }
              })
              .map((book) => (
                <MarketplacePost
                  click={() => setSelectedBook(book.id)}
                  key={book.id}
                  img={book.image}
                  title={book.name}
                  price={book.price}
                />
              ))}
        </div>
      </section>
      {openFilter && (
        <FilterModal
          currentOptions={filterOptions}
          onFilterChange={handleFilterChange}
          redirect={() => setOpenFilter(false)}
        />
      )}
    </>
  );
}
