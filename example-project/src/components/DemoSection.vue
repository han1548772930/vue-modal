<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">
        <slot name="title" />
      </h3>
      <p class="text-muted-foreground text-sm">
        <slot name="description" />
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <slot name="buttons" />
    </div>
    
    <div v-if="$slots.default" class="pt-4 border-t">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo section component for organizing examples
</script>
