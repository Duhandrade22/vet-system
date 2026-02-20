import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/vetly.png";
import { authService } from "../../services/authService";
import { Button } from "../Button/Button";
import styles from "./Header.module.css";

interface HeaderProps {
  showUser?: boolean;
  showLogout?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showUser = true,
  showLogout = true,
}) => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div
          className={styles.brand}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Vet System" />
        </div>

        <div className={styles.actions}>
          {showUser && user && (
            <div className={styles.user}>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userRole}>Veterinário(a)</span>
              </div>
              <div className={`${styles.avatar} ${styles.avatarSm}`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          {showLogout && (
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.breadcrumb}>
      {items.map((item, index) => (
        <div key={index} className={styles.breadcrumbItem}>
          {item.href ? (
            <a
              className={styles.breadcrumbLink}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.href!);
              }}
              style={{ cursor: "pointer" }}
            >
              {item.label}
            </a>
          ) : (
            <span className={styles.breadcrumbCurrent}>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className={styles.breadcrumbSeparator}>/</span>
          )}
        </div>
      ))}
    </div>
  );
};
