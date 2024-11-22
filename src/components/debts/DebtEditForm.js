import {
  Button,
  Container,
  Grid,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDebt, fetchDebt, removeDebt } from "../../features/debtSlice";

function DebtEditForm(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const addDebtEditInProcess = useSelector(
    (state) => state.debt.addDebtEditInProcess
  );
  const [showDelete, setShowDelete] = useState(false);

  const form = useForm({
    initialValues: {
      moneyFrom: "",
      amount: "",
      dueDate: "",
      status: "",
    },
    validate: {
      moneyFrom: (value) => (value !== "" ? null : "Money From is required"),
      amount: (value) => (value !== "" ? null : "Enter Amount"),
      dueDate: (value) => (value !== "" ? null : "Enter Due Date"),
      status: (value) => (value !== "" ? null : "Enter Status"),
    },
  });

  useEffect(() => {
    if (props?.element) {
      form.setFieldValue("amount", props.element.amount);
      form.setFieldValue("moneyFrom", props.element.moneyFrom);
      form.setFieldValue("dueDate", props.element.dueDate.split("T")[0]);
      form.setFieldValue("status", props.element.status || ""); // Ensure we set the status value correctly
    }
  }, [props?.element]); // React to changes in the element data from parent

  async function handleSubmit() {
    await dispatch(editDebt({ ...form.values, debtId: props.element.debtId }));
    await dispatch(fetchDebt({ token: token }));
    form.reset();
    props.close();
  }

  async function handleDelete() {
    console.log("debtId", props.element.debtId);
    await dispatch(removeDebt(props.element.debtId));
    await dispatch(fetchDebt({ token: token }));
    form.reset();
    props.close();
  }

  function handleCancel() {
    form.reset();
    setShowDelete(false);
    props.close();
  }

  function handleDeleteCancel() {
    setShowDelete(false);
  }

  return (
    <Modal
      overlayProps={{
        color: "white",
        opacity: 0.55,
        blur: 3,
      }}
      withCloseButton={false}
      closeOnClickOutside={true}
      radius="lg"
      size="sm"
      opened={props.open}
      onClose={() => {
        props.close();
      }}
      centered
    >
      <LoadingOverlay visible={addDebtEditInProcess} overlayBlur={2} />
      <Title style={{ marginLeft: 10, marginBottom: 20 }} order={3}>
        Edit Debt
      </Title>
      <Container size="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit())}>
          <TextInput
            label="Money From"
            placeholder="Enter Money From"
            {...form.getInputProps("moneyFrom")}
            style={{ marginBottom: 20 }}
          />
          <NumberInput
            label="Amount"
            placeholder="Enter Amount"
            hideControls
            {...form.getInputProps("amount")}
            style={{ marginBottom: 20 }}
          />
          <TextInput
            label="Due Date"
            placeholder="Select Due Date"
            type="date"
            {...form.getInputProps("dueDate")}
            style={{ marginBottom: 20 }}
          />
          <Select
            label="Status"
            placeholder="Select Status"
            data={[
              { value: "pending", label: "Pending" },
              { value: "paid", label: "Paid" },
              { value: "overdue", label: "Overdue" },
            ]}
            {...form.getInputProps("status")}
            style={{ marginBottom: 20 }}
          />
          <Grid
            style={{ marginTop: 16, marginBottom: 10 }}
            gutter={5}
            gutterXs="md"
            gutterMd="xl"
            gutterXl={50}
          >
            <Grid.Col span={"auto"}>
              <Button
                radius="md"
                color="red"
                fullWidth
                onClick={() => setShowDelete(true)}
              >
                Delete
              </Button>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Button
                radius="md"
                variant={"default"}
                fullWidth
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Button radius="md" fullWidth type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Container>
      <Modal
        overlayProps={{
          color: "red",
          blur: 3,
        }}
        size="auto"
        withinPortal={true}
        closeOnClickOutside={false}
        trapFocus={false}
        withOverlay={false}
        opened={showDelete}
        onClose={handleDeleteCancel}
        radius="lg"
        centered
        withCloseButton={false}
        title="Confirm Delete"
      >
        <Text size={"sm"} c={"dimmed"} style={{ marginBottom: 10 }}>
          This will delete this debt
        </Text>
        <Grid>
          <Grid.Col span={"auto"}>
            <Button
              radius="md"
              color="gray"
              fullWidth
              onClick={() => setShowDelete(false)}
            >
              No, Cancel
            </Button>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Button
              color={"red"}
              onClick={() => handleDelete()}
              radius="md"
              fullWidth
            >
              Yes, Delete
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </Modal>
  );
}

export default DebtEditForm;
