<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import Button from "../ui/button/Button.vue";
import ToggleGroup from "../ui/toggle-group/ToggleGroup.vue";
import ToggleGroupItem from "../ui/toggle-group/ToggleGroupItem.vue";
import FormLabel from "../ui/form/FormLabel.vue";
import { icons, colors } from "@/mockData/categories";
import FormMessage from "../ui/form/FormMessage.vue";
import { createCategorySchema } from "~/schemas/categories";
import * as z from "zod";

withDefaults(
  defineProps<{
    error?: string;
    submitting?: boolean;
  }>(),
  { submitting: false },
);

const emit = defineEmits<{
  submit: [values: z.infer<typeof createCategorySchema>];
}>();

const formSchema = toTypedSchema(createCategorySchema);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {},
});

const handleSubmit = form.handleSubmit(async (values) => {
  emit("submit", values);
});
</script>
<template>
  <form @submit="handleSubmit" class="space-y-6">
    <div class="flex gap-2">
      <DashboardCategory
        :icon-name="form.values.icon ?? ''"
        :color="form.values.color"
      />
      <p class="text-lg font-medium">{{ form.values.title }}</p>
    </div>

    <!-- Title -->
    <FormField name="title" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <!-- Icon -->
      <FormField name="icon">
        <FormItem class="flex flex-col gap-1">
          <FormLabel class="mt-1.5">Select Icon</FormLabel>
          <Popover>
            <PopoverTrigger as-child>
              <FormControl>
                <Button variant="outline" type="button" class="font-normal">
                  <span v-if="!form.values.icon" class="text-stone-400"
                    >Select Icon</span
                  >
                  <Icon
                    :name="`tabler:${form.values.icon}`"
                    v-if="form.values.icon"
                    class="w-5 h-5"
                  />
                </Button>
                <input hidden />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="p-2 w-60">
              <ScrollArea class="h-[200px]">
                <ToggleGroup
                  :default-value="form.values.icon"
                  @update:model-value="
                    (v) => {
                      if (typeof v === 'string')
                        form.setFieldValue('icon', v ?? '');
                      else form.setFieldValue('icon', v[0] ?? '');
                    }
                  "
                  type="single"
                  class="grid grid-cols-4"
                  variant="outline"
                  size="lg"
                >
                  <ToggleGroupItem v-for="icon in icons" :value="icon">
                    <Icon
                      :name="`tabler:${icon}`"
                      class="w-5 h-5 text-stone-200"
                    />
                  </ToggleGroupItem>
                </ToggleGroup>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Color -->
      <FormField name="color" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Color</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="color in colors" :value="color">
                  <span :class="[`text-${color}-500`]" class="pr-1">⬤ </span>
                  {{ color }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex justify-end">
      <Button :disabled="submitting">
        <Icon
          name="tabler:loader-2"
          v-if="submitting"
          class="w-4 h-4 animate-spin mr-1"
        />
        Create
      </Button>
    </div>
  </form>
</template>
