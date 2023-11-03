/* 

*/

import React from "react";
import Breadcrum from "@/components/Breadcrum";
import { useState, useEffect } from "react";

const EditProfile = ({ prevPage, userInfo }) => {
  const [newUserInfo, setNewUserInfo] = useState(userInfo);
  return (
    <div className="w-screen h-[100svh] bg-white slide-from-right fixed left-0 top-0  flex flex-col">
      <Breadcrum title="Rediger profil" destination={prevPage} />
      {/* Info wrapper */}
      <div className="flex flex-col w-full h-auto">
        {/* Avatar */}
        <div className="flex justify-center mt-10">
          <div className="w-32 h-32 rounded-full overflow-hidden flex justify-center items-center">
            <img
              className=""
              src={userInfo.photoURL}
              alt={userInfo.displayName}
            />
          </div>
        </div>
        {/* User info wrapper */}
        <form className="flex flex-col gap-4 w-full items-center mt-16">
          <div className="flex flex-col w-80">
            <label htmlFor="displayName" className="">
              Navn
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              placeholder={
                newUserInfo.displayName ? "ik færdig, ingen stress" : ""
              }
              className="w-3/4 h-10 border-b-2 border-gray-300 rounded-none px-2 focus:outline-none group"
              onChange={(e) =>
                setNewUserInfo({
                  ...newUserInfo,
                  displayName: e.target.value,
                })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
