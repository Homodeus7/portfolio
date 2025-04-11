import type { Entrance } from "@pages/housePlans/types";

/**
 * Добавление нового подъезда в массив подъездов.
 * @param entrancesData - массив подъездов
 * @param maxItems - максимальное количество подъездов
 * @returns новый массив подъездов или сообщение об ошибке
 */
export const addEntrance = (
  entrancesData: Entrance[],
  maxItems: number = 20
): { updatedEntrances: Entrance[]; error?: string } => {
  if (entrancesData.length >= maxItems) {
    return {
      updatedEntrances: entrancesData,
      error: "Достигнут лимит подъездов.",
    };
  }

  const newEntrance: Entrance = {
    name: "",
    floors: 0,
    premises: 0,
    firstApartmentNumber: 0,
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
  entrancesData: Entrance[],
  deleteIndex: number
): { updatedEntrances: Entrance[]; error?: string } => {
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
