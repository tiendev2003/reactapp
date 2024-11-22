import { Button, Grid, Title } from '@mantine/core';
import { useDispatch } from "react-redux";
import { showDebtForm } from "../../features/debtSlice";

export default function DebtHeader() {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: 10 }}>
      <Grid>
        <Grid.Col span={"content"}>
          <Title style={{ margin: 5 }} order={2}>Debts</Title>
        </Grid.Col>
        <Grid.Col span={"content"}>
          <Button fullWidth radius="md" onClick={() => dispatch(showDebtForm())} style={{ margin: 8 }}>
            Add Debt
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}
