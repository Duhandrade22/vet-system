import React from "react";
import { useNavigate } from "react-router-dom";
import type { Animal } from "../../types/Animal";
import { Button } from "../Button/Button";
import styles from "./AnimalCard.module.css";

interface AnimalCardProps {
  animal: Animal;
  onEdit?: (animal: Animal) => void;
  onDelete?: (animal: Animal) => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animals/${animal.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(animal);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(animal);
  };

  const recordsCount = animal.records?.length || 0;

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.header}>
        <h3 className={styles.name}>{animal.name}</h3>
        <span className={styles.badge}>{animal.species}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.details}>
          {animal.breed && (
            <div className={styles.detail}>
              <span>🐕</span>
              <span>Raça: {animal.breed}</span>
            </div>
          )}
          {animal.owner && (
            <div className={styles.detail}>
              <span>👤</span>
              <span>Tutor: {animal.owner.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.recordsCount}>
          {recordsCount} {recordsCount === 1 ? "prontuário" : "prontuários"}
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
