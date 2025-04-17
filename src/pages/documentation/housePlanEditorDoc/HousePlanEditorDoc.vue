<script setup lang="ts">
import CodePreview from "@shared/components/codePreview/CodePreview.vue";
import PageLayout from "@shared/layouts/pageLayout/PageLayout.vue";

const dataStructure = `type EntranceModel = {
   name: string;
   floors: number;
   premises: number;
   firstApartmentNumber: number;
   lastApartmentNumber: number;
 };
 
 type HousePlanModel = {
   id: string;
   name: string;
   entrances: EntranceModel[];
 };`;

const lifecycleCode = `const { data: houseData } = useHouseQuery(id ?? "", isEditMode);
 
 watchEffect(() => {
   if (houseData.value && isEditMode) {
     houseName.value = houseData.value.name;
     titleCrumb.setHousePlanTitle(id, houseData.value.name);
     setBuildingEntrance(houseData.value.entrances ?? []);
   }
 });`;

const addEntranceCode = `export const addEntrance = (entrancesData, maxItems = 20) => {
   if (entrancesData.length >= maxItems) {
     return { updatedEntrances: entrancesData, error: "Достигнут лимит подъездов." };
   }
 
   const newEntrance = { name: "", floors: 1, premises: 1, firstApartmentNumber: 1, lastApartmentNumber: 0 };
   return { updatedEntrances: [...entrancesData, newEntrance] };
 };`;

const removeEntranceCode = `export const removeEntrance = (entrancesData, deleteIndex) => {
   if (entrancesData.length === 1) return { updatedEntrances: entrancesData, error: "Нельзя удалить последний подъезд." };
   return { updatedEntrances: entrancesData.filter((_, i) => i !== deleteIndex) };
 };`;

const useEntranceCode = `const addMapsItem = () => {
   const { updatedEntrances, error } = addEntrance(entrancesData.value, 10);
   if (error) toast.add({ title: "Ошибка", description: error, color: "error" });
   else entrancesData.value = [...updatedEntrances];
 };
 
 const removeMapsItem = (index: number) => {
   const { updatedEntrances, error } = removeEntrance(entrancesData.value, index);
   if (error) toast.add({ title: "Ошибка", description: error, color: "error" });
   else entrancesData.value = [...updatedEntrances];
 };`;

const saveCode = `const clickSave = async () => {
   if (!houseName.value.trim()) {
     toast.add({ title: "Ошибка", description: "Укажите название дома", color: "error" });
     return;
   }
 
   const payload = { name: houseName.value, entrances: entrancesData.value };
 
   try {
     if (isEditMode) {
       await updateHouse({ id: id!, updates: payload });
       toast.add({ title: "Успех", description: "План обновлён", color: "success" });
     } else {
       await createHouse(payload);
       toast.add({ title: "Успех", description: "План создан", color: "success" });
       router.push("/house-plans");
     }
   } catch {
     toast.add({ title: "Ошибка", description: "Не удалось сохранить план", color: "error" });
   }
 };`;

const deleteCode = `const onRemoveHousePlan = async () => {
   if (!isEditMode || !id) return;
   try {
     await deleteHouse({ id });
     toast.add({ title: "Удалено", description: "План дома удалён", color: "success" });
     router.push("/house-plans");
   } catch {
     toast.add({ title: "Ошибка", description: "Не удалось удалить план", color: "error" });
   }
 };`;

const uiCode = `<EntrancePlan
   :floors="entrance.floors"
   :premises="entrance.premises"
   :name="entrance.name"
   :first-number="entrance.firstApartmentNumber"
   @last-number="(lastNumber) => setLastApartmentNumber(lastNumber, index)"
 />`;

const crumbCode = `watchEffect(() => {
   if (houseData.value && isEditMode) {
     titleCrumb.setHousePlanTitle(id, houseData.value.name);
   }
 });`;

const errorCode = `if (isError.value) {
   toast.add({
     title: "Ошибка",
     description: "Не удалось загрузить план дома",
     color: "error",
   });
 }`;

const navCode = `const route = useRoute();
 const router = useRouter();
 
 if (!route.params.id) {
   router.push("/house-plans");
 }`;
</script>

<template>
  <PageLayout title="House Plan Editor — Документация">
    <template #header-desc>
      <p class="text-lg text-gray-400">
        Интерфейс редактирования и создания планов домов с подъездами.
        Используются: <code>Vue 3</code>, <code>Vue Router</code>,
        <code>Vue Query</code>, <code>Supabase</code>, <code>Zod</code>,
        <code>Pinia</code>.
      </p>
    </template>

    <template #content>
      <div class="flex flex-col gap-5 py-10">
        <h2 class="text-2xl pb-4 text-gray-100">Структура данных</h2>
        <CodePreview language="ts" :code="dataStructure" />

        <h2 class="text-2xl pb-4 text-gray-100">Жизненный цикл компоненты</h2>
        <CodePreview language="ts" :code="lifecycleCode" />

        <h2 class="text-2xl pb-4 text-gray-100">
          Добавление и удаление подъездов
        </h2>
        <p>Хелперы:</p>
        <CodePreview language="ts" :code="addEntranceCode" />
        <CodePreview language="ts" :code="removeEntranceCode" />
        <p>Использование:</p>
        <CodePreview language="ts" :code="useEntranceCode" />

        <h2 class="text-2xl pb-4 text-gray-100">Сохранение плана</h2>
        <CodePreview language="ts" :code="saveCode" />

        <h2 class="text-2xl pb-4 text-gray-100">Удаление плана</h2>
        <CodePreview language="ts" :code="deleteCode" />

        <h2 class="text-2xl pb-4 text-gray-100">UI-компоненты</h2>
        <CodePreview language="vue" :code="uiCode" />

        <h2 class="text-2xl pb-4 text-gray-100">Breadcrumb title</h2>
        <CodePreview language="ts" :code="crumbCode" />

        <h2 class="text-2xl pb-4 text-gray-100">UX Особенности</h2>
        <ul>
          <li>Лимит на количество подъездов</li>
          <li>Визуальный отклик через <code>toast</code></li>
          <li>Редирект после создания/удаления</li>
        </ul>
        <CodePreview language="ts" :code="errorCode" />

        <h2 class="text-2xl pb-4 text-gray-100">Навигация</h2>
        <p>Используется <code>useRoute</code> и <code>useRouter</code>:</p>
        <CodePreview language="ts" :code="navCode" />
      </div>
    </template>
  </PageLayout>
</template>

<style scoped>
/* Если ты хочешь добавить специфические стили к .prose — можешь расширить тут */
</style>
