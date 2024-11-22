import {
  Avatar,
  Box,
  Burger,
  Button,
  Container,
  Group,
  Header,
  Menu,
  Modal,
  rem,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "../../assets/assets";
import { ReactComponent as ExpandIcon } from "../../assets/Expand_down.svg";
import { ReactComponent as LogoutIcon } from "../../assets/Sign_out_squre.svg";
import { ReactComponent as ProfileIcon } from "../../assets/User.svg";
import { ReactComponent as AvatarIcon } from "../../assets/User_duotone.svg";
import { logout } from "../../features/logoutSlice";
import {
  closeForgotPasswordForm,
  closeSigninForm,
  closeSignupForm,
  openSigninForm,
  openSignupForm
} from "../../features/userSlice";
import ForgotPasswordForm from "../auth/ForgotPasswordForm";
import SigninForm from "../auth/SigninForm";
import SignupForm from "../auth/SignupForm";

export default function   HeaderBar(props) {
  const displaySigninForm = useSelector(
    (state) => state.user.displaySigninForm
  );
  const displaySignupForm = useSelector(
    (state) => state.user.displaySignupForm
  );
  const displayForgotPasswordForm = useSelector(
    (state) => state.user.displayForgotPasswordForm
  );
  const [displayConfirmLogout, setDisplayConfirmLogout] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleOpenSigninForm() {
    dispatch(openSigninForm());
  }
  function handleOpenSignupForm() {
    dispatch(openSignupForm());
  }
  function handleCloseForgotPasswordForm() {
    dispatch(closeForgotPasswordForm());
  }
  function handleCloseSigninForm() {
    dispatch(closeSigninForm());
  }
  function handleCloseSignupForm() {
    dispatch(closeSignupForm());
  }

  function handleLogout() {
    dispatch(logout({}));
    localStorage.removeItem("token");
    navigate("/");
  }
  function handleSetting() {
    navigate("/profile");
  }
 
 
  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group>
            {props.isMobile && (
              <Burger
                opened={props.navOpened}
                onClick={() => props.setNavOpened(!props.navOpened)}
              />
            )}
            <AppLogo />
          </Group>
          {props.isLandingPage ? (
            <Group>
              <Button
                radius="xl"
                variant="subtle"
                onClick={() => handleOpenSigninForm()}
              >
                Sign in
              </Button>
              <Button radius="xl" onClick={() => handleOpenSignupForm()}>
                Sign up
              </Button>
            </Group>
          ) : (
            <Group>
              {props.isMobile ? (
                <Button radius={"xl"} variant={"default"} size={rem(42)}>
                  <Avatar
                    src={`data:image/jpeg;base64,${currentUser.profileImage}`}
                    radius="xl"
                  >
                    <AvatarIcon />
                  </Avatar>
                </Button>
              ) : (
                <Menu radius={"md"} openDelay={100} shadow="md" width={220}>
                  <Menu.Target>
                    <UnstyledButton
                      style={{ height: rem(42) }}
                      radius={"md"}
                      variant={"default"}
                    >
                      <Group>
                        <Button
                          radius={"xl"}
                          variant={"default"}
                          size={rem(42)}
                        >
                          <Avatar
                            src={`data:image/jpeg;base64,${currentUser.profileImage}`}
                            radius="xl"
                          >
                            <AvatarIcon />
                          </Avatar>
                        </Button>
                        {!props.isMobile && (
                          <div>
                            <div style={{ flex: 1 }}>
                              <Text size="sm" fw={700}>
                                {currentUser.firstName}
                              </Text>
                              <Text c={"dimmed"} size="xs">
                                {currentUser.email.length > 16
                                  ? `${currentUser.email.slice(0, 16)}...`
                                  : currentUser.email}
                              </Text>
                            </div>
                          </div>
                        )}
                        <ExpandIcon
                          style={{ height: 16, width: 16 }}
                        ></ExpandIcon>
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      transitionProps={{
                        transition: "slide-down",
                        duration: 150,
                      }}
                      onClick={() => {
                        handleSetting();
                      }}
                      icon={<ProfileIcon style={{ height: 16, width: 16 }} />}
                    >
                      <Text size={"sm"}>Profile</Text>
                    </Menu.Item>
                    <Menu.Item
                      transitionProps={{
                        transition: "slide-down",
                        duration: 150,
                      }}
                      onClick={() => setDisplayConfirmLogout(true)}
                      color="red"
                      icon={<LogoutIcon style={{ height: 16, width: 16 }} />}
                    >
                      <Text size={"sm"}>Logout</Text>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          )}
        </Group>
        <SigninForm
          open={displaySigninForm}
          close={handleCloseSigninForm}
        ></SigninForm>
        <SignupForm
          open={displaySignupForm}
          close={handleCloseSignupForm}
        ></SignupForm>
        <ForgotPasswordForm
          open={displayForgotPasswordForm}
          close={handleCloseForgotPasswordForm}
        ></ForgotPasswordForm>
        <Modal
          opened={displayConfirmLogout}
          onClose={() => setDisplayConfirmLogout(false)}
          radius="lg"
          size="sm"
          centered
          overlayProps={{
            color: "white",
            opacity: 0.55,
            blur: 3,
          }}
          title={
            <Title style={{ marginLeft: 10 }} order={3}>
              Confirm Logout
            </Title>
          }
        >
          <Container>
            <Text fz="lg">
              Are you sure you want to Logout from your account?
            </Text>
            <Group position="right" mt="md">
              <Button
                radius="md"
                onClick={() => {
                  setDisplayConfirmLogout(false);
                }}
                variant={"default"}
              >
                No, Cancel
              </Button>
              <Button
                radius="md"
                onClick={() => {
                  handleLogout();
                }}
                color="red"
              >
                Yes, Logout
              </Button>
            </Group>
          </Container>
        </Modal>
      </Header>
    </Box>
  );
}
