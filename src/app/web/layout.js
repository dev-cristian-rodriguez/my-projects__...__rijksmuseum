"use client";

import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

import store from "../web-modules/store/index.store";

// import popUps
import ViewArtWork from "../web-modules/components/modals/pop_ups/view-art-work.popup";
import DeleteArtWork from "../web-modules/components/modals/pop_ups/delete-art-work.popup";
import UserData from "../web-modules/components/modals/pop_ups/user-data.popup";

export function Layout({ children }) {
  const router = useRouter();

  // ___ Zustand ___
  // Initial visibility states of each pop-up - zustand
  const store_popUp_view_art_work = store((state) => state.popUp_view_art_work);
  const store_popUp_delete_art_work = store(
    (state) => state.popUp_delete_art_work
  );
  const store_popUp_user_data = store((state) => state.popUp_user_data);

  const [openMenuProfile, setOpenMenuProfile] = useState(false);
  const [openMenuArtWorks, setopenMenuArtWorks] = useState(false);

  const menuArtWorks = useRef(null);
  const buttonmenuArtWorks = useRef(null);

  const menuProfileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuProfileRef.current &&
        !menuProfileRef.current.contains(event.target)
      ) {
        setOpenMenuProfile(false);
      }

      if (
        menuArtWorks.current &&
        !menuArtWorks.current.contains(event.target) &&
        buttonmenuArtWorks.current &&
        !buttonmenuArtWorks.current.contains(event.target)
      ) {
        setopenMenuArtWorks(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      {/* Pop ups */}
      <ViewArtWork
        visibility={store_popUp_view_art_work.visibility}
        imageUlr={store_popUp_view_art_work.imageUrl}
      />
      <DeleteArtWork
        visibility={store_popUp_delete_art_work.visibility}
        artWorkId={store_popUp_delete_art_work.artWorkId}
      />

      <UserData visibility={store_popUp_user_data.visibility} />

      {/* ----------------------------- */}

      {/* Navbar */}
      <nav className="flex items-center justify-between fixed px-[25px] h-[57px] w-full bg-[#1a1a32] top-0 left-0 z-[5]">
        <img
          className={"w-[150px]"}
          src="https://www.amsterdamtimemachine.nl/wp-content/uploads/2018/10/Rijksmuseum.png"
          alt="logo"
        />

        <section className="flex items-center relative">
          <UserIcon
            className="bg-[#29294b] rounded-[50%] p-[5px]"
            width={30}
            height={30}
            color="white"
          />

          <h1 className="text-[#ffffff] text-[14px] font-normal  mx-[13px] ">
            Dev user
          </h1>

          {openMenuProfile ? (
            <ChevronUpIcon
              width={16}
              color="white"
              cursor={"pointer"}
              onClick={() =>
                openMenuProfile
                  ? setOpenMenuProfile(false)
                  : setOpenMenuProfile(true)
              }
            />
          ) : (
            <ChevronDownIcon
              width={16}
              color="white"
              cursor={"pointer"}
              onClick={() =>
                openMenuProfile
                  ? setOpenMenuProfile(false)
                  : setOpenMenuProfile(true)
              }
            />
          )}
          <aside
            ref={menuProfileRef}
            className={`absolute bottom-[-114px] left-[-16px] w-[165px] rounded-[10px] py-[12px] pl-[20px] shadow-[0_5px_15px_5px_rgba(0,0,0,0.2)] bg-white transition-all duration-500 ease-in-out  ${openMenuProfile
              ? "block translate-y-[0px] opacity-[1]"
              : "opacity-[0] translate-y-[-20px] invisible"
              }`}
          >
            <div>
              <p
                onClick={() => {
                  store.setState({ popUp_user_data: { visibility: true } });
                }}
                className="cursor-pointer text-[15px] text-[#1A1A32] mb-[16px] transition-color duration-500  hover:text-[#4a4ac7]"
              >
                Mi cuenta
              </p>

              <p
                onClick={() => {
                  Cookies.remove("email");
                  router.push("/");
                }}
                className="cursor-pointer text-[15px] text-[#1A1A32] mb-[6px] transition-color duration-500  hover:text-[#4a4ac7]"
              >
                Cerrar sesión
              </p>
            </div>
          </aside>
        </section>
      </nav>

      <aside className="pt-[58px] pl-[50px]">
        <div
          className={`relative transition-blur duration-500 ${openMenuArtWorks ? "blur-[4px]" : ""
            }`}
        >
          {children}
          <div
            className={`absolute top-0 w-full h-full z-[3] opacity-[0] ${openMenuArtWorks ? "block" : "hidden"
              }`}
          ></div>
        </div>
      </aside>

      <nav className="fixed top-0 left-0 z-[4]">
        <article className="relative">
          <section className="flex flex-col z-[5] pt-[78px] pb-[10px] w-[50px] items-center justify-between bg-[#1a1a32] h-[100vh]">
            <div>
              <HomeIcon
                onClick={() => router.push("/web/home")}
                className={`${openMenuArtWorks ? "mb-[8px]" : "mb-[2px]"
                  } p-[5px] rounded-[3px] cursor-pointer transition-background transition-scale transition-margin duration-[0.3s] hover:bg-[#34345e] hover:scale-[0.9] `}
                width={34}
                color="white"
              />

              <AcademicCapIcon
                ref={buttonmenuArtWorks}
                className={`${openMenuArtWorks ? "mb-[8px]" : "mb-[2px]"
                  } p-[5px] rounded-[3px] cursor-pointer transition-background transition-scale transition-margin duration-[0.4s] ${openMenuArtWorks
                    ? "scale-[1.2] bg-[#4e4e7c]"
                    : "hover:scale-[0.9] hover:bg-[#34345e]"
                  } `}
                width={34}
                onClick={() =>
                  openMenuArtWorks
                    ? setopenMenuArtWorks(false)
                    : setopenMenuArtWorks(true)
                }
                color="white"
              />
            </div>
            <div>
              <QuestionMarkCircleIcon
                onClick={() => alert("Menu de preguntas . . .")}
                className="mb-[2px] p-[5px] rounded-[3px] cursor-pointer transition-background duration-[0.5s] hover:bg-[#34345e]"
                width={31}
                color="white"
              />
            </div>
          </section>

          {/* SECTION: ARTWORKS */}
          <section
            ref={menuArtWorks}
            className={`absolute top-0 left-[51px] z-[6] flex-col pt-[78px] w-[190px]  pb-[10px] h-[100vh] border-solid border-r-[2px] bg-white shadow-[5px_0px_16px_rgba(0,0,0,0.2)] transition-all duration-[0.5s] ${openMenuArtWorks
              ? "w-[190px] opacity-[1] translate-x-0 animate-increseWidth"
              : "w-[220px] opacity-[0] translate-x-[10%] invisible"
              }`}
          >
            <div
              onClick={() => {
                router.push("/web/all-art-works");
                setTimeout(() => {
                  setopenMenuArtWorks(false);
                }, 200);
              }}
              className={`flex cursor-pointer items-center pt-[10px] pb-[10px] pl-[12px] ml-[12px] mr-[16px] rounded-[4px] transition-background duration-[0.2s] hover:bg-[#D9E0EB] `}
            >
              <BuildingLibraryIcon width={20} color="#1A1A32" />
              <p className="text-[#1A1A32] text-[14px] ml-[8px]">Rijksmuseum</p>
            </div>
            <div
              onClick={() => {
                router.push("/web/my-art-works");
                setTimeout(() => {
                  setopenMenuArtWorks(false);
                }, 200);
              }}
              className={`flex cursor-pointer items-center pt-[10px] pb-[10px] pl-[12px] ml-[12px] mr-[16px] rounded-[4px] transition-background duration-[0.2s] hover:bg-[#D9E0EB] `}
            >
              <UserIcon width={20} color="#1A1A32" />
              <p className="text-[#1A1A32] text-[14px] ml-[8px]">Mis obras</p>
            </div>
          </section>
        </article>
      </nav>
      {/* ----------------------------- */}
    </main>
  );
}

export default Layout;
