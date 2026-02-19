import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimalCard } from "../../components/AnimalCard/AnimalCard";
import { Button } from "../../components/Button/Button";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { InputField, SelectField } from "../../components/Form/Form";
import { Breadcrumb, Header } from "../../components/Header/Header";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Modal } from "../../components/Modal/Modal";
import { useOwner } from "../../hooks/useOwner";
import type { Animal } from "../../types/Animal";
import { formatPhone } from "../../utils/formatters";
import styles from "./OwnerDetails.module.css";

export const OwnerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    owner,
    animals,
    loading,
    isModalOpen,
    editingAnimal,
    formData,
    setEditingAnimal,
    setFormData,
    setIsModalOpen,
    loadData,
    handleDeleteOwner,
    handleDeleteAnimal,
    handleSubmit,
  } = useOwner();

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const openCreateModal = () => {
    setEditingAnimal(null);
    setFormData({ ownerId: id });
    setIsModalOpen(true);
  };

  const openEditModal = (animal: Animal) => {
    setEditingAnimal(animal);
    setFormData({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
    });
    setIsModalOpen(true);
  };

  if (loading || !owner) {
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
        <Breadcrumb
          items={[{ label: "Dashboard", href: "/" }, { label: owner.name }]}
        />

        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className="detail-header__info">
              <h1 className={styles.headerTitle}>{owner.name}</h1>
              <p className={styles.headerSubtitle}>Informações do tutor</p>
            </div>
            <div className={styles.headerActions}>
              <Button variant="danger" onClick={handleDeleteOwner}>
                🗑️ Excluir
              </Button>
            </div>
          </div>

          <div className="detail-header__content">
            <div className="detail-header__field">
              <span className="detail-header__label">Telefone</span>
              <span className="detail-header__value">
                {formatPhone(owner.phone)}
              </span>
            </div>
            {owner.email && (
              <div className="detail-header__field">
                <span className="detail-header__label">E-mail</span>
                <span className="detail-header__value">{owner.email}</span>
              </div>
            )}
            {owner.city && owner.state && (
              <div className="detail-header__field">
                <span className="detail-header__label">Cidade</span>
                <span className="detail-header__value">
                  {owner.city}, {owner.state}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Animais{" "}
              <span className="detail-section__count">({animals.length})</span>
            </h2>
            <Button variant="primary" onClick={openCreateModal}>
              ➕ Adicionar Animal
            </Button>
          </div>

          {animals.length === 0 ? (
            <EmptyState
              icon="🐾"
              title="Nenhum animal cadastrado"
              description="Adicione o primeiro animal deste tutor."
              actionText="Adicionar Animal"
              onAction={openCreateModal}
            />
          ) : (
            <div className={styles.grid}>
              {animals.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  onEdit={openEditModal}
                  onDelete={handleDeleteAnimal}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAnimal ? "Editar Animal" : "Adicionar Animal"}
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
            label="Nome do animal"
            name="name"
            type="text"
            placeholder="Digite o nome do animal"
            required
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <SelectField
            label="Espécie"
            name="species"
            required
            value={formData.species || ""}
            onChange={(e) =>
              setFormData({ ...formData, species: e.target.value })
            }
            options={[
              { value: "Cachorro", label: "Cachorro" },
              { value: "Gato", label: "Gato" },
              { value: "Pássaro", label: "Pássaro" },
              { value: "Coelho", label: "Coelho" },
              { value: "Hamster", label: "Hamster" },
              { value: "Outro", label: "Outro" },
            ]}
          />

          <InputField
            label="Raça"
            name="breed"
            type="text"
            placeholder="Digite a raça (opcional)"
            value={formData.breed || ""}
            onChange={(e) =>
              setFormData({ ...formData, breed: e.target.value })
            }
          />
        </form>
      </Modal>
    </div>
  );
};
