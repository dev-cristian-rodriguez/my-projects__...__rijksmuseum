"use client";

import { useState, useEffect } from "react";

import store from "@/app/web-modules/store/index.store";
import ModalManager from "../modal-manager/modal-manager";

export default function ViewArtWork({ visibility, imageUlr }) {
  const [open, setOpen] = useState(visibility);

  useEffect(() => {
    setOpen(visibility);
  }, [visibility]);

  function closePopUp() {
    store.setState({
      popUp_view_art_work: { visibility: false },
    });
    return;
  }

  return (
    <ModalManager
      width={"450px"}
      height={"450px"}
      isOpen={open}
      onClose={closePopUp}
    >
      <article className="rounded-[20px] bg-[#FFFFFF]">
        <aside>
          <img width={"100%"} height={"100%"} src={imageUlr} className="object-cover" />
        </aside>
      </article>
    </ModalManager>
  );
}
