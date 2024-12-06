"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

import store from "@/app/web-modules/store/index.store";
import ModalManager from "../modal-manager/modal-manager";
import Loader from "../../common/loader";

export default function DeleteArtWork({ visibility, artWorkId }) {
  const emailCookie = Cookies.get("email");

  const [open, setOpen] = useState(visibility);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setOpen(visibility);
  }, [visibility]);

  async function onClickDeleteArtWork() {
    setLoader(true);
    const url = `/api/art_works?email=${emailCookie}&art_work_id=${artWorkId}`;
    await fetch(url, {
      method: "DELETE",
    });
    setLoader(false);
    store.setState({ my_art_works: null });
    store.setState({
      popUp_delete_art_work: { visibility: false },
    });
    toast.success("Obra eliminada correctamente");
  }

  function closePopUp() {
    if (!loader) {
      store.setState({
        popUp_delete_art_work: { visibility: false },
      });
    }
    return;
  }

  return (
    <ModalManager
      width={"460px"}
      height={"285px"}
      isOpen={open}
      onClose={closePopUp}
    >
      <article className="rounded-[10px] bg-[#FFFFFF]">
        <aside className="flex justify-end mx-[13px] pt-[13px]">
          <XMarkIcon
            onClick={closePopUp}
            className="cursor-pointer text-[#1f4d3a] w-[27px] h-[27px]"
          />
        </aside>

        <aside className="px-[40px] mt-[7px]">
          <h1 className="text-[#0f172a] text-[20px] font-semibold">
            ¡Información importante!
          </h1>
          <p className="text-[#1f4d3a] text-[14px] py-[27px] underline">
            Al realizar esta acción, se borrara la obra de arte seleccionada de
            tu base de datos junto a su información. <br />
          </p>

          <div className="flex justify-between mt-[3px]">
            <button
              onClick={closePopUp}
              className="py-[6px] w-[47%] text-[#1f4d3a] text-[15px] font-bold underline rounded-[50px] border-[1px] border-[#1f4d3a]"
            >
              Cancelar
            </button>
            <button
              onClick={onClickDeleteArtWork}
              className={`py-[6px] w-[47%] text-[#FFFFFF] text-[15px] font-bold underline rounded-[50px] border-[1px] transition-[background-color] duration-[0.15s] ease-[ease-in-out] ${loader
                  ? "bg-[#b33535] cursor-default"
                  : "bg-[#DC2626] hover:bg-[#b33535]"
                } `}
            >
              {loader ? (
                "Cargando..."
              ) : (
                "Borrar"
              )}
            </button>
          </div>
        </aside>
      </article>
    </ModalManager>
  );
}
