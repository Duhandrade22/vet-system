import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Form/Form";
import { useLogin } from "../../hooks/useLogin";
import { validateEmail, validateRequired } from "../../utils/validators";
import styles from "./Login.module.css";

export const Login: React.FC = () => {
  const { formData, setFormData, loading, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>🏥</div>
            <h1 className={styles.logoTitle}>Sistema Veterinário</h1>
            <p className={styles.logoSubtitle}>Entre com sua conta</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <InputField
              label="E-mail"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              value={formData.email}
              onChange={handleChange}
              validator={validateEmail}
            />

            <InputField
              label="Senha"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              required
              value={formData.password}
              onChange={handleChange}
              validator={(value) => validateRequired(value, "Senha")}
              onIconClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </InputField>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              style={{ width: "100%" }}
            >
              Entrar
            </Button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>Não tem uma conta?</p>
            <Link to="/register" className={styles.footerLink}>
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
