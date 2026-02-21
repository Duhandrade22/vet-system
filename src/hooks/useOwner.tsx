import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { animalService } from "../services/animalService";
import { ownerService } from "../services/ownerService";
import { Animal, CreateAnimalDto } from "../types/Animal";
import type { Owner } from "../types/Owner";
import { showToast } from "../utils/helpers";

export const useOwner = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [formData, setFormData] = useState<Partial<CreateAnimalDto>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [filteredOwners, setFilteredOwners] = useState<Owner[]>([]);
  const [ownerFormData, setOwnerFormData] = useState<Owner | null>(null);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const loadData = async () => {
    try {
      const [ownerData, animalsData] = await Promise.all([
        ownerService.getById(id!),
        animalService.getByOwnerId(id!),
      ]);
      setOwner(ownerData);
      setAnimals(animalsData);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao carregar dados",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const loadOwners = async () => {
    try {
      const data = await ownerService.getAll();
      setOwners(data);
      setFilteredOwners(data);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao carregar tutores",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const filterOwners = (query: string) => {
    if (!query) {
      setFilteredOwners(owners);
    } else {
      const filtered = owners.filter(
        (owner) =>
          owner.name.toLowerCase().includes(query.toLowerCase()) ||
          owner.phone.includes(query) ||
          owner.email?.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredOwners(filtered);
    }
  };

  const handleDeleteOwner = async () => {
    if (
      !owner ||
      !window.confirm(`Tem certeza que deseja excluir o tutor "${owner.name}"?`)
    )
      return;

    try {
      await ownerService.delete(owner.id);
      showToast("Tutor excluído com sucesso!", "success");
      navigate("/");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao excluir tutor",
        "error",
      );
    }
  };

  const handleDeleteAnimal = async (animal: Animal) => {
    if (
      !window.confirm(
        `Tem certeza que deseja excluir o animal "${animal.name}"?`,
      )
    )
      return;

    try {
      await animalService.delete(animal.id);
      showToast("Animal excluído com sucesso!", "success");
      loadData();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao excluir animal",
        "error",
      );
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...formData,
        species: formData.customSpecies
          ? formData.customSpecies
          : formData.species,
      };
      delete dataToSend.customSpecies;

      if (editingAnimal) {
        await animalService.update(editingAnimal.id, dataToSend);
        showToast("Animal atualizado com sucesso!", "success");
      } else {
        await animalService.create(dataToSend as CreateAnimalDto);
        showToast("Animal cadastrado com sucesso!", "success");
      }
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao salvar animal",
        "error",
      );
      throw error;
    }
  };

  const startEditingOwner = () => {
    if (!owner) return;
    setOwnerFormData({ ...owner });
  };

  const cancelEditingOwner = () => {
    if (ownerFormData) {
      setOwner(ownerFormData);
    }
    setOwnerFormData(null);
  };

  const handleUpdateOwner = async () => {
    if (!owner) return;
    setLoading(true);
    try {
      await ownerService.update(owner.id, {
        name: owner.name,
        phone: owner.phone,
        email: owner.email,
        city: owner.city,
        state: owner.state,
      });

      await loadData();
      showToast("Tutor atualizado com sucesso!", "success");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao atualizar tutor",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDeleteOwner,
    handleDeleteAnimal,
    handleSubmit,
    handleUpdateOwner,
    setEditingAnimal,
    setFormData,
    setIsModalOpen,
    loadOwners,
    loadData,
    filterOwners,
    startEditingOwner,
    cancelEditingOwner,
    setOwner,
    loading,
    owner,
    animals,
    owners,
    filteredOwners,
    isModalOpen,
    editingAnimal,
    formData,
  };
};
