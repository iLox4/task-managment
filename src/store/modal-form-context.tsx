import { ReactElement, createContext, useState } from "react";

import { Task } from "./task-context";
import { Category } from "./category-context";

type ModalTypes = "category" | "task";

type ModalState = {
  isOpen: boolean;
  type: ModalTypes;
  task: Task | null;
  category: Category | null;
};

type openFormParams = {
  type: ModalTypes;
  task: Task | null;
  category: Category | null;
};

type ModalContext = {
  modalFormData: ModalState;
  openFormModal: (params: openFormParams) => void;
  closeFormModal: () => void;
};

export const ModalFormContext = createContext<ModalContext>({
  modalFormData: {
    isOpen: false,
    type: "category",
    task: null,
    category: null,
  },
  openFormModal: () => {},
  closeFormModal: () => {},
});

export default function ModalFormContextProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: "category",
    task: null,
    category: null,
  });

  const handleOpenModal = ({ type, task, category }: openFormParams): void => {
    setModalState({ isOpen: true, type, task, category });
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = (): void => {
    setModalState((prevState) => ({ ...prevState, isOpen: false }));
    document.body.style.overflow = "auto";
  };

  const ctxValue: ModalContext = {
    modalFormData: modalState,
    openFormModal: handleOpenModal,
    closeFormModal: handleCloseModal,
  };

  return (
    <ModalFormContext.Provider value={ctxValue}>
      {children}
    </ModalFormContext.Provider>
  );
}
