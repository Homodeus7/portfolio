export const CODE_EXAMPLES = {
  dataStructure: `type EntranceModel = {
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
  };`,

  lifecycleCode: `const { data: houseData } = useHouseQuery(id ?? "", isEditMode);
  
  watchEffect(() => {
    if (houseData.value && isEditMode) {
      houseName.value = houseData.value.name;
      titleCrumb.setHousePlanTitle(id, houseData.value.name);
      setBuildingEntrance(houseData.value.entrances ?? []);
    }
  });`,

  addEntranceCode: `export const addEntrance = (entrancesData, maxItems = 20) => {
    if (entrancesData.length >= maxItems) {
      return { updatedEntrances: entrancesData, error: "Достигнут лимит подъездов." };
    }
  
    const newEntrance = { name: "", floors: 1, premises: 1, firstApartmentNumber: 1, lastApartmentNumber: 0 };
    return { updatedEntrances: [...entrancesData, newEntrance] };
  };`,

  removeEntranceCode: `export const removeEntrance = (entrancesData, deleteIndex) => {
    if (entrancesData.length === 1) return { updatedEntrances: entrancesData, error: "Нельзя удалить последний подъезд." };
    return { updatedEntrances: entrancesData.filter((_, i) => i !== deleteIndex) };
  };`,

  useEntranceCode: `const addMapsItem = () => {
    const { updatedEntrances, error } = addEntrance(entrancesData.value, 10);
    if (error) toast.add({ title: "Ошибка", description: error, color: "error" });
    else entrancesData.value = [...updatedEntrances];
  };
  
  const removeMapsItem = (index: number) => {
    const { updatedEntrances, error } = removeEntrance(entrancesData.value, index);
    if (error) toast.add({ title: "Ошибка", description: error, color: "error" });
    else entrancesData.value = [...updatedEntrances];
  };`,

  saveCode: `const clickSave = async () => {
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
  };`,

  deleteCode: `const onRemoveHousePlan = async () => {
    if (!isEditMode || !id) return;
    try {
      await deleteHouse({ id });
      toast.add({ title: "Удалено", description: "План дома удалён", color: "success" });
      router.push("/house-plans");
    } catch {
      toast.add({ title: "Ошибка", description: "Не удалось удалить план", color: "error" });
    }
  };`,

  uiCode: `<EntrancePlan
    :floors="entrance.floors"
    :premises="entrance.premises"
    :name="entrance.name"
    :first-number="entrance.firstApartmentNumber"
    @last-number="(lastNumber) => setLastApartmentNumber(lastNumber, index)"
  />`,

  crumbCode: `watchEffect(() => {
    if (houseData.value && isEditMode) {
      titleCrumb.setHousePlanTitle(id, houseData.value.name);
    }
  });`,

  errorCode: `if (isError.value) {
    toast.add({
      title: "Ошибка",
      description: "Не удалось загрузить план дома",
      color: "error",
    });
  }`,

  navCode: `const route = useRoute();
  const router = useRouter();
  
  if (!route.params.id) {
    router.push("/house-plans");
  };`,
};
