import { Check, Pencil, X } from "lucide-react";
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
    isEditingOwner,
    ownerFormData,
    setEditingAnimal,
    setFormData,
    setIsModalOpen,
    setOwnerFormData,
    loadData,
    handleDeleteOwner,
    handleDeleteAnimal,
    handleSubmit,
    handleUpdateOwner,
    startEditingOwner,
    cancelEditingOwner,
  } = useOwner();
  console.log("owner", owner);
  console.log("ownerFormData", ownerFormData);
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
            <div>
              <h1 className={styles.headerTitle}>{owner.name}</h1>
              <p className={styles.headerSubtitle}>Informações do tutor</p>
            </div>
            <div className={styles.headerActions}>
              {isEditingOwner ? (
                <>
                  <Button variant="secondary" onClick={cancelEditingOwner}>
                    <X size={16} /> Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleUpdateOwner}>
                    <Check size={16} /> Salvar
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" onClick={startEditingOwner}>
                    <Pencil size={16} /> Editar
                  </Button>
                  <Button variant="danger" onClick={handleDeleteOwner}>
                    Excluir
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className={styles.editForm}>
            <InputField
              label="Nome"
              name="name"
              type="text"
              required
              disabled={!isEditingOwner}
              value={isEditingOwner ? (ownerFormData.name ?? "") : owner.name}
              onChange={(e) =>
                setOwnerFormData({ ...ownerFormData, name: e.target.value })
              }
            />
            <InputField
              label="Telefone"
              name="phone"
              type="text"
              required
              disabled={!isEditingOwner}
              value={isEditingOwner ? (ownerFormData.phone ?? "") : owner.phone}
              onChange={(e) =>
                setOwnerFormData({ ...ownerFormData, phone: e.target.value })
              }
            />
            <InputField
              label="E-mail"
              name="email"
              type="email"
              disabled={!isEditingOwner}
              value={
                isEditingOwner
                  ? (ownerFormData.email ?? "")
                  : (owner.email ?? "")
              }
              onChange={(e) =>
                setOwnerFormData({ ...ownerFormData, email: e.target.value })
              }
            />
            <InputField
              label="Cidade"
              name="city"
              type="text"
              disabled={!isEditingOwner}
              value={
                isEditingOwner ? (ownerFormData.city ?? "") : (owner.city ?? "")
              }
              onChange={(e) =>
                setOwnerFormData({ ...ownerFormData, city: e.target.value })
              }
            />
            <SelectField
              label="Estado"
              name="state"
              disabled={!isEditingOwner}
              value={
                isEditingOwner
                  ? (ownerFormData.state ?? "")
                  : (owner.state ?? "")
              }
              onChange={(e) =>
                setOwnerFormData({ ...ownerFormData, state: e.target.value })
              }
              options={[
                { value: "AC", label: "Acre" },
                { value: "AL", label: "Alagoas" },
                { value: "AP", label: "Amapá" },
                { value: "AM", label: "Amazonas" },
                { value: "BA", label: "Bahia" },
                { value: "CE", label: "Ceará" },
                { value: "DF", label: "Distrito Federal" },
                { value: "ES", label: "Espírito Santo" },
                { value: "GO", label: "Goiás" },
                { value: "MA", label: "Maranhão" },
                { value: "MT", label: "Mato Grosso" },
                { value: "MS", label: "Mato Grosso do Sul" },
                { value: "MG", label: "Minas Gerais" },
                { value: "PA", label: "Pará" },
                { value: "PB", label: "Paraíba" },
                { value: "PR", label: "Paraná" },
                { value: "PE", label: "Pernambuco" },
                { value: "PI", label: "Piauí" },
                { value: "RJ", label: "Rio de Janeiro" },
                { value: "RN", label: "Rio Grande do Norte" },
                { value: "RS", label: "Rio Grande do Sul" },
                { value: "RO", label: "Rondônia" },
                { value: "RR", label: "Roraima" },
                { value: "SC", label: "Santa Catarina" },
                { value: "SP", label: "São Paulo" },
                { value: "SE", label: "Sergipe" },
                { value: "TO", label: "Tocantins" },
              ]}
            />
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
