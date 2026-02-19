import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { showToast } from "../utils/helpers";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login({
        email: formData.email,
        password: formData.password,
      });

      showToast("Login realizado com sucesso!", "success");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "E-mail ou senha inválidos";
      showToast(message, "error", 5000);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    handleSubmit,
  };
};
