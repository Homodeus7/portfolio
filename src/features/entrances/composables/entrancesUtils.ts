import { EntranceModel } from "../model/EntrancesModel";

/**
 * Добавление нового подъезда в массив подъездов.
 * @param entrancesData - массив подъездов
 * @param maxItems - максимальное количество подъездов
 * @returns новый массив подъездов или сообщение об ошибке
 */
export const addEntrance = (
  entrancesData: EntranceModel[],
  maxItems: number = 20
): { updatedEntrances: EntranceModel[]; error?: string } => {
  if (entrancesData.length >= maxItems) {
    return {
      updatedEntrances: entrancesData,
      error: "Достигнут лимит подъездов.",
    };
  }

  const newEntrance: EntranceModel = {
    name: "",
    floors: 1,
    premises: 1,
    firstApartmentNumber: 1,
    lastApartmentNumber: 0,
  };

  return { updatedEntrances: [...entrancesData, newEntrance] };
};

/**
 * Удаление подъезда из массива подъездов.
 * @param entrancesData - массив подъездов
 * @param deleteIndex - индекс удаляемого подъезда
 * @returns новый массив подъездов или сообщение об ошибке
 */
export const removeEntrance = (
  entrancesData: EntranceModel[],
  deleteIndex: number
): { updatedEntrances: EntranceModel[]; error?: string } => {
  if (entrancesData.length === 1) {
    return {
      updatedEntrances: entrancesData,
      error: "Нельзя удалить последний подъезд.",
    };
  }

  if (deleteIndex < 0 || deleteIndex >= entrancesData.length) {
    return {
      updatedEntrances: entrancesData,
      error: "Некорректный индекс для удаления.",
    };
  }

  const updatedEntrances = entrancesData.filter(
    (_, index) => index !== deleteIndex
  );
  return { updatedEntrances };
};
