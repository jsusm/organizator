<script setup lang="ts">
import { operations } from '~/mockData/operations';

</script>
<template>
  <div class="mx-auto max-w-md">
    <Operations :operations="operations" />
  </div>
</template>
