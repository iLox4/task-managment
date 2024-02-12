//import styled from "styled-components";
import { useContext } from "react";
import { ModalFormContext } from "./store/modal-form-context";

import MainHeader from "./components/main-header/MainHeader";
import Tasks from "./components/tasks/Tasks";
import TaskForm from "./components/task-form/TaskForm";
import CategoryForm from "./components/category-form/CategoryForm";

function App() {
  const { modalFormData, closeFormModal } = useContext(ModalFormContext);
  const { task, category, isOpen, type } = modalFormData;

  return (
    <>
      {isOpen && type === "task" && <TaskForm task={task} closeModal={closeFormModal} />}
      {isOpen && type === "category" && <CategoryForm category={category} closeModal={closeFormModal}/>}
      <MainHeader />
      <main>
        <Tasks />
      </main>
    </>
  );
}

export default App;
