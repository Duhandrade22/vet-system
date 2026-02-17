import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { InputField } from "../../components/Form/Form";
import { useRegister } from "../../hooks/useRegister";
import {
  getPasswordStrength,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../../utils/validators";
import styles from "./Register.module.css";

export const Register: React.FC = () => {
  const { formData, loading, handleSubmit, handleChange } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>🏥</div>
            <h1 className={styles.logoTitle}>Sistema Veterinário</h1>
            <p className={styles.logoSubtitle}>Crie sua conta para começar</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <InputField
              label="Nome completo"
              name="name"
              type="text"
              placeholder="Digite seu nome completo"
              required
              value={formData.name}
              onChange={handleChange}
              validator={(value) => {
                if (value.trim().length < 3) {
                  return {
                    isValid: false,
                    message: "Nome deve ter no mínimo 3 caracteres",
                  };
                }
                return { isValid: true };
              }}
            />

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

            <div>
              <InputField
                label="Senha"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                required
                value={formData.password}
                onChange={handleChange}
                validator={validatePassword}
                onIconClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </InputField>
              {formData.password && (
                <div className={styles.passwordStrength}>
                  <div className={styles.passwordStrengthBar}>
                    <div
                      className={`${styles.passwordStrengthFill} ${
                        passwordStrength.strength === "weak"
                          ? styles.passwordStrengthFillWeak
                          : passwordStrength.strength === "medium"
                            ? styles.passwordStrengthFillMedium
                            : styles.passwordStrengthFillStrong
                      }`}
                    />
                  </div>
                  <span className={styles.passwordStrengthText}>
                    Força da senha:{" "}
                    {passwordStrength.strength === "weak"
                      ? "Fraca"
                      : passwordStrength.strength === "medium"
                        ? "Média"
                        : "Forte"}
                  </span>
                </div>
              )}
            </div>

            <InputField
              label="Confirmar senha"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Digite a senha novamente"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              validator={(value) =>
                validatePasswordMatch(formData.password, value)
              }
              onIconClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
            </InputField>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              style={{ width: "100%" }}
              disabled={
                loading ||
                !formData.name ||
                !formData.email ||
                !formData.password ||
                !formData.confirmPassword
              }
            >
              Criar conta
            </Button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>Já tem uma conta?</p>
            <Link to="/login" className={styles.footerLink}>
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
