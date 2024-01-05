import { DUMMY_TASKS } from "../../dummy-data/dummy-tasks";
import TaskList from "./task-list/TaskList";

export default function Tasks() {
    return <div>
        <TaskList taskClass="All" tasks={DUMMY_TASKS}/>
        <TaskList taskClass="Else" tasks={DUMMY_TASKS}/>
    </div>
}