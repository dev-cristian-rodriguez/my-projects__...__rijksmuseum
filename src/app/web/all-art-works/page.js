"use client";

import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

// Components
import Paginator from "@/app/web-modules/components/common/paginator";

// Store
import store from "@/app/web-modules/store/index.store";

// Services
import getArtWorks from "@/app/web-modules/services/get-art-works.service";

export default function AllArtWork() {
  const router = useRouter();

  const emailCookie = Cookies.get("email");

  const [artWorks, setArtWorks] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!emailCookie) {
      router.push("/");
    }
  }, [emailCookie]);

  useEffect(() => {
    getArtWorks({ page, search }).then((data) => setArtWorks(data?.artObjects));
  }, [page, search]);

  function onChangeSearch(e) {
    setSearch(e.target.value);
  }

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
    <main className="pl-[15px] pt-[15px]">
      <div className="flex justify-center mt-[15px]">
        <div
          className={`flex items-center w-[400px] py-[8px] pl-[15px] text-[14px] text-[#464747] rounded-[6px] border-[1px] border-gray-300 shadow-[0_1px_10px_rgba(186,186,186,5)]`}
        >
          <label htmlFor="search">
            <MagnifyingGlassIcon
              className="mr-[10px]"
              width={20}
              color="#818686"
            />
          </label>

          <input
            className="outline-none mr-[18px] w-full"
            placeholder="Buscar"
            type="text"
            value={search}
            name="search"
            id="search"
            onChange={onChangeSearch}
          />
        </div>
      </div>

      <div className="flex justify-center mt-[30px]">
        <Paginator page={page} setPage={setPage} />
      </div>

      <div className="flex justify-center">
        <article className="grid grid-cols-3 gap-x-10 mt-[35px]">
          {artWorks === null && (
            <div className="flex justify-center mt-[100px]">
              <span className="loader"></span>
            </div>
          )}

          {artWorks?.length && (
            <>
              {artWorks?.map((art_work) => {
                return (
                  <aside
                    key={art_work.id}
                    className="bg-[#ffff] w-[300px] rounded-[10px] mb-[40px] shadow-[0_1px_5px_rgba(186,186,186,1)]"
                  >
                    <section className="relative ">
                      <img
                        className="w-[100%] h-[200px] object-cover rounded-t-[10px]"
                        src={art_work?.webImage?.url}
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
              })}
            </>
          )}

          {artWorks && !artWorks?.length && (
            <p className="text-center whitespace-nowrap">
              No hay obras que mostrar
            </p>
          )}
        </article>
      </div>
    </main>
  );
}
