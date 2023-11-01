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
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import toast, { Toaster } from "react-hot-toast";
import BigButton from "@/components/BigButton";
import { updateBookByID, deleteBookByID } from "@/firebase/firebase";

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
  const [snapshot, loading, error] = useDocument(doc(db, "books", docID));
  let data;
  if (snapshot) {
    data = snapshot.data();
  }

  const [sellerUsername, setSellerUsername] = useState("");

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

  function deleteBook() {
    try {
      deleteBookByID(docID);
    } catch (error) {
      console.log(error);
    }
  }

  function getStandValue(stand_n) {
    switch (stand_n) {
      case 1:
        return "Helt ny";
      case 2:
        return "God, men brugt";
      case 3:
        return "Slidt";
      case 4:
        return "Skrevet i";
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

  if (error) {
    router.push("/");
  } else if (snapshot && !error)
    return (
      <div className="w-screen min-h-[100svh] fixed top-0 left-0 bg-slate-50 slide-from-right z-[9999]">
        <Toaster />
        <Breadcrum title="Rediger opslag" destination={redirect} />
        <div className="w-full h-full flex flex-col gap-y-4 pt-8 bg-white">
          {/* Image wrapper */}
          <div className="w-[10rem] h-[14rem] m-auto">
            <img
              className="w-full h-full object-cover border border-gray-300"
              src={data.image}
              alt={data.name}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-2xl font-medium">{data.name}</p>
          </div>
          {/* text wrapper */}
          <div className="w-full flex h-80 flex-col items-start px-8 gap-6 text-lg bg-white py-4">
            <div className="flex flex-row">
              <span className="font-semibold border-b-2">Pris:</span>
              <input
                type="number"
                placeholder={data.price}
                className="text-xl w-16 text-end pr-2"
                onChange={(e) => {
                  const valueAsNumber = parseInt(e.target.value);
                  setNewBookInfo({
                    ...newBookInfo,
                    price: valueAsNumber,
                  });
                }}
              />
              <p className="text-lg ">Kr.</p>
            </div>
            <div className="flex flex-row gap-x-2">
              <p>
                <span className="font-semibold border-b-2">Studie:</span>
              </p>
              <div className="flex items-center">
                <input
                  type="text"
                  list="majors"
                  placeholder={data.major}
                  className=""
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
                <span className="font-semibold border-b-2">Semester:</span>
                <select
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
                <span className="font-semibold border-b-2">Stand:</span>{" "}
              </p>
              <select>
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
                click={() => deleteBook()}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default EditBook;
