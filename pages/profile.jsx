import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import MenuItem from "@/components/profileview/MenuItem";

const ProfileView = () => {
  const [user, loading, error] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col w-screen h-[100svh] p-4 gap-4 overflow-x-hidden overflow-y-scroll">
      <h1 className="text-2xl font-bold">Din profil</h1>
      {/* User info */}
      <div className="flex gap-4 items-center">
        {/* Avatar */}
        <div className=" rounded-full overflow-hidden w-20">
          <img
            src={user.photoURL}
            className="w-full h-auto"
            alt="user avatar"
          />
        </div>
        {/* User info text */}
        <div className="flex flex-col">
          <p className="text-xl font-bold">{user.displayName}</p>
          <p className="text-base">{user.email}</p>
        </div>
      </div>
      {/* Menu */}
      <div className="flex flex-col gap-4 items-center justify-center w-full mt-16">
        <MenuItem title="Gemte opslag" icon="saved" />
        <MenuItem title="Rediger profil" icon="edit" />
        <MenuItem title="Mine annoncer" icon="my_books" />
        <MenuItem title="Support og FAQ" icon="support" />
        <MenuItem title="Log ud" icon="logout" action={handleSignOut} />
      </div>
    </div>
  );
};

const profile = () => {
  return <ProfileView />;
};

export default profile;
