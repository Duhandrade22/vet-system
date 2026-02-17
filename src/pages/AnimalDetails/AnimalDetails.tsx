import React, { useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { InputField, TextareaField } from "../../components/Form/Form";
import { Breadcrumb, Header } from "../../components/Header/Header";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Modal } from "../../components/Modal/Modal";
import { RecordCard } from "../../components/RecordCard/RecordCard";
import { useAnimalDetails } from "../../hooks/useAnimalDetails";
import type { Record } from "../../types/Record";
import styles from "./AnimalDetails.module.css";

export const AnimalDetails: React.FC = () => {
  const {
    animal,
    records,
    loading,
    isModalOpen,
    editingRecord,
    formData,
    setEditingRecord,
    setFormData,
    setIsModalOpen,
    loadData,
    handleDeleteAnimal,
    handleDeleteRecord,
    handleSubmit,
  } = useAnimalDetails();
  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingRecord(null);
    setFormData({ animalId: animal?.id });
    setIsModalOpen(true);
  };

  const openEditModal = (record: Record) => {
    setEditingRecord(record);
    setFormData({
      weight: record.weight,
      medications: record.medications,
      dosage: record.dosage,
      notes: record.notes,
      attendedAt: new Date(record.attendedAt).toISOString().slice(0, 16),
    });
    setIsModalOpen(true);
  };

  if (loading || !animal) {
    return (
      <div className={styles.page}>
        <Header />
        <main
          className={styles.container}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSpinner size="lg" />
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/" },
            {
              label: animal.owner?.name || "Tutor",
              href: `/owners/${animal.ownerId}`,
            },
            { label: animal.name },
          ]}
        />

        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.headerTitle}>{animal.name}</h1>
              <p className={styles.headerSubtitle}>Informações do animal</p>
            </div>
            <div className={styles.headerActions}>
              <Button variant="danger" onClick={handleDeleteAnimal}>
                🗑️ Excluir
              </Button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Espécie
              </span>
              <span style={{ fontSize: "0.875rem", color: "#111827" }}>
                {animal.species}
              </span>
            </div>
            {animal.breed && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#9CA3AF",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Raça
                </span>
                <span style={{ fontSize: "0.875rem", color: "#111827" }}>
                  {animal.breed}
                </span>
              </div>
            )}
            {animal.owner && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#9CA3AF",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Tutor
                </span>
                <span style={{ fontSize: "0.875rem", color: "#111827" }}>
                  {animal.owner.name}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Prontuários <span>({records.length})</span>
            </h2>
            <Button variant="primary" onClick={openCreateModal}>
              ➕ Adicionar Prontuário
            </Button>
          </div>

          {records.length === 0 ? (
            <EmptyState
              icon="📋"
              title="Nenhum prontuário cadastrado"
              description="Adicione o primeiro atendimento deste animal."
              actionText="Adicionar Prontuário"
              onAction={openCreateModal}
            />
          ) : (
            <div className={styles.grid}>
              {records.map((record) => (
                <RecordCard
                  key={record.id}
                  record={record}
                  onEdit={openEditModal}
                  onDelete={handleDeleteRecord}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRecord ? "Editar Prontuário" : "Adicionar Prontuário"}
        actions={[
          {
            text: "Cancelar",
            variant: "secondary",
            onClick: () => setIsModalOpen(false),
          },
          { text: "Salvar", variant: "primary", onClick: handleSubmit },
        ]}
      >
        <form>
          <InputField
            label="Peso (kg)"
            name="weight"
            type="text"
            placeholder="12.5"
            required
            value={formData.weight || ""}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
          />

          <InputField
            label="Data do atendimento"
            name="attendedAt"
            type="datetime-local"
            required
            value={formData.attendedAt || ""}
            onChange={(e) =>
              setFormData({ ...formData, attendedAt: e.target.value })
            }
          />

          <InputField
            label="Medicamentos"
            name="medications"
            type="text"
            placeholder="Ex: Dipirona, Amoxicilina"
            required
            value={formData.medications || ""}
            onChange={(e) =>
              setFormData({ ...formData, medications: e.target.value })
            }
          />

          <InputField
            label="Dosagem"
            name="dosage"
            type="text"
            placeholder="Ex: 1g a cada 8h"
            required
            value={formData.dosage || ""}
            onChange={(e) =>
              setFormData({ ...formData, dosage: e.target.value })
            }
          />

          <TextareaField
            label="Observações"
            name="notes"
            placeholder="Descreva os sintomas, diagnóstico e orientações..."
            required
            rows={6}
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </form>
      </Modal>
    </div>
  );
};
