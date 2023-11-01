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
    <>
      <Container>
        <main className="flex justify-center items-center h-screen ">
          <div className="w-full flex flex-col items-center max-w-[300px] sm:max-w-[800px] shadow-lg bg-gray-800 py-16 rounded-md">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign up
            </h2>

            <div className="my-9 sm:my-6 float-label-input relative w-3/4">
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

            <div className="my-9 sm:my-6 float-label-input relative w-3/4">
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

            <div className="my-9 sm:my-6 float-label-input relative w-3/4">
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
                } focus:shadow-outline w-full appearance-none border-b-2 border-lightBlue bg-slateGray py-3 px-2 leading-normal text-white focus:border-mint  focus:outline-none`}
              />
              <label
                htmlFor="passwordAgain"
                className={`${
                  passwordAgain !== formik.values.password &&
                  passwordAgain.length !== 0
                    ? "text-red-600"
                    : "text-white"
                } pointer-events-none absolute top-4 -left-0 sm:top-3 sm:left-0 px-4 transition duration-200 ease-in-out text-xs sm:text-base`}
              >
                Repeat password
              </label>
              {passwordAgain !== formik.values.password &&
                passwordAgain.length !== 0 && (
                  <p className="absolute top-12 text-red-600 text-xs">
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
              className="disabled:opacity-40 disabled:hover:bg-transparent disabled:border-slateGray disabled:bg-transparent disabled:text-slateGray  flex justify-center gap-2 items-center sm:text-base text-xs w-3/4 h-12 rounded-sm border border-lightBlue font-medium text-white transition-all duration-300 hover:bg-lightBlue hover:bg-opacity-60"
            >
              Sign Up
            </button>
          </div>
        </main>
      </Container>
    </>
  );
};

export default SignUp;
