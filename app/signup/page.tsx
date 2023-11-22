"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import { useFormik } from "formik";
import { validationSchema } from "../utilities/validationSchemas";
import { useState } from "react";

const SignUp = () => {
  const router = useRouter();

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

  const email = formik.values.email;
  const password = formik.values.password;
  const [passwordAgain, setPasswordAgain] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true, false);
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <Container>
      <main className="flex h-[100dvh] items-center justify-center ">
        <div className="flex w-full max-w-[300px] flex-col items-center rounded-md bg-gray-800 py-16 shadow-lg sm:max-w-[800px]">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign up
          </h2>

          <div className="float-label-input relative my-9 w-3/4 sm:my-6">
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

          <div className="float-label-input relative my-9 w-3/4 sm:my-6">
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

          <div className="float-label-input relative my-9 w-3/4 sm:my-6">
            <input
              name="passwordAgain"
              type="passwordAgain"
              id="passwordAgain"
              placeholder=" "
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              required
              className={`${
                passwordAgain !== formik.values.password &&
                passwordAgain.length !== 0
                  ? "border-red-600 focus:border-red-600"
                  : ""
              } focus:shadow-outline focus:border-mint w-full appearance-none border-b-2 border-lightBlue bg-slateGray px-2 py-3 leading-normal text-white  focus:outline-none`}
            />
            <label
              htmlFor="passwordAgain"
              className={`${
                passwordAgain !== formik.values.password &&
                passwordAgain.length !== 0
                  ? "text-red-600"
                  : "text-white"
              } pointer-events-none absolute -left-0 top-4 px-4 text-xs transition duration-200 ease-in-out sm:left-0 sm:top-3 sm:text-base`}
            >
              Repeat password
            </label>
            {passwordAgain !== formik.values.password &&
              passwordAgain.length !== 0 && (
                <p className="absolute top-12 text-xs text-red-600">
                  Wrong password
                </p>
              )}
          </div>

          <button
            disabled={
              !email ||
              !password ||
              !passwordAgain ||
              password !== passwordAgain
            }
            onClick={() => {
              signup();
              router.push("/signin");
            }}
            type="button"
            className="flex h-12 w-3/4 items-center justify-center  gap-2 rounded-sm border border-lightBlue text-xs font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60 disabled:border-slateGray disabled:bg-transparent disabled:text-slateGray disabled:opacity-40 disabled:hover:bg-transparent sm:text-base"
          >
            Sign Up
          </button>
        </div>
      </main>
    </Container>
  );
};

export default SignUp;
