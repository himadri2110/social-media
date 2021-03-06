import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpHandler } from "features/auth";

export const SignUp = () => {
  const dispatch = useDispatch();

  const [signup, setSignup] = useState({
    input: {},
    error: "",
    pwdMatch: true,
    hide: { pwd: true, confirmPwd: true },
  });

  const signupInputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "confirmPwd") {
      setSignup({
        ...signup,
        input: { ...signup.input, [name]: value },
        pwdMatch: value === signup.input.password ? true : false,
      });
    } else {
      setSignup({
        ...signup,
        input: { ...signup.input, [name]: value },
      });
    }
  };

  return (
    <div className="w-full max-w-[20rem] bg-darkSecondary p-4 rounded-lg border-light border shadow-darkSecondary shadow-xl">
      <div className="p-4">
        <img src="/sapphire.svg" alt="Sapphire" className="h-8 w-8 m-auto" />

        <div className="m-auto text-center text-3xl font-medium">Sign Up</div>
      </div>

      {signup.error && (
        <div className="text-center text-red pb-2">{signup.error}</div>
      )}

      <div className="p-2">
        <form
          className="flex flex-col gap-2.5"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(signUpHandler({ signup, setSignup }));
          }}
        >
          <div className="flex flex-col gap-0.5">
            <label className="text-sm text-grey">
              Name<span className="text-red">*</span>
            </label>
            <input
              className="bg-inherit py-1 px-2 rounded border-lightGrey border outline-none focus:border-primary"
              autoFocus
              type="text"
              name="fullName"
              value={signup.input.fullName || ""}
              onChange={signupInputHandler}
              required
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <label className="text-sm text-grey">
              Username<span className="text-red">*</span>
            </label>
            <input
              className="bg-inherit py-1 px-2 rounded border-lightGrey border outline-none focus:border-primary"
              type="text"
              name="username"
              value={signup.input.username || ""}
              onChange={signupInputHandler}
              required
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <label className="text-sm text-grey">
              Password<span className="text-red">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                className="w-full bg-inherit py-1 px-2 rounded border-lightGrey border outline-none focus:border-primary"
                type={`${signup.hide.pwd ? "password" : "text"}`}
                name="password"
                value={signup.input.password || ""}
                onChange={signupInputHandler}
                required
              />
              <i
                className={`absolute right-3 z-10 text-light cursor-pointer fa-solid ${
                  signup.hide.pwd ? "fa-eye" : "fa-eye-slash"
                }
                  `}
                onClick={() =>
                  setSignup({
                    ...signup,
                    hide: { ...signup.hide, pwd: !signup.hide.pwd },
                  })
                }
              ></i>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <label className="text-sm text-grey">
              Confirm Password<span className="text-red">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                className="w-full bg-inherit py-1 px-2 rounded border-lightGrey border outline-none focus:border-primary"
                type={`${signup.hide.confirmPwd ? "password" : "text"}`}
                name="confirmPwd"
                value={signup.input.confirmPwd || ""}
                onChange={signupInputHandler}
                required
              />

              <i
                className={`absolute right-3 z-10 text-light cursor-pointer fa-solid ${
                  signup.hide.confirmPwd ? "fa-eye" : "fa-eye-slash"
                }`}
                onClick={() =>
                  setSignup({
                    ...signup,
                    hide: {
                      ...signup.hide,
                      confirmPwd: !signup.hide.confirmPwd,
                    },
                  })
                }
              ></i>
            </div>
            {!signup.pwdMatch ? (
              <div className="text-xs text-red">Passwords do not match</div>
            ) : null}
          </div>

          <button
            className={`bg-primary rounded-full p-1 mt-4 ${
              signup.pwdMatch ? "" : "btn-disabled"
            }`}
            type="submit"
            disabled={!signup.pwdMatch}
          >
            Create New Account
          </button>
        </form>
      </div>

      <div className="text-center text-sm py-1">
        <span>Already have an account? </span>
        <Link to="/auth/login" className="text-primary">
          Login
        </Link>
      </div>
    </div>
  );
};
