"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { BeatLoader } from "react-spinners";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";

export const Login = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [borderColorInputEmail, setBorderColorInputEmail] =
    useState("border-slate-300");
  const [borderColorInputPassword, setBorderColorInputPassword] =
    useState("border-slate-300");
  const [opacityExclamationEmail, setOpacityExclamationEmail] = useState(0);
  const [opacityExclamationPassword, setOpacityExclamationPassword] =
    useState(0);
  const [verifiedLogin, setVerifiedLogin] = useState(false);

  // State to manipulate the click event to call the endpoint
  const [executionEndpointCall, setExecutionEndpointCall] = useState(false);

  useEffect(() => {
    if (Cookies.get("email")) {
      router.push("/web/all-art-works");
    }
  }, []);

  async function onChageForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmitForm(e) {
    e.preventDefault();

    setLoading(true);

    if (!form.email && !form.password) {
      setLoading(false);

      // borders
      setBorderColorInputEmail("border-[#DC2626]");
      setBorderColorInputPassword("border-[#DC2626]");

      // opacity exclamation
      setOpacityExclamationEmail(1);
      setOpacityExclamationPassword(1);

      // toast
      toast.error("Se requiere el correo electronico y la contraseña.", {
        duration: 4000,
      });
      return;
    }

    if (!form.email) {
      setLoading(false);

      // borders
      setBorderColorInputEmail("border-[#DC2626]");
      setBorderColorInputPassword("border-slate-300");

      // opacity exclamation
      setOpacityExclamationEmail(1);
      setOpacityExclamationPassword(0);

      // toast
      toast.error("Se requiere el correo electrónico.", {
        duration: 4000,
      });
      return;
    }

    if (!form.password) {
      setLoading(false);

      // borders
      setBorderColorInputPassword("border-[#DC2626]");
      setBorderColorInputEmail("border-slate-300");

      // opacity exclamation
      setOpacityExclamationPassword(1);
      setOpacityExclamationEmail(0);

      // toast
      toast.error("Se requiere la contraseña.", {
        duration: 4000,
      });
      return;
    }

    if (!executionEndpointCall) {
      setExecutionEndpointCall(true);

      await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "fulfilled") {
            Cookies.set("email", form.email, { expires: 30 });

            setBorderColorInputEmail("border-green-500");
            setBorderColorInputPassword("border-green-500");

            // opacity exclamation
            setOpacityExclamationEmail(0);
            setOpacityExclamationPassword(0);

            setVerifiedLogin(true);

            toast.success("Verificación exitosa.", {
              duration: 3000,
            });

            setTimeout(() => {
              setExecutionEndpointCall(false);
              setLoading(false);
              router.push("/web/all-art-works");
            }, 2000);
          } else {
            setExecutionEndpointCall(false);
            setLoading(false);

            setBorderColorInputEmail("border-[#DC2626]");
            setBorderColorInputPassword("border-[#DC2626]");

            // opacity exclamation
            setOpacityExclamationEmail(1);
            setOpacityExclamationPassword(1);

            toast.error("Error al intentar loguearte", {
              duration: 4000,
            });
          }
        });
    }
  }

  // Mirar el tema del responsive
  return (
    <>
      <Toaster expand={true} offset="37px" position="bottom-right" richColors />
      <main className="h-screen flex justify-center relative xl:justify-between">
        <div className="w-[350px] mt-[60px] mx-[20px] sm:mx-0 xl:ml-[8.5%]">
          <img
            className={"w-[223px] m-auto mt-[35px]"}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rijks_museum_logo.png/1200px-Rijks_museum_logo.png"
            alt="logo"
          />

          <h1 className="mt-[85px] text-[22px] text-[#212B36] font-bold">
            Login
          </h1>
          <p className="mt-[10px] text-[#838D96] text-[16px]">
            Bienvenido a rijksmuseum, ingresa tu cuenta para empezar.
          </p>
          <form
            onSubmit={onSubmitForm}
            method="post"
            className="mt-[30px] flex flex-col"
          >
            <label
              className="text-[#212B36] text-[14px] font-[500] mb-[8px]"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <div
              className={`${borderColorInputEmail} flex justify-between py-[10px] px-[16px] text-[14px] rounded-[6px] border-[1px] mb-[5px]`}
            >
              <input
                className="outline-none w-[90%]"
                type="email"
                value={form.email}
                name="email"
                id="email"
                onChange={onChageForm}
              />
              {verifiedLogin ? (
                <CheckCircleIcon width={22} color="green" />
              ) : (
                <ExclamationCircleIcon
                  width={22}
                  color="red"
                  opacity={opacityExclamationEmail}
                />
              )}
            </div>

            <label
              className="text-[#212B36] text-[14px] mt-[13px] font-[500] mb-[8px]"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div
              className={`${borderColorInputPassword} flex justify-between py-[10px] px-[16px] text-[14px] rounded-[6px] border-[1px]`}
            >
              <input
                className="outline-none w-[90%]"
                type="password"
                value={form.password}
                name="password"
                id="password"
                onChange={onChageForm}
              />
              {verifiedLogin ? (
                <CheckCircleIcon width={22} color="green" />
              ) : (
                <ExclamationCircleIcon
                  width={22}
                  color="red"
                  opacity={opacityExclamationPassword}
                />
              )}
            </div>

            <button
              className={`mt-[20px] w-full py-[9px] rounded-[6px] text-white text-[14px] transition ease-in-out duration-[0.4s]  ${
                executionEndpointCall
                  ? "cursor-default bg-[#3a389e]"
                  : "bg-[#6564DB] hover:bg-[#3a389e]"
              }`}
              type="submit"
            >
              {loading ? (
                <div className="flex justify-center">
                  <BeatLoader color="#CCCCCC" size={16} />
                </div>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>
        </div>

        <div className="background-proposal-2 hidden relative w-[55%] h-screen xl:block">
          <img
            className="w-[100%] "
            src="https://live.staticflickr.com/1664/26385542816_9abd71eb5e_h.jpg"
            alt="image-login"
          />

          <div className="ml-[30px]">
            <h1 className="text-white text-[25px] font-bold mt-[25px] mb-[35px]">
              Explora el mundo del arte
            </h1>

            <p className="text-white text-[15px]">
              ¿Aún no estas tienes una cuenta oficial?.
            </p>

            <p className="text-white text-[15px] mb-[23px] font-semibold">
              Haz clic en el botón y registrate.
            </p>
            <a
              href="https://www.rijksmuseum.nl/en"
              target="_blank"
              className="text-[#6564DB] bg-white text-[14px] py-[8px] px-[35px] rounded-[6px]"
            >
              Registrarme
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
