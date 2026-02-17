import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { animalService } from "../services/animalService";
import { recordService } from "../services/recordService";
import { Animal } from "../types/Animal";
import { Record, UpdateRecordDto } from "../types/Record";
import { showToast } from "../utils/helpers";

export const useRecordDetails = () => {
  const [record, setRecord] = useState<Record | null>(null);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<UpdateRecordDto>>({});

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const loadData = async () => {
    try {
      const recordData = await recordService.getById(id!);
      const animalData = await animalService.getById(recordData.animalId);
      setRecord(recordData);
      setAnimal(animalData);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao carregar prontuário",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = async () => {
    if (
      !record ||
      !window.confirm("Tem certeza que deseja excluir este prontuário?")
    )
      return;

    try {
      await recordService.delete(record.id);
      showToast("Prontuário excluído com sucesso!", "success");
      navigate(`/animals/${record.animalId}`);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao excluir prontuário",
        "error",
      );
    }
  };

  const handleUpdate = async () => {
    if (!record) return;

    try {
      await recordService.update(record.id, formData);
      showToast("Prontuário atualizado com sucesso!", "success");
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao atualizar prontuário",
        "error",
      );
      throw error;
    }
  };

  return {
    handleDeleteRecord,
    handleUpdate,
    setIsModalOpen,
    setFormData,
    loading,
    record,
    animal,
    isModalOpen,
    formData,
    loadData,
  };
};
