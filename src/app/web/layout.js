"use client";

import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  CubeIcon,
  ArrowRightEndOnRectangleIcon,
  BuildingLibraryIcon,
  FireIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

import store from "../web-modules/store/index.store";

// import popUps
import ViewArtWork from "../web-modules/components/modals/pop_ups/view-art-work.popup";
import DeleteArtWork from "../web-modules/components/modals/pop_ups/delete-art-work.popup";
import UserData from "../web-modules/components/modals/pop_ups/user-data.popup";

export function Layout({ children }) {
  const router = useRouter();
  const currentPathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);

  // ___ Zustand ___
  // Initial visibility states of each pop-up - zustand
  const store_popUp_view_art_work = store((state) => state.popUp_view_art_work);
  const store_popUp_delete_art_work = store(
    (state) => state.popUp_delete_art_work,
  );
  const store_popUp_user_data = store((state) => state.popUp_user_data);

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

      {/* End Pop ups */}


      {/* HEADER */}
      <nav className="block sm:hidden bg-slate-700 bg-opacity-30 py-3 pl-3 fixed top-0 border-b-[1px] border-slate-700 border-opacity-5 left-0 right-0 z-[3] shadow-[5px_0px_16px_rgba(0,0,0,0.3)]">
        <Bars3Icon cursor={"pointer"} onClick={() => setOpenMenu(!openMenu)} width={32} color="#1a1a32" />
      </nav>

      <aside className="sm:pl-[190px]">
        {children}
      </aside>

      <nav className={`flex flex-col justify-between pb-[30px] absolute w-[190px] top-0 z-[10] pt-[15px] sm:pt-[30px] h-[100vh] border-solid border-r-[2px] bg-white shadow-[5px_0px_16px_rgba(0,0,0,0.3)] transition-left duration-[.6s] ${openMenu ? "left-0 sm:left-0" : "left-[-200px] sm:left-0"}`}>
        <aside>
          <div className="flex justify-end mx-2 mb-2 sm:hidden">
            <XMarkIcon cursor={"pointer"} onClick={() => setOpenMenu(!openMenu)} width={32} color="1a1a32" />
          </div>

          <div
            onClick={() => {
              router.push("/web/home");
            }}
            className={`flex cursor-pointer items-center pt-[10px] pb-[10px] pl-[12px] ml-[12px] mr-[16px] rounded-[4px] ${currentPathname === "/web/home" ? "underline cursor-default" : "hover:underline cursor-pointer"}`}
          >
            <CubeIcon width={20} color="#507b56" />
            <p className="text-[#1f4d3a] text-[14px] ml-[8px]"> Home </p>
          </div>

          <div
            onClick={() => {
              router.push("/web/all-art-works");
            }}
            className={`flex cursor-pointer items-center pt-[10px] pb-[10px] pl-[12px] ml-[12px] mr-[16px] ${currentPathname === "/web/all-art-works" ? "underline cursor-default" : "hover:underline cursor-pointer"}`}
          >
            <BuildingLibraryIcon width={20} color="#507b56" />
            <p className="text-[#1f4d3a] text-[14px] ml-[8px]"> Rijksmuseum </p>
          </div>

          <div
            onClick={() => {
              router.push("/web/my-art-works");
            }}
            className={`flex items-center pt-[10px] pb-[10px] pl-[12px] ml-[12px] mr-[16px] rounded-[4px] ${currentPathname === "/web/my-art-works" ? "underline cursor-default" : "hover:underline cursor-pointer"}`}
          >
            <FireIcon width={20} color="#507b56" />
            <p className="text-[#1f4d3a] text-[14px] ml-[8px]"> Mis obras </p>
          </div>
        </aside>

        <aside className="mt-2">
          <div
            onClick={() => {
              Cookies.remove("email");
              router.push("/");
            }}
            className={`flex cursor-pointer items-center pt-[10px] pb-[10px] pl-[12px] ml-[12px] mr-[16px] rounded-[4px] hover:underline`}
          >
            <ArrowRightEndOnRectangleIcon width={20} color="red" />
            <p className="text-red-500 text-[14px] ml-[8px]"> Cerrar sesión </p>
          </div>
        </aside>
      </nav>
      {/* ----------------------------- */}
    </main>
  );
}

export default Layout;
