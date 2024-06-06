"use client";

import { create } from "zustand";

const store = create(() => ({
  popUp_user_data: { visibility: false },
  popUp_view_art_work: { visibility: false, imageUrl: "" },
  popUp_delete_art_work: { visibility: false, artWorkId: "" },

  // ____ States ____
  // Initial State
  my_art_works: null,
  all_art_works: null,
}));

export default store;
