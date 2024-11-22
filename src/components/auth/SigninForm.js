import {
  Button,
  Container,
  Group,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount, openForgotPasswordForm } from "../../features/userSlice";

export default function SigninForm(props) {
  const signinInProgress = useSelector((state) => state.user.signinInProgress);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value
          ? null
          : "Requires at least one lowercase, uppercase, number and special character.",
    },
  });
  async function handleSubmit() {
    await dispatch(loginAccount(form.values))
      .then((res) => {
        if (res.payload) {
          props.close();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal
      withCloseButton={false}
      radius="lg"
      size="sm"
      opened={props.open}
      onClose={() => {
        props.close();
      }}
      centered
    >
      <LoadingOverlay visible={signinInProgress} overlayBlur={2} />
      <Title size="32" align="center">
        Login
      </Title>
      <Container size="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit())}>
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Email"
            placeholder="your@gmail.com"
            type="email"
            {...form.getInputProps("email")}
          />
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Password"
            placeholder="Password"
            type="password"
            {...form.getInputProps("password")}
          />
          <Text
            onClick={() => dispatch(openForgotPasswordForm())}
            size={"sm"}
            c="blue"
            style={{ marginTop: 16, cursor: "pointer" }}
          >
            Forgot Password?
          </Text>
          <Group style={{ marginTop: 16, marginBottom: 16 }}>
            <Button radius="md" fullWidth type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Container>
    </Modal>
  );
}
