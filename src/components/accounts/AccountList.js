import { Badge, Card, Grid, Pagination, Table, Text } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as EditSVG } from "../../assets/Edit.svg";
import AccountEditForm from "./AccountEditForm";

export default function AccountList() {
  const accountList = useSelector((state) => state.account.accountList);
  const isMobile = useSelector((state) => state.user.isMobile);

  const [currentPage, setCurrentPage] = useState(1);
  const [displayAccountEditForm, setDisplayAccountEditForm] = useState(false);
  const [selectedEditElement, setSelectedEditElement] = useState(null);

  const itemsPerPage = 6; // Số phần tử trên mỗi trang
  const totalPages = Math.ceil(accountList.length / itemsPerPage);

  // Lấy danh sách tài khoản hiển thị trên trang hiện tại
  const currentData = accountList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handleEdit(element) {
    setSelectedEditElement(element);
    setDisplayAccountEditForm(true);
  }

  function handleAccountEditFormClose() {
    setDisplayAccountEditForm(false);
  }

  const rows = currentData.map((element) => {
    const cardContent = (
      <div>
        <div style={{ margin: 10 }}>
          <Grid>
            <Grid.Col style={{ marginLeft: "auto" }} span={"content"}>
              <Badge size={"xl"} radius="md" variant="dot">
                {element.name}
              </Badge>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={"content"}>
              <Text style={{ marginTop: 20 }}>Total Available Balance</Text>
              <Badge variant="filled" size={"xl"}>
                <Text fw={700}>
                  VND. {element.currentBalance}
                </Text>
              </Badge>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col style={{ marginLeft: "auto" }} span={"content"}>
              <Text style={{ marginTop: 28 }} size={"xs"}>
                {element.paymentTypes}
              </Text>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    );

    if (isMobile) {
      return (
        <Card
          key={element.accountId}
          radius="md"
          withBorder
          style={{ marginBottom: 8, padding: 0, borderWidth: 1.5 }}
        >
          {cardContent}
        </Card>
      );
    }

    // For desktop view, render a table row
    return (
      <tr key={element.accountId}>
        <td>
          <Text fw={700}>{element.name}</Text>
        </td>
        <td>
          <Text fw={700}>{`${element.totalIncome } .VND`}</Text>
        </td>
        <td>
          <Text fw={700}>{`${element.totalExpense } .VND`}</Text>
        </td>
        <td>
          <Text fw={700} style={{ color: "#26AB35" }}>
            {`${element.currentBalance.toLocaleString("en-US")} .VND`}
          </Text>
        </td>
        <td>{<EditSVG onClick={() => handleEdit(element)} />}</td>
      </tr>
    );
  });

  return (
    <div>
      {displayAccountEditForm && (
        <AccountEditForm
          element={selectedEditElement}
          open={displayAccountEditForm}
          close={handleAccountEditFormClose}
        />
      )}
      {isMobile ? (
        <div>
          <Text fw={"700"} style={{ marginBottom: 3, marginTop: 28 }}>
            Your Accounts
          </Text>
          <Text fz={"xs"} style={{ marginBottom: 10 }}>
            Accounts with the current balance
          </Text>
          <div>{rows}</div>
        </div>
      ) : (
        <Table verticalSpacing="lg">
          <thead>
            <tr>
              <th>
                <Text c="dimmed">ACCOUNT DETAILS</Text>
              </th>
              <th>
                <Text c="dimmed">TOTAL INCOME</Text>
              </th>
              <th>
                <Text c="dimmed">TOTAL EXPENSES</Text>
              </th>
              <th>
                <Text c="dimmed">CURRENT BALANCE</Text>
              </th>
              <th>
                <Text c="dimmed">EDIT</Text>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
      {/* Pagination */}
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
