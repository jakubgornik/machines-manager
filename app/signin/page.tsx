"use client";
import { signIn, useSession } from "next-auth/react";
import Container from "../components/Container";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
  const { data: session } = useSession();

  if (!session)
    return (
      <Container>
        <main className="flex h-[100dvh] items-center justify-center">
          <div className="flex h-[400px] w-full max-w-[300px] shadow-lg sm:max-w-[800px]">
            <div className="relative hidden w-[40%] overflow-hidden rounded-l-lg sm:flex">
              <Image
                priority
                fill
                style={{ objectFit: "cover" }}
                src="/img/signIn.jpg"
                alt="person signing image"
              />
            </div>
            <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-800 sm:w-[60%] sm:rounded-r-lg">
              <h2 className="px-3 text-center tracking-wide text-white sm:text-2xl">
                Machines{" "}
                <span className="bg-gradient-to-l from-lighterBlue to-lightBlue bg-clip-text font-extrabold text-transparent">
                  Manager
                </span>{" "}
              </h2>
              <p className="px-3 py-4 text-center text-sm text-slateGray sm:text-base">
                Give a try to our dedicated manager and discover its
                possibilities!
              </p>
              <button
                onClick={() => {
                  signIn("google", {
                    callbackUrl: "/",
                  });
                }}
                type="button"
                className="flex h-12 w-3/4 items-center justify-center gap-2 rounded-sm border border-lightBlue text-xs font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 sm:text-base"
              >
                Sign in with Google
                <FaGoogle />
              </button>
            </div>
          </div>
        </main>
      </Container>
    );
};

export default SignIn;
