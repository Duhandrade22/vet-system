import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { animalService } from "../services/animalService";
import { recordService } from "../services/recordService";
import { Animal } from "../types/Animal";
import { CreateRecordDto, Record } from "../types/Record";
import { formateDateTime } from "../utils/formatters";
import { showToast } from "../utils/helpers";

export const useAnimalDetails = () => {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [formData, setFormData] = useState<Partial<CreateRecordDto>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const loadData = async () => {
    try {
      const [animalData, recordsData] = await Promise.all([
        animalService.getById(id!),
        recordService.getByAnimalId(id!),
      ]);
      setAnimal(animalData);
      setRecords(recordsData);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao carregar dados",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnimal = async () => {
    if (
      !animal ||
      !window.confirm(
        `Tem certeza que deseja excluir o animal "${animal.name}"?`,
      )
    )
      return;

    try {
      await animalService.delete(animal.id);
      showToast("Animal excluído com sucesso!", "success");
      navigate(`/owners/${animal.ownerId}`);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao excluir animal",
        "error",
      );
    }
  };

  const handleDeleteRecord = async (record: Record) => {
    if (!window.confirm("Tem certeza que deseja excluir este prontuário?"))
      return;

    try {
      await recordService.delete(record.id);
      showToast("Prontuário excluído com sucesso!", "success");
      loadData();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao excluir prontuário",
        "error",
      );
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.weight ||
      !formData.attendedAt ||
      !formData.medications ||
      !formData.dosage ||
      !formData.notes
    ) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }
    try {
      if (editingRecord) {
        await recordService.update(editingRecord.id, {
          ...formData,
          attendedAt: formateDateTime(formData.attendedAt as string),
        });

        showToast("Prontuário atualizado com sucesso!", "success");
      } else {
        await recordService.create({
          ...formData,
          attendedAt: formateDateTime(formData.attendedAt as string),
        } as CreateRecordDto);

        showToast("Prontuário cadastrado com sucesso!", "success");
      }
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erro ao salvar prontuário",
        "error",
      );
      throw error;
    }
  };

  return {
    handleDeleteAnimal,
    handleDeleteRecord,
    handleSubmit,
    setEditingRecord,
    setFormData,
    setIsModalOpen,
    loading,
    animal,
    records,
    isModalOpen,
    editingRecord,
    formData,
    loadData,
  };
};
