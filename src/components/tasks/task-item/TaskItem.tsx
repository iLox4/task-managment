import styled from "styled-components";

const TaskCard = styled.div`
  width: 100%;
  border: 1px transparent solid;
  border-radius: 4px;
  background-color: #3f3f3f;
  margin: 5px 0px;
  display: flex;
  justify-content: space-between;
  padding: 5px;

  h4 {
    cursor: pointer;
  }
`;

const TaskInfo = styled.div`
  display: flex;
  gap: 20px;

  p {
    display: inline;
  }
`;

const EditBtn = styled.button`
  border: 1px transparent solid;
  border-radius: 8px;
  cursor: pointer;
  padding: 5px 10px;
  background-color: #626262;

  &:hover {
    background-color: #737373;
  }
`;

export default function TaskItem({
  title,
  deadline,
  onDelete,
  onEdit,
}: {
  title: string;
  deadline: string;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const deadlineDate = new Date(deadline).toLocaleDateString();

  return (
    <TaskCard>
      <h4 onClick={onDelete}>{title}</h4>
      <TaskInfo>
        <p>Deadline - {deadlineDate}</p>
        <EditBtn onClick={onEdit}>edit</EditBtn>
      </TaskInfo>
    </TaskCard>
  );
}
