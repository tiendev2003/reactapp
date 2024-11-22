import {
  Avatar,
  Badge,
  Card,
  Grid,
  Table,
  Text,
  Pagination,
} from "@mantine/core";
import { ArrowRIcon, ArrowGIcon } from "../../assets/assets";
import Edit from "../../assets/Edit.svg";
import { useSelector } from "react-redux";
import { useState } from "react";
import TransactionEditForm from "./TransactionEditForm";

export default function TransactionList() {
  const transactionList = useSelector(
    (state) => state.transaction.transactionList
  );
  const isMobile = useSelector((state) => state.user.isMobile);

  const [currentPage, setCurrentPage] = useState(1);
  const [displayTransactionEditForm, setDisplayTransactionEditForm] =
    useState(false);
  const [selectedEditElement, setSelectedEditElement] = useState(null);

  const itemsPerPage = 6; // Số giao dịch trên mỗi trang
  const totalPages = Math.ceil(transactionList.length / itemsPerPage);

  // Lấy danh sách giao dịch hiển thị trên trang hiện tại
  const currentData = transactionList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handleTransactionEditFormClose() {
    setDisplayTransactionEditForm(false);
  }
  function handleTransactionEditFormOpen(element) {
    setSelectedEditElement(element);
    setDisplayTransactionEditForm(true);
  }

  const dateCol = (date) => {
    const dateTime = new Date(date);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    return isMobile ? (
      <Text fw={700} fz="md">
        {dateTime.toLocaleDateString("en-US", dateOptions)}
      </Text>
    ) : (
      <div>
        <Text fw={700} fz="md">
          {dateTime.toLocaleDateString("en-US", dateOptions)}
        </Text>
        <Text fw={500} c="dimmed" fz="sm">
          {dateTime.toLocaleTimeString("en-US")}
        </Text>
      </div>
    );
  };

  const categoryCol = (category) => {
    return category.type === "income" ? (
      <Badge color="green">{category.name}</Badge>
    ) : (
      <Badge color="red">{category.name}</Badge>
    );
  };

  const accountDetails = (account, paymentType) => (
    <div>
      <Text fw={700} fz="md">
        {account.name}
      </Text>
      <Text fw={500} c="dimmed" fz="sm">
        {paymentType}
      </Text>
    </div>
  );

  const amountCol = (amount, type) => (
    <Text
      fw={700}
      fz="md"
      style={{ color: type === "income" ? "#26AB35" : "black" }}
    >
      {type === "income" ? "+" : "-"}
      {amount.toLocaleString("en-US")} VND
    </Text>
  );

  const paytype = (element) => (
    <img
      src={Edit}
      onClick={() => handleTransactionEditFormOpen(element)}
      alt="Edit"
      style={{ cursor: "pointer" }}
    />
  );

  const rows = currentData.map((element) =>
    isMobile ? (
      <Card
        key={element.id}
        radius="md"
        p="sm"
        withBorder
        style={{ marginBottom: 8 }}
      >
        {/* Card content here */}
      </Card>
    ) : (
      <tr key={element.id}>
        <td>{dateCol(element.dateTime)}</td>
        <td>{categoryCol(element.category)}</td>
        <td>{accountDetails(element.account, element.paymentType)}</td>
        <td>{amountCol(element.amount, element.category.type)}</td>
        <td>{paytype(element)}</td>
      </tr>
    )
  );

  return (
    <div>
      {displayTransactionEditForm && (
        <TransactionEditForm
          element={selectedEditElement}
          open={displayTransactionEditForm}
          close={handleTransactionEditFormClose}
        />
      )}
      {isMobile ? (
        <div>
          <Text fw={"700"} style={{ marginBottom: 3, marginTop: 10 }}>
            History
          </Text>
          <Text fz={"xs"} style={{ marginBottom: 10 }}>
            Recent transactions from all your accounts
          </Text>
          <div>{rows}</div>
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>DATE & TIME</th>
              <th>TRANSACTION DETAILS</th>
              <th>ACCOUNT DETAILS</th>
              <th>AMOUNT</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
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
