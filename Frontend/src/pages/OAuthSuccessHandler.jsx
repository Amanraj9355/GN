import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/store";

const OAuthSuccessHandler = () => {
  const navigate = useNavigate();
  const { setToken, setIsAuthVisible } = useContext(ShopContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
      toast.success("Successfully Logged in with Google");
      setIsAuthVisible(false);
      window.location.href = "/";
    } else {
      toast.error("Google login failed");
    }
  }, []);

  return null;
};

export default OAuthSuccessHandler;
