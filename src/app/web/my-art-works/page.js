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
          <p className="text-[13px] text-[#838D96]">Artista</p>
        </div>
      ),
    },
  ];

  return (
    <main className="mx-[24px] mb-[18px] mt-[70px] sm:mt-[18px]">
      <h1 className="text-[#1f4d3a] text-[24px] font-semibold mb-[7px]">
        Mis obras de arte
      </h1>
      <p className="text-[#1f4d3a] text-[14px] underline">
        Administra y gestiona todos tus obras que se encuentran guardadas en tu
        base de datos .
      </p>
      <article className="flex flex-col sm:flex-row mt-[15px] mb-[22px]">
        <div className="mr-[10px]">
          <div
            className={`flex items-center py-[8px] pl-[15px] text-[14px] text-[#464747] w-full sm:w-[300px] rounded-[6px] border-[1px] border-gray-300`}
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
        <section ref={filterMenurRef} className="relative">
          <button
            onClick={() =>
              openFilterMenu
                ? setOpenFilterMenu(false)
                : setOpenFilterMenu(true)
            }
            type="submit"
            className={`flex cursor-pointer py-[8px] px-[12px] rounded-[5px] mt-2 w-full justify-center sm:mt-0 transition-background duration-[0.4s] ${openFilterMenu
              ? "bg-[#e0e0eb]"
              : "bg-[#F2F4F7] hover:bg-[#e0e0eb]"
              }`}
          >
            <FunnelIcon className="mr-[6px]" width={17} color="#1f4d3a" />
            <p className="text-[14px] text-[#1f4d3a] font-semibold">
              Filtros
            </p>
          </button>
          <aside
            ref={filterMenurRef}
            className={`absolute top-[55px] sm:top-[45px] left-0 transition-opacity duration-[0.5s] ${openFilterMenu ? "opacity-100 block" : "opacity-0 invisible"
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

      {/* Table in mobile version */}
      {
        artWorks?.length > 0 && (
          artWorks?.map(item => {
            return (
              <section key={item.id} className="flex lg:hidden items-center gap-6 mb-6 w-full sm:w-[450px]">
                <aside className="w-[10%]">
                  <img
                    className="rounded-[50%] w-[40px] h-[40px] object-cover"
                    alt="artWorkImg"
                    src={item.image_url}
                  />
                </aside>

                <aside className="flex flex-col w-[80%]">
                  <h1 className="text-[14px] truncate">
                    {item.title
                      ? item.title.length > 20
                        ? `${item.title.substring(0, 20)} . . .`
                        : item.title
                      : "----"}
                  </h1>
                  <div className="text-[12px]">
                    <span className="font-bold">Autor: {" "}</span>
                    <span className="truncate">
                      {item.principal_or_first_maker.length > 20
                        ? `${item.principal_or_first_maker.substring(
                          0,
                          20,
                        )} . . .`
                        : item.principal_or_first_maker}
                    </span>
                    <span className="truncate"> 2050-04-25 </span>
                  </div>
                </aside>

                <aside className="flex w-[12%]">
                  <EyeIcon
                    onClick={() => {
                      store.setState({
                        popUp_view_art_work: {
                          visibility: true,
                          imageUrl: item.image_url,
                        },
                      });
                    }}
                    color="#1f4d3a"
                    className="cursor-pointer transition-color duration-[0.6s] hover:text-[#2f2f2f]"
                    width={21}
                  />

                  <TrashIcon
                    onClick={() => {
                      store.setState({
                        popUp_delete_art_work: {
                          visibility: true,
                          artWorkId: item.id_original,
                        },
                      });
                    }}
                    color="red"
                    className="ml-[4px] cursor-pointer"
                    width={21}
                  />
                </aside>
              </section>
            )
          })
        )
      }

      {/* Table in desktop version */}
      <section className="mt-[20px] mb-[30px] hidden lg:block">
        <div className="grid grid-cols-4 gap-3 mb-[15px] text-[#1f4d3a] text-[14px] font-bold underline">
          <h2>Titulo</h2>
          <h2>Artista</h2>
          <h2>Link</h2>
          <h2>Creado</h2>
        </div>
        <hr className="bg-gray-200" />

        {/* -------------------------- */}
        {artWorks?.length > 0 && (
          artWorks?.map((item) => {
            return (
              <span key={item.id}>
                <div className="grid grid-cols-4 gap-4 py-[4px] transition-background duration-[0.2s] hover:bg-[#f2f3f6]">
                  <div className="flex items-center">
                    <img
                      className="rounded-[50%] w-[35px] h-[35px] object-cover"
                      alt="artWorkImg"
                      src={item.image_url}
                    />
                    <h2 className="text-[#1f4d3a] text-[14px] font-[500] ml-[9px] truncate">
                      {item.title
                        ? item.title.length > 15
                          ? `${item.title.substring(0, 15)} . . .`
                          : item.title
                        : "----"}
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <h2 className="text-[#1f4d3a] text-[14px] font-[400]">
                      {item.principal_or_first_maker.length > 20
                        ? `${item.principal_or_first_maker.substring(
                          0,
                          20,
                        )} . . .`
                        : item.principal_or_first_maker}
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <a
                      href={item.link}
                      target="_blank"
                      className="text-blue-950 text-[14px] font-[400] cursor-pointer hover:underline"
                    >
                      Enlace directo a la obra oficial
                    </a>
                  </div>
                  <div className="flex items-center justify-between pr-[10px]">
                    <h2 className="text-[#1f4d3a] text-[14px] font-[400]">
                      2050-04-25
                    </h2>
                    <div className={`flex`}>
                      <EyeIcon
                        onClick={() => {
                          store.setState({
                            popUp_view_art_work: {
                              visibility: true,
                              imageUrl: item.image_url,
                            },
                          });
                        }}
                        color="#1f4d3a"
                        className="cursor-pointer transition-color duration-[0.6s] hover:text-[#2f2f2f]"
                        width={21}
                      />

                      <TrashIcon
                        onClick={() => {
                          store.setState({
                            popUp_delete_art_work: {
                              visibility: true,
                              artWorkId: item.id_original,
                            },
                          });
                        }}
                        color="red"
                        className="ml-[4px] cursor-pointer"
                        width={21}
                      />
                    </div>
                  </div>
                </div>
                <hr className="bg-gray-200" />
              </span>
            );
          })
        )}

        {
          store_my_art_works === null && (
            <div className="flex justify-center mt-[100px]">
              <span className="loader"></span>
            </div>
          )
        }

        {
          artWorks?.length === 0 && store_my_art_works !== null && (
            <h1 className="text-[#1f4d3a] text-[16px] font-semibold text-center mt-[100px]">
              No se encontraron obras.
            </h1>
          )
        }
        {/* -------------------------- */}
      </section>
    </main>
  );
}
