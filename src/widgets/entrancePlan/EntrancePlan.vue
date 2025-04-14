<script lang="ts" setup>
import { computed, watch } from "vue";

interface Props {
  name?: string;
  floors: number;
  premises: number;
  firstNumber: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["lastNumber"]);

// Предрасчёт номеров квартир по этажам (снизу вверх)
const apartmentNumbers = computed(() => {
  const result: number[][] = [];
  for (let floor = 0; floor < props.floors; floor++) {
    const floorNumbers = [];
    for (let unit = 0; unit < props.premises; unit++) {
      floorNumbers.push(props.firstNumber + floor * props.premises + unit);
    }
    result.unshift(floorNumbers); // этажи снизу вверх
  }
  return result;
});

watch(apartmentNumbers, (floors) => {
  const last = floors.at(0)?.at(-1) ?? null;
  emit("lastNumber", last);
});
</script>

<template>
  <div class="flex flex-col items-center gap-4 transition-all duration-500">
    <!-- Этажи и помещения -->
    <div class="flex gap-8">
      <!-- Номера этажей -->
      <div
        class="grid gap-4 rtl"
        :style="`grid-template-rows: repeat(${props.floors}, 40px);`"
      >
        <div
          v-for="floorIndex in props.floors"
          :key="`floor-${floorIndex}`"
          class="w-[10px] h-10 flex justify-center items-center text-xs text-gray-500"
          :style="`order: ${props.floors - floorIndex};`"
        >
          {{ floorIndex }}
        </div>
      </div>

      <!-- Сетка квартир -->
      <TransitionGroup
        name="apt"
        tag="div"
        class="grid gap-4 transition-all duration-500"
        :style="`grid-template-rows: repeat(${props.floors}, 40px); grid-template-columns: repeat(${props.premises}, 40px);`"
      >
        <template
          v-for="(floor, floorIndex) in apartmentNumbers"
          :key="`floor-${floorIndex}`"
        >
          <template
            v-for="(apartment, unitIndex) in floor"
            :key="`apt-${floorIndex}-${unitIndex}`"
          >
            <div
              class="bg-[#41b883] w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            >
              {{ apartment }}
            </div>
          </template>
        </template>
      </TransitionGroup>
    </div>

    <!-- Название подъезда -->
    <div class="w-full text-sm text-gray-500 text-center pl-[50px]">
      {{ props.name }}
    </div>
  </div>
</template>

<style scoped>
.apt-enter-active,
.apt-leave-active,
.apt-move {
  transition: all 0.3s ease;
}
.apt-enter-from,
.apt-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
