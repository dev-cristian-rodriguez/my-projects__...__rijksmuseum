"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { HeartIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import store from "@/app/web-modules/store/index.store";

export default function AllArtWork() {
  const router = useRouter();
  const emailCookie = Cookies.get("email");

  const [artWorks, setArtWorks] = useState(null);

  // ___ Zustand ___
  // Initial States - zustand
  const store_all_art_works = store((state) => state.all_art_works);

  useEffect(() => {
    if (!emailCookie) {
      router.push("/");
    }
  }, [emailCookie]);

  useEffect(() => {
    if (!store_all_art_works) {
      const url = `https://www.rijksmuseum.nl/api/en/collection/?key=KHn4xrLx&ps=30`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => store.setState({ all_art_works: data.artObjects }));
    }

    if (store_all_art_works) {
      setArtWorks(store_all_art_works);
    }
  }, [store_all_art_works]);

  async function addArtworkToUser(data) {
    const body = {
      email: emailCookie,
      id_original: data.id,
      link: data.links.web,
      title: data.longTitle,
      principal_or_first_maker: data.principalOrFirstMaker,
      image_url: data.webImage.url,
    };

    await fetch("/api/art_works", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fulfilled") {
          store.setState({ my_art_works: null });
          toast.success("Nueva obra agregada a tu base de datos");
        } else {
          toast.error("Esta obra ya existe en tu base de datos");
        }
      });
  }

  return (
    <main>
      <article className="pl-[15px] pt-[15px] flex flex-col justify-center items-center">
        {artWorks ? (
          artWorks?.map((art_work) => {
            return (
              <aside
                key={art_work.id}
                className="bg-[#ffff] w-[300px] rounded-[10px] mb-[40px] shadow-[0_1px_10px_rgba(186,186,186,1)]"
              >
                <section className="relative ">
                  <img
                    className="w-[100%] rounded-t-[10px]"
                    src={art_work.webImage.url}
                    alt="img"
                  />
                  <HeartIcon
                    title="Selecciona como favorita y guarda en tu base de datos"
                    onClick={() => addArtworkToUser(art_work)}
                    className="bg-[#ffff] rounded-full p-[6px] absolute top-[8px] right-[8px] cursor-pointer"
                    width={50}
                    color="red"
                  />
                </section>
                <h1 className="text-[#1A1A32] text-[17px] font-semibold py-[18px] text-center">
                  {art_work.longTitle.length > 10
                    ? art_work.longTitle.slice(0, 10) + " ..."
                    : art_work.longTitle}
                </h1>
              </aside>
            );
          })
        ) : (
          <div className="flex justify-center mt-[100px]">
            <span className="loader"></span>
          </div>
        )}
      </article>
    </main>
  );
}
