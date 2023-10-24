import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex overscroll-none flex-col w-screen h-screen overflow-hidden absolute top-0 left-0">
        <h2 className="text-4xl font-bold">Test af font og pullrequest</h2>

        <p className="text-4xl flex justify-center">Karl</p>
        <div className="flex text-center flex-row justify-around">
          <h1 className="text-oldman-grey flex">Simon vil gerne på mcD</h1>
          <h3 className="text-sky-500 underline ">Ara Ara</h3>
        </div>
      </main>
    </>
  );
}
