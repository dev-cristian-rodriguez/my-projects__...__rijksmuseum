"use client";

import Select from "react-select";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  LanguageIcon,
  EyeIcon,
  AcademicCapIcon,
  TrashIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

import store from "@/app/web-modules/store/index.store";
import {
  theme,
  generalSelectStyle,
} from "@/app/web-modules/components/select/custom-styles-select";

export default function MyArtWork() {
  const router = useRouter();
  const emailCookie = Cookies.get("email");

  const [search, setSearch] = useState("");
  const [artWorks, setArtWorks] = useState(null);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [selectFilter, setSelectFilter] = useState(null);

  // ___ Zustand ___
  // Initial States - zustand
  const store_my_art_works = store((state) => state.my_art_works);

  const filterMenurRef = useRef(null);

  useEffect(() => {
    if (!emailCookie) {
      router.push("/");
    }
  }, [emailCookie]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterMenurRef.current &&
        !filterMenurRef.current.contains(event.target)
      ) {
        setOpenFilterMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!store_my_art_works) {
      fetch(`/api/art_works?email=${emailCookie}`)
        .then((res) => res.json())
        .then((data) => store.setState({ my_art_works: data }));
    }

    if (store_my_art_works) {
      setArtWorks(store_my_art_works.result);
    }
  }, [store_my_art_works]);

  function filterArtWorks(filterBy, inputSearch) {
    if (filterBy) {
      switch (filterBy) {
        case "title":
          return store_my_art_works.result?.filter(
            (art_work) =>
              art_work.title
                .slice(0, inputSearch.length)
                .toLocaleLowerCase() === inputSearch,
          );
        case "principal_or_first_maker":
          return store_my_art_works.result?.filter(
            (art_work) =>
              art_work.principal_or_first_maker
                .slice(0, inputSearch.length)
                .toLocaleLowerCase() === inputSearch,
          );
      }
    } else {
      return store_my_art_works.result?.filter(
        (art_work) =>
          art_work.title.slice(0, inputSearch.length).toLocaleLowerCase() ===
            inputSearch ||
          art_work.principal_or_first_maker
            .slice(0, inputSearch.length)
            .toLocaleLowerCase() === inputSearch,
      );
    }
  }

  function onChangeSearch(e) {
    setSearch(e.target.value);

    const inputSearch = e.target.value.trim().toLocaleLowerCase();

    setArtWorks(filterArtWorks(selectFilter, inputSearch));
  }

  function onChangeSelectFilter(e) {
    setSelectFilter(e.value);
  }

  const filterOptions = [
    {
      value: "title",
      label: (
        <div className="flex items-center">
          <LanguageIcon
            className="mr-[5px]"
            width={20}
            height={20}
            color="#464747"
          />
          <p className="text-[13px] text-[#838D96] ">Titulo</p>
        </div>
      ),
    },

    {
      value: "principal_or_first_maker",
      label: (
        <div className="flex items-center">
          <AcademicCapIcon
            className="mr-[5px]"
            width={20}
            height={20}
            color="#464747"
          />
          <p className="text-[13px] text-[#838D96] ">Artista</p>
        </div>
      ),
    },
  ];

  return (
    <main className="mx-[24px] my-[18px]">
      <h1 className="text-[#1A1A32] text-[24px] font-semibold mb-[7px]">
        Mis obras de arte
      </h1>
      <p className="text-[#838D96] text-[14px]">
        Administra y gestiona todos tus obras que se encuentran guardadas en tu
        base de datos .
      </p>
      <article className="flex mt-[15px] mb-[22px]">
        <div className="mr-[10px]">
          <div
            className={`flex items-center py-[8px] pl-[15px] text-[14px] text-[#464747] rounded-[6px] border-[1px] border-gray-300`}
          >
            <label htmlFor="search">
              <MagnifyingGlassIcon
                className="mr-[10px]"
                width={20}
                color="#818686"
              />
            </label>

            <input
              className="outline-none mr-[18px]"
              placeholder="Buscar"
              type="text"
              value={search}
              name="search"
              id="search"
              onChange={onChangeSearch}
            />
          </div>
        </div>
        <section ref={filterMenurRef} className="relative">
          <button
            onClick={() =>
              openFilterMenu
                ? setOpenFilterMenu(false)
                : setOpenFilterMenu(true)
            }
            type="submit"
            className={`flex cursor-pointer py-[8px] px-[12px] rounded-[5px] transition-background duration-[0.4s] ${
              openFilterMenu
                ? "bg-[#e0e0eb]"
                : "bg-[#F2F4F7] hover:bg-[#e0e0eb]"
            }`}
          >
            <FunnelIcon className="mr-[6px]" width={17} color="#1A1A32" />
            <p className="text-[14px] text-[#1A1A32] font-semibold">
              Filtrar por
            </p>
          </button>
          <aside
            ref={filterMenurRef}
            className={`absolute top-[42px] left-0 transition-opacity duration-[0.5s] ${
              openFilterMenu ? "opacity-100 block" : "opacity-0 invisible"
            }`}
          >
            <Select
              className="w-[300px]"
              placeholder={
                <p className="text-[15px] text-[#838D96]">
                  Selecciona una opción
                </p>
              }
              theme={theme}
              options={filterOptions}
              styles={generalSelectStyle}
              maxMenuHeight={190}
              onChange={onChangeSelectFilter}
            />
          </aside>
        </section>
      </article>

      <hr className="mb-[15px] bg-gray-200" />

      <h1 className="text-[#1A1A32] text-[16px] font-semibold">
        Total de obras
        {store_my_art_works
          ? store_my_art_works.result.length > 0
            ? store_my_art_works.result.length
            : " 0"
          : " . . ."}
      </h1>

      <section className="mt-[15px] mb-[30px]">
        <div className="grid grid-cols-4 gap-3 mb-[15px]">
          <div className="flex items-center">
            <h2 className="text-[#1A1A32] text-[14px] font-[500]">Titulo</h2>
            <ChevronUpDownIcon
              className="ml-[2px]"
              width={20}
              color="#464747"
            />
          </div>
          <div className="flex items-center">
            <h2 className="text-[#1A1A32] text-[14px] font-[500]">Artista</h2>
          </div>

          <div className="flex items-center">
            <h2 className="text-[#1A1A32] text-[14px] font-[500]">Link</h2>
          </div>

          <div className="flex items-center">
            <h2 className="text-[#1A1A32] text-[14px] font-[500]">Creado</h2>
          </div>
        </div>
        <hr className="bg-gray-200" />

        {/* -------------------------- */}
        {artWorks && artWorks.length > 0 ? (
          artWorks?.map((index) => {
            return (
              <span key={index.id}>
                <div className="grid grid-cols-4 gap-4 py-[4px] transition-background duration-[0.2s] hover:bg-[#f2f3f6]">
                  <div className="flex items-center">
                    <img
                      className="rounded-[50%] w-[35px] h-[35px] object-cover"
                      alt="artWorkImg"
                      src={index.image_url}
                    />
                    <h2 className="text-[#838D96] text-[14px] font-[500] ml-[9px]">
                      {index.title
                        ? index.title.length > 15
                          ? `${index.title.substring(0, 15)} . . .`
                          : index.title
                        : "----"}
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <h2 className="text-[#838D96] text-[14px] font-[400]">
                      {index.principal_or_first_maker.length > 20
                        ? `${index.principal_or_first_maker.substring(
                            0,
                            20,
                          )} . . .`
                        : index.principal_or_first_maker}
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <a
                      href={index.link}
                      target="_blank"
                      className="text-[#838D96] text-[14px] font-[400] cursor-pointer hover:underline"
                    >
                      Enlace directo a la obra oficial
                    </a>
                  </div>
                  <div className="flex items-center justify-between pr-[10px]">
                    <h2 className="text-[#838D96] text-[14px] font-[400]">
                      2050-04-25
                    </h2>
                    <div className={`flex`}>
                      <EyeIcon
                        onClick={() => {
                          store.setState({
                            popUp_view_art_work: {
                              visibility: true,
                              imageUrl: index.image_url,
                            },
                          });
                        }}
                        className="cursor-pointer text-[#838D96] transition-color duration-[0.6s] hover:text-[#2f2f2f]"
                        width={21}
                      />

                      <TrashIcon
                        onClick={() => {
                          store.setState({
                            popUp_delete_art_work: {
                              visibility: true,
                              artWorkId: index.id_original,
                            },
                          });
                        }}
                        className="ml-[4px] cursor-pointer text-[#838D96] transition-color duration-[0.6s] hover:text-[#2f2f2f]"
                        width={21}
                      />
                    </div>
                  </div>
                </div>
                <hr className="bg-gray-200" />
              </span>
            );
          })
        ) : store_my_art_works === null ? (
          <div className="flex justify-center mt-[100px]">
            <span className="loader"></span>
          </div>
        ) : (
          <h1 className="text-[#1A1A32] text-[16px] font-semibold text-center mt-[100px]">
            No se encontraron obras .
          </h1>
        )}
        {/* -------------------------- */}
      </section>
    </main>
  );
}
