"use client";
import { signIn, useSession, SignInResponse } from "next-auth/react";
import Container from "../components/Container";
import Image from "next/image";
import { validationSchema } from "../utilities/validationSchemas";
import { useFormik } from "formik";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const SignIn = () => {
  const { data: session } = useSession();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("");
    },
  });

  // const handleSignIn = async () => {
  //   // await signIn("google");
  //   if (!auth.currentUser) {
  //     const googleProvider = new GoogleAuthProvider();
  //     await signInWithRedirect(auth, googleProvider);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    // false to prevent Formik from running the validation logic for other fields when marking the current field as touched
    formik.setFieldTouched(name, true, false);
  };
  const email = formik.values.email;
  const password = formik.values.password;

  console.log(auth.currentUser);
  console.log(session);

  if (!session)
    return (
      <Container>
        <main className="flex h-screen items-center justify-center">
          <div className="flex w-full max-w-[300px] shadow-lg sm:max-w-[800px]">
            <div className="relative hidden w-[40%] overflow-hidden rounded-l-lg sm:flex">
              <Image
                priority
                fill
                style={{ objectFit: "cover" }}
                src="/img/signIn.jpg"
                alt="person signing image"
              />
            </div>
            <div className="flex w-full flex-col items-center gap-2 rounded-lg bg-gray-800 sm:w-[60%] sm:rounded-r-lg">
              <h2 className="px-3 pb-2 pt-8 text-center tracking-wide text-white sm:pb-4 sm:pt-12 sm:text-2xl">
                The Next{" "}
                <span className="bg-gradient-to-l from-lighterBlue to-lightBlue bg-clip-text font-extrabold text-transparent">
                  Generation
                </span>{" "}
                Manager
              </h2>
              <p className="px-3 pb-2 text-center text-sm text-slateGray sm:text-base">
                Give our dedicated manager a try and discover its possibilities!
              </p>
              <form
                className="flex w-full flex-col items-center gap-2"
                action=""
                onSubmit={formik.handleSubmit}
              >
                <div className="float-label-input  relative my-4 w-3/4">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder=" "
                    value={formik.values.email}
                    onChange={handleChange}
                    required
                    className={`${
                      formik.touched.email && formik.errors.email
                        ? "border-red-600 focus:border-red-600"
                        : ""
                    } focus:shadow-outline focus:border-mint w-full appearance-none border-b-2 border-lightBlue bg-slateGray px-2 py-3 leading-normal text-white  focus:outline-none`}
                  />
                  <label
                    htmlFor="email"
                    className={`${
                      formik.touched.email && formik.errors.email
                        ? "text-red-600"
                        : "text-white"
                    } pointer-events-none absolute -left-0 top-4 px-4 text-xs transition duration-200 ease-in-out sm:left-0 sm:top-3 sm:text-base`}
                  >
                    Email
                  </label>
                  {formik.touched.email && formik.errors.email && (
                    <p className="absolute top-12 text-xs text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="float-label-input relative my-4 w-3/4">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder=" "
                    value={formik.values.password}
                    onChange={handleChange}
                    required
                    className={`${
                      formik.touched.password && formik.errors.password
                        ? "border-red-600 focus:border-red-600"
                        : ""
                    } focus:shadow-outline focus:border-mint w-full appearance-none border-b-2 border-lightBlue bg-slateGray px-2 py-3 leading-normal text-white  focus:outline-none`}
                  />
                  <label
                    htmlFor="password"
                    className={`${
                      formik.touched.password && formik.errors.password
                        ? "text-red-600"
                        : "text-white"
                    } pointer-events-none absolute -left-0 top-4 px-4 text-xs transition duration-200 ease-in-out sm:left-0 sm:top-3 sm:text-base`}
                  >
                    Password
                  </label>
                  {formik.touched.password && formik.errors.password && (
                    <p className="absolute top-12 text-xs text-red-600">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    signIn("credentials", {
                      email,
                      password,
                      callbackUrl: "/",
                    })
                  }
                  disabled={
                    !!formik.errors.email ||
                    !!formik.errors.password ||
                    formik.values.email.length === 0 ||
                    formik.values.password.length === 0
                  }
                  type="submit"
                  className="mt-8 h-12 w-3/4 rounded-sm border border-lightBlue text-xs font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 disabled:border-slateGray disabled:bg-transparent disabled:text-slateGray sm:mt-5 sm:text-base "
                >
                  Login
                </button>
              </form>

              <span className="text-xs text-slateGray sm:text-base">or</span>

              <button
                onClick={() => {
                  signIn("google", {
                    callbackUrl: "/",
                  });
                }}
                // onClick={handleSignIn}
                type="button"
                className="flex h-12 w-3/4  items-center justify-center gap-2 rounded-sm border border-lightBlue text-xs font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 sm:text-base"
              >
                Sign in with Google
                <FaGoogle />
              </button>
              <span className="mb-10 text-xs text-slateGray sm:text-base">
                don't have an account yet?{" "}
                <Link href="signup" className="text-lightBlue">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </main>
      </Container>
    );
};

export default SignIn;
