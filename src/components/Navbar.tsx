"use client";
import { useContext } from "react";
import { Button, Avatar, Tooltip, ActionIcon } from "@mantine/core";
import { IconBrandFacebook, IconPlus, IconLogout } from "@tabler/icons-react";
import { useSession, signIn, signOut } from "next-auth/react";

import { ModalContext } from "@/context/ModalContext";

const Navbar = () => {
  const { data, status }: any = useSession();
  const { setModalInfo } = useContext(ModalContext);

  return (
    <>
      <nav className="fixed w-full top-0 left-0 h-[7rem] border-b-[0.0625rem] border-solid border-[color: #dee2e6] flexBetween">
        <div className="ml-[10rem] max-sm:ml-[1rem]">
          <h1 className="text-[2rem] font-bold">CRUD APP</h1>
        </div>
        <div className="mr-[10rem] flexCenter max-sm:mr-[1rem]">
          {status === "authenticated" && (
            <>
              {data?.user.admin && (
                <Tooltip label="Add Topic">
                  <ActionIcon
                    variant="outline"
                    color="dark"
                    className="mr-10 w-[4rem] h-[4rem] rounded-full"
                    onClick={() =>
                      setModalInfo({ opened: true, type: "create" })
                    }
                  >
                    <IconPlus size="2rem" />
                  </ActionIcon>
                </Tooltip>
              )}
              <Tooltip label={data.user?.name}>
                <Avatar
                  variant="light"
                  color="dark"
                  radius="xl"
                  size="lg"
                  src={data.user?.image}
                  className="w-[4rem] h-[4rem] avatar"
                ></Avatar>
              </Tooltip>
              <Button
                variant="outline"
                color="dark"
                leftIcon={<IconLogout size="2rem" />}
                className="btn ml-10"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          )}
          {status === "unauthenticated" && (
            <Button
              variant="outline"
              leftIcon={<IconBrandFacebook />}
              className="btn bg-[#4267B2] hover:bg-[#4267B2]"
              style={{ fontWeight: "bold", color: "white", border: "none" }}
              onClick={() => signIn("facebook")}
            >
              Continue with Facebook
            </Button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
