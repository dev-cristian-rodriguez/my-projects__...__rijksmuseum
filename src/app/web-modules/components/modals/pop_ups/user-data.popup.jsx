"use client";

import Cookies from "js-cookie";
import ReactCountryFlag from "react-country-flag";
import { useState, useEffect } from "react";
import {
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PlusIcon,
  TagIcon,
  TrashIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

import ModalManager from "../modal-manager/modal-manager";

import Loader from "../../common/loader";
import { toast } from "sonner";
import store from "@/app/web-modules/store/index.store";

export default function UserData({ visibility }) {
  const emailCookie = Cookies.get("email");

  const [open, setOpen] = useState(visibility);
  const [loader, setLoader] = useState(false);

  const [name, setName] = useState("");

  const [copyIcon1, setCopyIcon1] = useState(false);
  const [copyIcon2, setCopyIcon2] = useState(false);

  useEffect(() => {
    setOpen(visibility);
  }, [visibility]);

  useEffect(() => {
    if (copyIcon1) {
      setTimeout(() => {
        setCopyIcon1(false);
      }, 2000);
    }

    if (copyIcon2) {
      setTimeout(() => {
        setCopyIcon2(false);
      }, 2000);
    }
  }, [copyIcon1, copyIcon2]);

  function onChangeName(e) {
    setName(e.target.value);
  }

  function onClickUpdateUser() {
    setLoader(true);

    setTimeout(() => {
      toast.success("Datos actualizados");
      setLoader(false);
      store.setState({
        popUp_user_data: { visibility: false },
      });
    }, 2000);
  }

  function closePopUp() {
    store.setState({ popUp_user_data: { visibility: false } });
    return;
  }

  return (
    <ModalManager
      width={"540px"}
      height={null}
      isOpen={open}
      onClose={closePopUp}
    >
      <article className="rounded-[10px] pb-[22px]">
        <aside className="flex justify-end py-[16px] bg-[#DFE4EA]">
          <XMarkIcon
            onClick={closePopUp}
            className="cursor-pointer mr-[9px] text-[#1A1A32] w-[28px] h-[28px] "
          />
        </aside>

        <aside className="px-[40px]">
          <section className="relative inline-block">
            <img
              className="border-[4px] border-[#ffffff] rounded-[50%] mt-[-24px]"
              src="https://s3-alpha-sig.figma.com/img/3d5c/b72f/ae1e058c2ed75ab981a9f8bb62e96a13?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4Wxo0rHz4iqEmtwGEmyjn19vkR3ro16vKHKvFRgrfFW0Y8beVAY0AOxfckZO5wZduJd9onlS0uLLGm62jHyN-O--4yFruefmR4QGAFk3PXlEaqaMd3yII8~DPaYei03IOJAyseaxF5N0ZCDsSc7TbDXboMXj5Qu-FRBjP5bmxUqutt8dqKWD1LCtpiEr77Uyeo6sgLMQ0iPBtFM28lL7nF4L0l9u2v884XUz3Bid~N-36xlhY3~Nk0elg26rmYPZZ-RuY3Se6dvMcV6342tMLftfopqozccm-Hano4BZG~vxooDq~ky9GRnzLHFD~RaOGXL7Y7r4GL5mTxADJx8XQ__"
              alt="robot icon"
              width={72}
            />

            <ReactCountryFlag
              countryCode="CO"
              svg
              cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
              cdnSuffix="svg"
              title="CO"
              className="absolute bottom-[3px] right-[1px] border-[2px] border-[#ffffff]"
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
              }}
            />
          </section>

          <section className="flex justify-between items-center">
            <h1 className="text-[#0f172a] text-[20px] font-semibold">
              {name
                ? name.length > 15
                  ? name.slice(0, 15) + " . . ."
                  : name
                : "Asignar un nombre"}
            </h1>
            <div className="text-[#6564DB] flex border-[1px] cursor-pointer border-[#6564DB] rounded-[5px] px-[12px] py-[5px] transition-background duration-[0.4s] hover:bg-[#6564DB] hover:text-[#ffffff]">
              <ChatBubbleOvalLeftEllipsisIcon
                className="mr-[5px]"
                width={20}
                height={20}
              />
              <p className="text-[14px]"> Redes </p>
            </div>
          </section>

          <section className="flex flex-col mt-[21px]">
            <label htmlFor="search">
              <p className="mb-[5px] text-[14px] text-[#1A1A32]">
                Nombre
                <span className="text-red-600 text-[18px]">*</span>
              </p>
            </label>

            <input
              className="outline-none py-[8px] pl-[15px] text-[14px] text-[#1A1A32] rounded-[6px] border-[1px] border-gray-300"
              placeholder="Nombre"
              type="text"
              value={name}
              name="name"
              id="name"
              onChange={onChangeName}
            />
          </section>

          <section className="flex justify-between mt-[23px] ">
            <div className="w-[45%] ">
              <label htmlFor="number">
                <p className="mb-[5px] text-[14px] text-[#1A1A32]">
                  Teléfono
                  <span className="text-red-600 text-[18px]">*</span>
                </p>
              </label>

              <div className="flex py-[8px] pl-[15px] bg-[#E5E7EB] text-[14px] text-[#1A1A32] rounded-[6px] border-[1px] border-gray-300">
                <input
                  className="outline-none w-full bg-[#E5E7EB] text-[#647185] cursor-default "
                  type="text"
                  value="+ 57 3144095260"
                  name="numbuer"
                  id="number"
                  readOnly
                />
                <div className="ml-[10px] relative">
                  <p
                    className={`absolute top-[-30px] bg-[#6564DB] text-[#ffffff] text-[11px] rounded-[6px] px-[10px] py-[5px] transition-opacity duration-500 ${
                      copyIcon1 ? "opacity-100" : "opacity-0 invisible"
                    }`}
                  >
                    Copiado
                  </p>
                  <ClipboardDocumentIcon
                    width={16}
                    height={16}
                    onClick={() => {
                      window.navigator.clipboard.writeText(contactNumber);
                      setCopyIcon1(true);
                    }}
                    className="cursor-pointer mr-[9px] text-[#6564DB]"
                  />
                </div>
              </div>
            </div>
            <div className="w-[50%] ">
              <label htmlFor="email">
                <p className="mb-[5px] text-[14px] text-[#1A1A32]">
                  Correo electrónico
                  <span className="text-red-600 text-[18px]">*</span>
                </p>
              </label>

              <div className="flex py-[8px] pl-[15px] bg-[#E5E7EB] text-[14px] text-[#1A1A32] rounded-[6px] border-[1px] border-gray-300">
                <input
                  className="outline-none w-full bg-[#E5E7EB] text-[#647185] cursor-default "
                  placeholder="Correo Electronico"
                  type="email"
                  value={emailCookie}
                  name="email"
                  id="email"
                />
                <div className="ml-[10px] relative">
                  <p
                    className={`absolute top-[-30px] bg-[#6564DB] text-[#ffffff] text-[11px] rounded-[6px] px-[10px] py-[5px] transition-opacity duration-500 ${
                      copyIcon2 ? "opacity-100" : "opacity-0 delay-500"
                    } ${copyIcon2 ? "visible" : "invisible"}`}
                  >
                    Copiado
                  </p>
                  <ClipboardDocumentIcon
                    width={16}
                    height={16}
                    onClick={() => {
                      window.navigator.clipboard.writeText(contactEmail);
                      setCopyIcon2(true);
                    }}
                    className="cursor-pointer mr-[9px] text-[#6564DB]"
                  />
                </div>
              </div>
            </div>
          </section>

          <hr className="mt-[24px]" />

          <hr className="mt-[16px]" />

          <section>
            <div className="flex justify-between">
              <button
                onClick={closePopUp}
                className="py-[6px] w-[47%] text-[#6564DB] text-[17px] font-normal rounded-[4px] border-[1px] border-[#6564DB]"
              >
                Cancelar
              </button>
              <button
                onClick={onClickUpdateUser}
                className={`py-[6px] w-[47%] text-[#FFFFFF] text-[17px] font-normal rounded-[4px] border-[1px] transition-[background-color] duration-[0.15s] ease-[ease-in-out] ${
                  loader
                    ? "bg-[#595bbf] cursor-default"
                    : "bg-[#6465DB] hover:bg-[#595bbf]"
                } `}
              >
                {loader ? (
                  <div className="flex justify-center">
                    <Loader color={"#CCCCCC"} size={16} />
                  </div>
                ) : (
                  "Guardar"
                )}
              </button>
            </div>
          </section>
        </aside>
      </article>
    </ModalManager>
  );
}
