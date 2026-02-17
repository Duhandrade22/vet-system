import React from "react";
import { useNavigate } from "react-router-dom";
import type { Owner } from "../../types/Owner";
import { formatPhone } from "../../utils/formatters";
import { getInitials } from "../../utils/helpers";
import { Button } from "../Button/Button";
import styles from "./OwnerCard.module.css";

interface OwnerCardProps {
  owner: Owner;
  onEdit?: (owner: Owner) => void;
  onDelete?: (owner: Owner) => void;
}

export const OwnerCard: React.FC<OwnerCardProps> = ({
  owner,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/owners/${owner.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(owner);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(owner);
  };

  const animalsCount = owner.animals?.length || 0;

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.header}>
        <div className={styles.avatar}>{getInitials(owner.name)}</div>
        <div style={{ flex: 1 }}>
          <h3 className={styles.name}>{owner.name}</h3>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📞</span>
            <span>{formatPhone(owner.phone)}</span>
          </div>
          {owner.email && (
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✉️</span>
              <span>{owner.email}</span>
            </div>
          )}
          {owner.city && owner.state && (
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <span>
                {owner.city}, {owner.state}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>🐾</span>
            <span className={styles.statValue}>{animalsCount}</span>
            <span>{animalsCount === 1 ? "animal" : "animais"}</span>
          </div>
        </div>

        <div className={styles.actions}>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              title="Editar"
            >
              ✏️
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              title="Excluir"
            >
              🗑️
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
