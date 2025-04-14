import type { HousePlanModel } from "@pages/housePlan/model/HousePlanModel";
import type { ColumnDef } from "@tanstack/vue-table";

export const columns: ColumnDef<HousePlanModel>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "created_at",
    header: "Создано",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "updated_at",
    header: "Обновлено",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "entrances",
    header: "Подъезды",
    cell: (info) => {
      const entrances = info.getValue() as unknown[];
      const count = entrances?.length ?? 0;

      const getLabel = (num: number) => {
        const mod10 = num % 10;
        const mod100 = num % 100;
        if (mod10 === 1 && mod100 !== 11) return "подъезд";
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
          return "подъезда";
        return "подъездов";
      };
      return `${count ? count : ""} ${getLabel(count)}`;
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: () => "",
  },
];
