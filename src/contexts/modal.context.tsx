import { createContext, ReactNode, useContext, useState } from "react";

import type { IPost } from "@/api/mocks/crud-posts-mock";

type ModalKey = "deletePost" | "editPost" | null;

interface ModalData {
  postId?: number;
  post?: IPost;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ModalContextType {
  openModal: (modal: ModalKey, data?: ModalData) => void;
  closeModal: () => void;
  isModalOpen: (modal: ModalKey) => boolean;
  currentModal: ModalKey;
  modalData: ModalData | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [currentModal, setCurrentModal] = useState<ModalKey>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (modal: ModalKey, data?: ModalData) => {
    setCurrentModal(modal);
    setModalData(data || null);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setModalData(null);
  };

  const isModalOpen = (modal: ModalKey) => currentModal === modal;

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isModalOpen, currentModal, modalData }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal deve ser usado dentro de ModalProvider");
  return context;
};
