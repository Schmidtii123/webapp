/* Nicolai og Simon */

import Breadcrum from "@/components/Breadcrum";
import {
  addBookToSaved,
  addNewChat,
  auth,
  db,
  getUserInfo,
  getUsernameFromID,
  removeBookFromSaved,
  updateDoc,
} from "@/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import toast, { Toaster } from "react-hot-toast";
import BigButton from "@/components/BigButton";
import { updateBookByID, deleteBookByID } from "@/firebase/firebase";

/* Der oprettes en række studier "majors" i en array. Det bliver brugt til valg af uddannelse */

const EditBook = ({ docID = "K6PqqAyCeidb7avm0xOA", redirect = () => {} }) => {
  const majors = [
    "pædagog",
    "medicin",
    "sygeplejerske",
    "psykologi",
    "diplomingeniør",
    "Folkeskolelærer",
    "socialrådgiver",
    "Civilingeniør",
    "Jura",
    "Erhvervsøkonomi",
    "Markedsføringsøkonom",
    "Fysioterapeut",
    "Designteknolog",
    "Arkitekt",
    "Finansøkonom",
    "Bygningskonstruktør",
    "Datamatiker",
    "Journalist",
    "Multimediedesigner",
    "Jordemoder",
    "Serviceøkonom",
    "Designer",
    "Odontologi",
    "International Business",
    "Statskundskab",
  ];

  /* 
"udeDocument "- hooket bliver brugt til at hente bogdata fra Firestore ved at tilgå dokumentet med at angive "docID".
Bogen bliver gemt i data variablen, når det bliver fetched.
*/

  const [snapshot, loading, error] = useDocument(doc(db, "books", docID));
  let data;
  if (snapshot) {
    data = snapshot.data();
  }

  /* 
  Funktionen laver et kald til "updateBookInfo", der opdatere bogoplysninger ved hjælp af "updateBookID". 
  Funktionen "handleUpdateBook" håndtere opdatering af bogoplysninger. 
  */
  const [sellerUsername, setSellerUsername] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  function updateBookInfo() {
    try {
      updateBookByID(docID, newBookInfo);
      toast.success("Bog info er opdateret", {
        iconTheme: {
          primary: "#ffffff",
          secondary: "#79AC78",
        },
        style: {
          borderRadius: "10px",
          background: "#79AC78",
          color: "#ffffff",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  /* 
"deleteBook" funktionen bliver kaldt når en brugere forsøger at slette bogen ved hjælp af "deleteBookInfo". 
*/

  async function deleteBook() {
    setIsDeleting(true);
    try {
      await deleteBookByID(docID);
    } catch (error) {
      console.log(error);
    }
  }

  // Handle contact seller
  const [user] = useAuthState(auth);
  let activeUserID;
  let activeUserName;
  let sellerID;
  if (snapshot) {
    try {
      activeUserID = user.uid;
      activeUserName = user.displayName;
      sellerID = data.sellerID;
    } catch (error) {
      window.location.reload();
    }
  }

  async function getSellerName() {
    try {
      const sellerName = await getUsernameFromID(sellerID);

      setSellerUsername(sellerName);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (snapshot) {
      getSellerName();
    }
  }, [snapshot]);

  const router = useRouter();

  async function handleContactSeller() {
    const conversationData = {
      book: data.name,
      [sellerID]: sellerUsername,
      [activeUserID]: activeUserName,
      is_read: false,
      messages: [],
      userIDs: [sellerID, activeUserID],
      chat_started: new Date(),
    };
    try {
      await addNewChat(conversationData);
      router.push("/messages");
    } catch (error) {
      console.log(error);
    }
  }

  const [newBookInfo, setNewBookInfo] = useState({});

  async function handleUpdateBook() {
    const id = snapshot.id;
    const updatedBookInfo = {
      name: "Updated book name",
      price: 50,
      major: "Updated major",
    };

    try {
      await updateBookByID(id, updatedBookInfo);
      toast.success("Bogen er updateret", {
        iconTheme: {
          primary: "#ffffff",
          secondary: "#79AC78",
        },
        style: {
          borderRadius: "10px",
          background: "#79AC78",
          color: "#ffffff",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const [isSaved, setIsSaved] = useState(false);
  async function checkIfSaved() {
    const id = snapshot.id;
    const userID = activeUserID;
    try {
      const data = await getUserInfo(userID);

      if (data.saved_books.some((book) => book.bookID === id)) {
        setIsSaved(true);
        return true;
      } else {
        setIsSaved(false);
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (snapshot) {
      checkIfSaved();
    }
  }, [snapshot]);

  if (isDeleting)
    return (
      <div className="w-screen h-[100svh] flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-40 h-40 animate-pulse text-medium-green"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
        <h1 className="font-bold text-4xl text-medium-green animate-pulse">
          BookBazr
        </h1>
      </div>
    );
  else if (snapshot)
    return (
      <div className="w-screen min-h-[100svh] fixed top-0 left-0 bg-slate-50 slide-from-right z-[9999]">
        <Toaster />
        <Breadcrum title="Rediger opslag" destination={redirect} />
        <div className="w-full h-full flex flex-col gap-y-2 pt-8 bg-white">
          {/* Image wrapper */}
          <div className="w-[8rem] h-[10rem] m-auto">
            <img
              className="w-full h-full object-cover border border-gray-300"
              src={data.image}
              alt={data.name}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-xl font-medium">{data.name}</p>
          </div>
          {/* text wrapper */}
          <div className="w-full flex h-80 flex-col items-start px-8 gap-6 text-lg bg-white">
            <div className="flex flex-row">
              <span className="font-semibold  ">Pris:</span>
              <input
                type="number"
                placeholder={data.price}
                className="w-10 text-end border-b-2  pr-2 ml-2"
                onChange={(e) => {
                  const valueAsNumber = parseInt(e.target.value);
                  setNewBookInfo({
                    ...newBookInfo,
                    price: valueAsNumber,
                  });
                }}
              />
              <p className=" ">kr.</p>
            </div>
            <div className="flex flex-row gap-x-2">
              <p>
                <span className="font-semibold ">Studie:</span>
              </p>
              <div className="flex items-center">
                <input
                  type="text"
                  list="majors"
                  placeholder={data.major}
                  className="text-base border-b-2 w-52"
                  onChange={(e) => {
                    setNewBookInfo({
                      ...newBookInfo,
                      major: e.target.value,
                    });
                  }}
                />
                <datalist id="majors">
                  {majors.map((major, i) => (
                    <option key={i} value={major} />
                  ))}
                </datalist>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">Semester:</span>
                <select
                  className="text-base"
                  defaultValue={data.semester}
                  onChange={(e) => {
                    setNewBookInfo({
                      ...newBookInfo,
                      semester: e.target.value,
                    });
                  }}
                >
                  <option value={1}>1. Semester</option>
                  <option value={2}>2. Semester</option>
                  <option value={3}>3. Semester</option>
                  <option value={4}>4. Semester</option>
                  <option value={5}>5. Semester</option>
                  <option value={6}>6. Semester</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-x-1">
              <p>
                <span className="font-semibold text-base">Stand:</span>{" "}
              </p>
              <select className="text-base">
                <option value={1}>Helt ny</option>
                <option value={2}>God, men brugt</option>
                <option value={3}>Slidt</option>
                <option value={4}>Skrevet i</option>
              </select>
            </div>
            <div className="flex flex-col gap-4 py-4 items-center w-full">
              <BigButton
                content="Gem ændringer"
                color="green"
                click={() => updateBookInfo()}
              />
              <BigButton
                content="Slet opslag"
                color="red"
                click={(e) => {
                  e.preventDefault();
                  setIsDeleting(true);
                  deleteBook();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default EditBook;
