"use client";

import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import {
  CubeIcon,
  ArrowRightEndOnRectangleIcon,
  BuildingLibraryIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

import store from "../web-modules/store/index.store";

// import popUps
import ViewArtWork from "../web-modules/components/modals/pop_ups/view-art-work.popup";
import DeleteArtWork from "../web-modules/components/modals/pop_ups/delete-art-work.popup";
import UserData from "../web-modules/components/modals/pop_ups/user-data.popup";

export function Layout({ children }) {
  const router = useRouter();
  const currentPathname = usePathname();

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
      <aside className="pl-[190px]">
        {children}
      </aside>

      <nav className="fixed top-0 left-0 z-[4]">
        <article className="relative">
          <section
            className={`top-0 left-[60px] z-[6] pt-[30px] pb-[10px] h-[100vh] border-solid border-r-[2px] bg-white shadow-[5px_0px_16px_rgba(0,0,0,0.2)] transition-all duration-[0.4s] w-[190px] opacity-[1] translate-x-0`}
          >
            <aside>
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
          </section>
        </article>
      </nav>
      {/* ----------------------------- */}
    </main>
  );
}

export default Layout;
