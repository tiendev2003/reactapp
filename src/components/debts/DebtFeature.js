import React from "react";
import { Text, Paper, Grid } from "@mantine/core";
import { useSelector } from "react-redux";

export default function DebtFeature() {
  const debtList = useSelector((state) => state.debt.debtList);

  function handleTotalDebt() {
    return debtList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );
  }

  function handleTotalPaid() {
    return debtList.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.status === "Paid" ? currentValue.amount : 0),
      0
    );
  }

  function handleTotalUnpaid() {
    return debtList.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.status === "Unpaid" ? currentValue.amount : 0),
      0
    );
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <Grid>
        <Grid.Col span={6} md={"content"}>
          <Paper miw={"180px"} radius="md" p="md" withBorder>
            <Text size={"lg"} fw={700}>{`${handleTotalDebt()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed">
              TOTAL DEBT
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={6} md={"content"}>
          <Paper miw={"180px"} radius="md" p="md" withBorder>
            <Text size={"lg"} fw={700}>{`${handleTotalPaid()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
              TOTAL PAID
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={12} md={"content"}>
          <Paper miw={"180px"} radius="md" p="md" withBorder>
            <Text
              size={"lg"}
              fw={700}
              style={{ color: "#FF0000" }}
            >{`${handleTotalUnpaid()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
              TOTAL UNPAID
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
