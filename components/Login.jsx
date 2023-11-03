// Karl & Simon
// Et component der viser login siden, hvor der bliver gjort brug af BigButton til at kunne logge ind med google, via loginFunction, som bliver håndteret i _app.js, hvor det er benyttet Firebase authentication.

// Note: Det er ikke muligt at logge ind på siden med andet end Google - projektet kan IKKE tilgåes uden login.

import React from "react";
import BigButton from "@/components/BigButton";
import Image from "next/image";
import Link from "next/link";

const Login = ({ loginFunction }) => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-start gap-4">
      <h1 className="text-medium-green text-5xl font-bold mt-32">BookBazr</h1>
      <p>Indtast dine oplysninger</p>
      <div className="flex flex-col items-start gap-4 mb-6">
        <input
          type="text"
          placeholder="Email"
          required
          className="border-b outline-none border-black h-10 w-72 text-lg rounded-none"
        />
        <input
          type="text"
          placeholder="Password"
          required
          className="border-b outline-none border-black h-10 w-72 text-lg rounded-none"
        />
        <div className="flex flex-row items-center">
          <input id="husk" type="checkbox" className="h-4 w-4" />
          <label htmlFor="husk" className="ml-2">
            Husk mig
          </label>
        </div>
      </div>
      <BigButton color="green" content="Log ind" />
      <BigButton
        click={loginFunction}
        color="grey"
        content={
          <div className="flex items-center">
            <span>
              <Image
                src="/login/googleicon.png"
                width={36}
                height={36}
                alt="google icon"
              />
            </span>
            Log ind med Google
          </div>
        }
      />
      <Link href="/" className=" mt-6">
        Glemt adgangskode?
      </Link>
      <Link href="/" className=" font-light mt-16">
        Første gang? <strong className="font-bold">Opret dig her</strong>
      </Link>
    </div>
  );
};

export default Login;
