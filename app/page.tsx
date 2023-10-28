"use client";

import Container from "./components/Container";
import Image from "next/image";
import { validationSchema } from "./utilities/validationSchemas";
import { useFormik } from "formik";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    // false to prevent Formik from running the validation logic for other fields when marking the current field as touched
    formik.setFieldTouched(name, true, false);
  };

  return (
    <Container>
      <main className="flex justify-center items-center h-screen">
        <div className="w-full flex max-w-[300px] sm:max-w-[800px] shadow-lg">
          <div className="hidden sm:flex w-[40%] relative rounded-l-lg overflow-hidden">
            <Image
              priority
              fill
              style={{ objectFit: "cover" }}
              src="/img/signIn.jpg"
              alt="person signing image"
            />
          </div>
          <div className="w-full sm:w-[60%] flex flex-col items-center bg-gray-800 gap-2 rounded-lg sm:rounded-r-lg">
            <h2 className="text-center pt-8 sm:pt-12 pb-2 sm:pb-4 px-3 tracking-wide text-white sm:text-2xl">
              The Next{" "}
              <span className="bg-gradient-to-l from-lighterBlue to-lightBlue bg-clip-text font-extrabold text-transparent">
                Generation
              </span>{" "}
              Manager
            </h2>
            <p className="text-slateGray text-center px-3 pb-2 sm:text-base text-sm">
              Give our dedicated manager a try and discover its possibilities!
            </p>
            <form
              className="w-full flex flex-col items-center gap-2"
              action=""
              onSubmit={formik.handleSubmit}
            >
              <div className="my-4  float-label-input relative w-3/4">
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
                  } focus:shadow-outline w-full appearance-none border-b-2 border-lightBlue bg-slateGray py-3 px-2 leading-normal text-white focus:border-mint  focus:outline-none`}
                />
                <label
                  htmlFor="email"
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "text-red-600"
                      : "text-white"
                  } pointer-events-none absolute top-4 -left-0 sm:top-3 sm:left-0 px-4 transition duration-200 ease-in-out text-xs sm:text-base`}
                >
                  Email
                </label>
                {formik.touched.email && formik.errors.email && (
                  <p className="absolute top-12 text-red-600 text-xs">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="my-4 float-label-input relative w-3/4">
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
                  } focus:shadow-outline w-full appearance-none border-b-2 border-lightBlue bg-slateGray py-3 px-2 leading-normal text-white focus:border-mint  focus:outline-none`}
                />
                <label
                  htmlFor="password"
                  className={`${
                    formik.touched.password && formik.errors.password
                      ? "text-red-600"
                      : "text-white"
                  } pointer-events-none absolute top-4 -left-0 sm:top-3 sm:left-0 px-4 transition duration-200 ease-in-out text-xs sm:text-base`}
                >
                  Password
                </label>
                {formik.touched.password && formik.errors.password && (
                  <p className="absolute top-12 text-red-600 text-xs">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <button
                disabled={
                  !!formik.errors.email ||
                  !!formik.errors.password ||
                  formik.values.email.length === 0 ||
                  formik.values.password.length === 0
                }
                type="submit"
                className="sm:text-base text-xs w-3/4 h-12 rounded-sm border border-lightBlue font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 disabled:border-slateGray disabled:bg-transparent disabled:text-slateGray "
              >
                Login
              </button>
            </form>

            <span className="text-slateGray text-xs sm:text-base">or</span>

            <button
              type="button"
              className="flex justify-center gap-2  items-center sm:text-base text-xs w-3/4 h-12 rounded-sm border border-lightBlue font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60"
            >
              Sign in with Google
              <FaGoogle />
            </button>
            <span className="mb-10 text-slateGray text-xs sm:text-base">
              don't have an account yet?{" "}
              <Link href="test" className="text-lightBlue">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default SignIn;
