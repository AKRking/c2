"use client";

import React, { useState } from "react";

interface IModalContext {
  modalInfo: { opened: boolean; type: string; _id: string };
  setModalInfo: (e: any) => void;
  deleteModalInfo: { opened: boolean; _id: string };
  setDeleteModalInfo: (e: any) => void;
}

interface Props {
  children?: React.ReactNode;
}

export const ModalContext = React.createContext<IModalContext>({
  modalInfo: { opened: false, type: "view", _id: "" },
  setModalInfo: () => {},
  deleteModalInfo: { opened: false, _id: "" },
  setDeleteModalInfo: () => {},
});

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modalInfo, setModalInfo] = useState({
    opened: false,
    type: "view",
    _id: "",
  });
  const [deleteModalInfo, setDeleteModalInfo] = useState({
    opened: false,
    _id: "",
  });

  return (
    <ModalContext.Provider
      value={{ modalInfo, setModalInfo, deleteModalInfo, setDeleteModalInfo }}
    >
      {children}
    </ModalContext.Provider>
  );
};
