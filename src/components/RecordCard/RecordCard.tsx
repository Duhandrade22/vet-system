import React from "react";
import { useNavigate } from "react-router-dom";
import type { Record } from "../../types/Record";
import { truncateText } from "../../utils/formatters";
import { Button } from "../Button/Button";
import styles from "./RecordCard.module.css";

interface RecordCardProps {
  record: Record;
  onEdit?: (record: Record) => void;
  onDelete?: (record: Record) => void;
}

export const RecordCard: React.FC<RecordCardProps> = ({
  record,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/records/${record.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(record);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(record);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.header}>
        <div className={styles.date}>{record.attendedAt}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.field}>
          <span className={styles.label}>Peso</span>
          <span className={styles.value}>{record.weight} kg</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Medicamento</span>
          <span className={styles.value}>{record.medications}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Dosagem</span>
          <span className={styles.value}>{record.dosage}</span>
        </div>
      </div>

      {record.notes && (
        <div className={styles.notes}>{truncateText(record.notes, 100)}</div>
      )}

      <div className={styles.footer}>
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={handleEdit} title="Editar">
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
  );
};
