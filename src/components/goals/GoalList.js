import { Table, Text, Pagination } from "@mantine/core";
import { useSelector } from "react-redux";
import { ReactComponent as EditSVG } from "../../assets/Edit.svg";
import { useState } from "react";
import GoalEditForm from "./GoalEditForm";

export default function GoalList() {
  const goalList = useSelector((state) => state.goal.goalList);
  const [displayGoalEditForm, setDisplayGoalEditForm] = useState(false);
  const [selectedEditElement, setSelectedEditElement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số lượng mục trên mỗi trang
  const totalPages = Math.ceil(goalList.length / itemsPerPage);

  function handleGoalEditFormClose() {
    setDisplayGoalEditForm(false);
  }

  function handleEdit(element) {
    setSelectedEditElement(element);
    setDisplayGoalEditForm(true);
  }

  function handleDate(date) {
    const formatDate = new Date(date);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    return formatDate.toLocaleDateString("en-US", dateOptions);
  }

  // Lọc danh sách mục hiển thị cho trang hiện tại
  const currentData = goalList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const rows = currentData.map((element) => (
    <tr key={element.name}>
      <td>
        <Text fw={700}>{element.name}</Text>
        <Text c={"dimmed"} size={"xs"}>
          {element.description}
        </Text>
      </td>
      <td>
        <Text fw={700}>{handleDate(element.targetDate)}</Text>
      </td>
      <td>
        <Text fw={700}>{`Rs. ${element.targetAmount}`}</Text>
      </td>
      <td>
        <Text fw={700}>{element.status}</Text>
      </td>
      <td>
        <EditSVG onClick={() => handleEdit(element)} />
      </td>
    </tr>
  ));

  return (
    <div>
      {displayGoalEditForm && (
        <GoalEditForm
          element={selectedEditElement}
          open={displayGoalEditForm}
          close={handleGoalEditFormClose}
        />
      )}
      <Table verticalSpacing="lg">
        <thead>
          <tr>
            <th>
              <Text c="dimmed">NAME</Text>
            </th>
            <th>
              <Text c="dimmed">TARGET DATE</Text>
            </th>
            <th>
              <Text c="dimmed">TARGET AMOUNT</Text>
            </th>
            <th>
              <Text c="dimmed">STATUS</Text>
            </th>
            <th>
              <Text c="dimmed">EDIT</Text>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {/* Thanh phân trang */}
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={setCurrentPage}
        position="center"
        mt="md"
      />
    </div>
  );
}
