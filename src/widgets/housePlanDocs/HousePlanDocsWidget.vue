<script setup lang="ts">
import { CODE_EXAMPLES } from "@pages/documentation/housePlanDocsPage/lib/code-examples";
import CodePreview from "@shared/components/codePreview/CodePreview.vue";
</script>

<template>
  <div class="flex flex-col gap-5">
    <h2 class="text-2xl pb-4 text-gray-100">Структура данных</h2>
    <CodePreview language="ts" :code="CODE_EXAMPLES.dataStructure" />

    <h2 class="text-2xl pb-4 text-gray-100">Жизненный цикл компоненты</h2>
    <CodePreview language="ts" :code="CODE_EXAMPLES.lifecycleCode" />

    <h2 class="text-2xl pb-4 text-gray-100">Добавление и удаление подъездов</h2>
    <p>Хелперы:</p>
    <CodePreview language="ts" :code="CODE_EXAMPLES.addEntranceCode" />
    <CodePreview language="ts" :code="CODE_EXAMPLES.removeEntranceCode" />
    <p>Использование:</p>
    <CodePreview language="ts" :code="CODE_EXAMPLES.useEntranceCode" />

    <h2 class="text-2xl pb-4 text-gray-100">Сохранение плана</h2>
    <CodePreview language="ts" :code="CODE_EXAMPLES.saveCode" />

    <h2 class="text-2xl pb-4 text-gray-100">Удаление плана</h2>
    <CodePreview language="ts" :code="CODE_EXAMPLES.deleteCode" />

    <h2 class="text-2xl pb-4 text-gray-100">UI-компоненты</h2>
    <CodePreview language="vue" :code="CODE_EXAMPLES.uiCode" />

    <h2 class="text-2xl pb-4 text-gray-100">Breadcrumb title</h2>
    <CodePreview language="ts" :code="CODE_EXAMPLES.crumbCode" />

    <h2 class="text-2xl pb-4 text-gray-100">UX Особенности</h2>
    <ul>
      <li>Лимит на количество подъездов</li>
      <li>Визуальный отклик через <code>toast</code></li>
      <li>Редирект после создания/удаления</li>
    </ul>
    <CodePreview language="ts" :code="CODE_EXAMPLES.errorCode" />

    <h2 class="text-2xl pb-4 text-gray-100">Навигация</h2>
    <p>Используется <code>useRoute</code> и <code>useRouter</code>:</p>
    <CodePreview language="ts" :code="CODE_EXAMPLES.navCode" />
  </div>
</template>
