import { useState } from "react";
import styled from "styled-components";

import UpArrow from "../../ui/icons/UpArrow";
import DownArrow from "../../ui/icons/DownArrow";
import TaskItem from "../task-item/TaskItem";

type Task = { id: string; title: string; deadline: string; importance: string };

//background-color: ${({$isTasksVisible}) => $isTasksVisible ? "transparent" : "#3f3f3f"};

const SectionHeader = styled.div<{
    $isTasksVisible: boolean
}>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  border-radius: 4px;
  padding: 5px;
  background-color: transparent;
  border-color: ${({$isTasksVisible}) => $isTasksVisible ? "transparent" : "white"};
  margin-bottom: 5px;

  button {
    padding: 0px 10px;
    display: flex;
    align-items: center;
    height: 27px;
    border: 1px transparent solid;
    border-radius: 8px;
    cursor: pointer;
    background-color: #626262;
  }

  button:hover {
    background-color: #737373;
  }
`;

export default function TaskList({
  taskClass,
  tasks,
}: {
  taskClass: string;
  tasks: Task[];
}) {
  const [isTasksVisible, setIsTasksVisible] = useState<boolean>(false);

  const handleChangeTasksVisibility = (): void => {
    setIsTasksVisible((prevVisibility) => !prevVisibility);
  };

  const tasksItems = (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          deadline={task.deadline}
          onDelete={() => console.log("deleted")}
          onEdit={() => {
            console.log("edit");
          }}
        />
      ))}
    </ul>
  );

  return (
    <div>
      <SectionHeader $isTasksVisible={isTasksVisible}>
        <h2>{taskClass}</h2>
        <button onClick={handleChangeTasksVisibility}>
          {isTasksVisible ? <UpArrow /> : <DownArrow />}
        </button>
      </SectionHeader>
      {isTasksVisible && tasksItems}
    </div>
  );
}
