<script setup lang="ts">
import {
  addEntrance,
  removeEntrance,
} from "@features/entrances/composables/entrancesUtils";
import type { EntranceModel } from "@features/entrances/model/EntrancesModel";
import {
  useCreateHouseMutation,
  useDeleteHouseMutation,
  useHouseQuery,
  useUpdateHouseMutation,
} from "@pages/housePlan/api/useHousePlanQuery";
import { useHousePlanTitleСrumbStore } from "@pages/housePlan/store/housePlanTitleСrumbStore";
import {
  AddRemoveButton,
  BaseModal,
  CalculationInput,
} from "@shared/components";
import { PageLayout } from "@shared/layout";
import EntrancePlan from "@widgets/entrancePlan/EntrancePlan.vue";
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const id = route.params.id as string | undefined;
const isEditMode = !!id;
const isVisibleModalDeletePlan = ref(false);
const titleCrumb = useHousePlanTitleСrumbStore();

const entrancesData = ref<EntranceModel[]>([
  {
    name: "",
    floors: 0,
    premises: 0,
    firstApartmentNumber: 0,
    lastApartmentNumber: 0,
  },
]);

const houseName = ref("");
const { data: houseData, isError } = useHouseQuery(id ?? "", isEditMode);
const { mutateAsync: updateHouse } = useUpdateHouseMutation();
const { mutateAsync: createHouse } = useCreateHouseMutation();
const { mutateAsync: deleteHouse } = useDeleteHouseMutation();

const setBuildingEntrance = (item: EntranceModel[]) => {
  entrancesData.value = [];
  item.forEach((entity) => {
    entrancesData.value?.push({
      name: entity.name,
      floors: entity.floors,
      premises: entity.premises,
      firstApartmentNumber: entity.firstApartmentNumber,
      lastApartmentNumber: entity.lastApartmentNumber,
    });
  });
};

watchEffect(() => {
  if (houseData.value && isEditMode) {
    houseName.value = houseData.value.name;
    titleCrumb.setHousePlanTitle(id, houseData.value.name);
    setBuildingEntrance(houseData.value.entrances ?? []);
  }
});

if (isError.value) {
  toast.add({
    title: "Ошибка",
    description: "Не удалось загрузить план дома",
    color: "error",
  });
}

const addMapsItem = () => {
  const { updatedEntrances, error } = addEntrance(entrancesData.value, 10);
  if (error) {
    toast.add({ title: "Ошибка", description: error, color: "error" });
  } else {
    entrancesData.value = [...updatedEntrances];
  }
};

const removeMapsItem = (index: number) => {
  const { updatedEntrances, error } = removeEntrance(
    entrancesData.value,
    index
  );
  if (error) {
    toast.add({ title: "Ошибка", description: error, color: "error" });
  } else {
    entrancesData.value = [...updatedEntrances];
  }
};

const setLastApartmentNumber = (num: number, index: number) => {
  entrancesData.value[index].lastApartmentNumber = num;
};

const clickSave = async () => {
  if (!houseName.value.trim()) {
    toast.add({
      title: "Ошибка",
      description: "Укажите название дома",
      color: "error",
    });
    return;
  }

  const payload = {
    name: houseName.value,
    entrances: entrancesData.value,
  };

  try {
    if (isEditMode) {
      await updateHouse({ id: id!, updates: payload });
      toast.add({
        title: "Успех",
        description: "План обновлён",
        color: "success",
      });
    } else {
      await createHouse(payload);
      toast.add({
        title: "Успех",
        description: "План создан",
        color: "success",
      });
      router.push("/house-plans");
    }
  } catch (e) {
    toast.add({
      title: "Ошибка",
      description: "Не удалось сохранить план",
      color: "error",
    });
  }
};
const onRemoveHousePlan = async () => {
  if (!isEditMode || !id) return;
  try {
    await deleteHouse({ id: id });
    toast.add({
      title: "Удалено",
      description: "План дома удалён",
      color: "success",
    });
    router.push("/house-plans");
  } catch {
    toast.add({
      title: "Ошибка",
      description: "Не удалось удалить план",
      color: "error",
    });
  }
};

function handleSubmit() {
  onRemoveHousePlan();
  isVisibleModalDeletePlan.value = false;
}
</script>

<template>
  <PageLayout
    :title="isEditMode ? `План дома ${houseName}` : 'Создание плана дома'"
  >
    <template #header-content>
      <div v-if="isEditMode">
        <UButton
          color="error"
          variant="subtle"
          @click="isVisibleModalDeletePlan = true"
          >Удалить</UButton
        >
      </div>
    </template>
    <template #content>
      <form @submit.prevent="clickSave">
        <div class="pt-6 w-full flex flex-col gap-[72px]">
          <UFormField label="Адрес дома">
            <UInput
              v-model="houseName"
              state="solid"
              color="primary"
              placeholder="Введите адрес дома"
            />
          </UFormField>
          <div class="flex flex-col justify-center gap-4">
            <div class="flex items-center text-xs text-gray-500 gap-8">
              <span class="w-[30px]">Номер</span>
              <span class="w-[250px]">Наименование</span>
              <span class="w-[170px]">Количество этажей</span>
              <span class="w-[170px]">Количество помещений</span>
              <span class="w-[100px]">Номера квартир</span>
              <span class="w-[60px]">Действие</span>
            </div>

            <div
              class="flex items-center gap-8"
              v-for="(entrance, index) in entrancesData"
              :key="(entrance.name, index)"
            >
              <span class="w-[30px] text-gray-200">{{ index + 1 }}.</span>
              <div class="w-[250px]">
                <UInput v-model="entrance.name" state="solid" color="primary" />
              </div>
              <div class="w-[170px]">
                <CalculationInput v-model="entrance.floors" />
              </div>
              <div class="w-[170px]">
                <CalculationInput v-model="entrance.premises" />
              </div>
              <div class="w-[100px]">
                <div class="flex items-center gap-4">
                  <span class="text-gray-200">с </span>
                  <UInput v-model.number="entrance.firstApartmentNumber" />
                </div>
              </div>

              <div class="w-[60px]">
                <AddRemoveButton
                  :index="index"
                  @add="addMapsItem"
                  @remove="removeMapsItem(index)"
                />
              </div>
            </div>
          </div>

          <div class="flex gap-12 flex-wrap">
            <div v-for="(entrance, index) in entrancesData" :key="index">
              <EntrancePlan
                :floors="entrance.floors"
                :premises="entrance.premises"
                :name="entrance.name"
                :first-number="entrance.firstApartmentNumber"
                @last-number="
                  (lastNumber) => setLastApartmentNumber(lastNumber, index)
                "
              />
            </div>
          </div>
          <div class="self-end">
            <UButton type="submit" color="success" variant="subtle">
              {{ isEditMode ? "Сохранить" : "Создать план" }}</UButton
            >
          </div>
        </div>
      </form>
    </template>
  </PageLayout>

  <!-- Modals -->
  <BaseModal
    v-model:open="isVisibleModalDeletePlan"
    @on-action="handleSubmit"
    :title="`Удаление плана дома${houseName ? ' ' + houseName : ''}`"
    description="Это действие нельзя отменить"
    actionBtnName="Удалить"
  >
    <template #body>
      <p>Вы уверены, что хотите удалить этот элемент?</p>
    </template>
  </BaseModal>
</template>
