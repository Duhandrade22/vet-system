import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { InputField } from "../../components/Form/Form";
import { Header } from "../../components/Header/Header";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Modal } from "../../components/Modal/Modal";
import { OwnerCard } from "../../components/OwnerCard/OwnerCard";
import { useOwner } from "../../hooks/useOwner";
import { useDebounce } from "../../hooks/useToast";
import { ownerService } from "../../services/ownerService";
import type { CreateOwnerDto, Owner } from "../../types/Owner";
import { showToast } from "../../utils/helpers";
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from "../../utils/validators";
import styles from "./Dashboard.module.css";

export const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);
  const [formData, setFormData] = useState<Partial<CreateOwnerDto>>({});
  const { loadOwners, owners, filteredOwners, filterOwners, loading } =
    useOwner();

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    loadOwners();
  }, []);

  useEffect(() => {
    filterOwners(debouncedSearch);
  }, [debouncedSearch, owners]);

  const openCreateModal = () => {
    setEditingOwner(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const openEditModal = (owner: Owner) => {
    setEditingOwner(owner);
    setFormData(owner);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingOwner) {
        await ownerService.update(editingOwner.id, formData);
        showToast("Tutor atualizado com sucesso!", "success");
      } else {
        await ownerService.create(formData as CreateOwnerDto);
        showToast("Tutor cadastrado com sucesso!", "success");
      }
      setIsModalOpen(false);
      loadOwners();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao salvar tutor",
        "error",
      );
      throw error;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Header />
        <div
          className={styles.container}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.headerTitle}>Meus Tutores</h1>
              <p className={styles.headerSubtitle}>
                Gerencie os tutores e seus animais
              </p>
            </div>
            <Button variant="primary" onClick={openCreateModal}>
              ➕ Adicionar Tutor
            </Button>
          </div>

          <div className={styles.filters}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Buscar tutores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredOwners.length === 0 ? (
          <EmptyState
            icon="👤"
            title={
              owners.length === 0
                ? "Nenhum tutor cadastrado"
                : "Nenhum tutor encontrado"
            }
            description={
              owners.length === 0
                ? "Adicione seu primeiro tutor para começar."
                : "Tente ajustar sua busca."
            }
            actionText={
              owners.length === 0 ? "Adicionar Primeiro Tutor" : undefined
            }
            onAction={owners.length === 0 ? openCreateModal : undefined}
          />
        ) : (
          <div className={styles.grid}>
            {filteredOwners.map((owner) => (
              <OwnerCard key={owner.id} owner={owner} onEdit={openEditModal} />
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingOwner ? "Editar Tutor" : "Adicionar Tutor"}
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
            label="Nome completo"
            name="name"
            type="text"
            placeholder="Digite o nome do tutor"
            required
            value={formData.name || ""}
            onChange={handleChange}
            validator={(value) => validateRequired(value, "Nome")}
          />

          <InputField
            label="Telefone"
            name="phone"
            type="tel"
            placeholder="(11) 98765-4321"
            required
            value={formData.phone || ""}
            onChange={handleChange}
            validator={validatePhone}
          />

          <InputField
            label="E-mail"
            name="email"
            type="email"
            placeholder="email@exemplo.com"
            value={formData.email || ""}
            onChange={handleChange}
            validator={(value) =>
              value ? validateEmail(value) : { isValid: true }
            }
          />

          <div className="divider" style={{ margin: "var(--spacing-lg) 0" }} />
          <h4 style={{ marginBottom: "var(--spacing-md)" }}>
            Endereço (opcional)
          </h4>

          <InputField
            label="CEP"
            name="zipCode"
            type="text"
            placeholder="12345-678"
            value={formData.zipCode || ""}
            onChange={handleChange}
          />

          <InputField
            label="Rua"
            name="street"
            type="text"
            placeholder="Rua das Flores"
            value={formData.street || ""}
            onChange={handleChange}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--spacing-md)",
            }}
          >
            <InputField
              label="Número"
              name="number"
              type="text"
              placeholder="123"
              value={formData.number || ""}
              onChange={handleChange}
            />

            <InputField
              label="Complemento"
              name="complement"
              type="text"
              placeholder="Apto 45"
              value={formData.complement || ""}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Bairro"
            name="neighborhood"
            type="text"
            placeholder="Centro"
            value={formData.neighborhood || ""}
            onChange={handleChange}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "var(--spacing-md)",
            }}
          >
            <InputField
              label="Cidade"
              name="city"
              type="text"
              placeholder="São Paulo"
              value={formData.city || ""}
              onChange={handleChange}
            />

            <InputField
              label="Estado"
              name="state"
              type="text"
              placeholder="SP"
              value={formData.state || ""}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
