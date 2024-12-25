<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { toDate } from "radix-vue/date";
import { cn } from "@/lib/utils";
import { categories } from "~/mockData/operations";
import {
  createOperationSchema,
  type CreateOperationSchema,
} from "~/schemas/operations";
import type { CreateCategorySchema } from "~/schemas/categories";

defineProps<{
  submitting: boolean;
  error?: string;
  submittingCategory: boolean;
  categoryError?: string;
}>();

const emit = defineEmits<{
  submit: [values: CreateOperationSchema];
  submitCategory: [values: CreateCategorySchema];
}>();

const formSchema = toTypedSchema(createOperationSchema);

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    description: "",
  },
});

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const operationDate = computed({
  get: () => (values.date ? parseDate(values.date) : undefined),
  set: (val) => val,
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
});
</script>
<template>
  <div class="px-2 pb-16 pt-8">
    <form @submit="onSubmit" class="space-y-6">
      <p class="text-xl font-medium pb-4">Register Operation</p>

      <!-- Date -->
      <FormField name="date">
        <FormItem class="flex flex-col">
          <FormLabel>Date</FormLabel>
          <Popover>
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  variant="outline"
                  class="text-start ps-3"
                  :class="cn(!operationDate && 'text-stone-400')"
                >
                  <span>{{
                    operationDate
                      ? df.format(toDate(operationDate))
                      : "Pick a Date"
                  }}</span>
                  <Icon name="tabler:calendar-week" class="h-4 w-4 ms-auto" />
                </Button>
                <input hidden />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="flex flex-col gap-2 p-2">
              <Button
                variant="outline"
                @click="
                  setFieldValue('date', today(getLocalTimeZone()).toString())
                "
                >Today
              </Button>
              <Calendar
                v-model="operationDate"
                calendar-label="Operation Date"
                initial-focus
                :min-value="new CalendarDate(2024, 1, 1)"
                :max-value="today(getLocalTimeZone())"
                @update:model-value="
                  (v) => {
                    if (v) setFieldValue('date', v.toString());
                    else setFieldValue('date', undefined);
                  }
                "
              />
            </PopoverContent>
          </Popover>
          <FormDescription>When the operation occurs</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Amount -->
      <FormField v-slot="{ value }" name="amount">
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <NumberField
              class="gap-2"
              :min="1"
              :format-options="{
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'code',
                currencySign: 'standard',
              }"
              :model-value="value"
              @update:model-value="
                (v) => {
                  if (v) setFieldValue('amount', v);
                  else setFieldValue('amount', 0);
                }
              "
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <FormControl>
                  <NumberFieldInput />
                </FormControl>
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </FormControl>
          <FormDescription> Amount of operation </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- category -->
      <FormField name="categoryId" v-slot="{ componentField }">
        <FormItem>
          <div class="flex items-center">
            <FormLabel class="flex-1">Category</FormLabel>
            <div>
              <Dialog>
                <DialogTrigger>
                  <Button size="sm" type="button" variant="outline"
                    >Create new</Button
                  >
                </DialogTrigger>
                <DialogContent class="w-96">
                  <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                    <DialogDescription
                      >Categorize your operations findthem
                      easily</DialogDescription
                    >
                  </DialogHeader>
                  <OperationsCreateCategoryForm
                    :submitting="submittingCategory"
                    :error="categoryError"
                    @submit="(values) => $emit('submitCategory', values)"
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="no_category">No Category</SelectItem>
                  <SelectItem
                    v-for="category in categories"
                    :value="category.id"
                    >{{ category.title }}</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </FormControl>
          </Select>
          <FormDescription>Categorize your operations</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Description -->
      <FormField name="description" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              placeholder="Hamburgers with friends, pay electicity, ..."
            />
          </FormControl>
          <FormDescription>
            Use a description that let you remember what you did
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex flex-col sm:flex-row justify-end gap-4">
        <Button type="button" variant="secondary">Cancel</Button>
        <Button type="submit" :disabled="submitting">
          <Icon
            name="tabler:loader-2"
            v-if="submitting"
            class="w-4 h-4 animate-spin mr-1"
          />
          Submit
        </Button>
      </div>
    </form>
  </div>
</template>
