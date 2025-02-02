<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toast } from "vue-sonner";

const formSchema = toTypedSchema(
  z.object({
    description: z.string().optional(),
    amount: z.string().refine((amount) => parseFloat(amount) > 0, {
      message: "Amount should be more than 0.",
    }),
    category: z.string().min(3, { message: "Be more descriptive." }),
  }),
);

const cents = ref("0.00");

const { isFieldDirty, handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    amount: cents.value,
  },
});

const onUpdateCents = (e: Event) => {
  async function forceUpdate() {
    const value = (e.target as HTMLInputElement).value;
    // cents value needs to change to refect in input element
    // this value shoud be whatever
    cents.value = "\t";
    await nextTick();
    const sanitizedValue = value.replace(/[^\d]/g, "");
    let quantity = parseInt(sanitizedValue);
    if (isNaN(quantity)) {
      quantity = 0;
    }
    cents.value = (quantity / 100).toFixed(2);

    // update form
    setFieldValue("amount", cents.value);
  }
  forceUpdate();
};

const { createTransaction } = useTransactions();
const onSubmit = handleSubmit(async (values) => {
  createTransaction({
    amount: parseFloat(values.amount),
    categoryTitle: values.category,
    desc: values.description ?? "",
  });

  navigateTo("/");

  toast("Transaction Created", {
    description: "Transition was created succesfully",
  });
});
</script>
<template>
  <main class="mx-auto min-h-screen max-w-screen-lg flex flex-col">
    <div class="mt-12 mx-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as-child
              ><NuxtLink to="/"> Home </NuxtLink></BreadcrumbLink
            >
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Transaction</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="flex justify-center items-center flex-1 mb-24 mx-6">
      <div class="max-w-sm w-full">
        <div class="mb-4">
          <h2 class="font-medium text-lg leading-tight">Create Transaction</h2>
        </div>
        <form class="space-y-6" @submit="onSubmit">
          <FormField
            v-slot="{ errors }"
            name="amount"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  :default-value="cents"
                  :value="cents"
                  @input="onUpdateCents"
                />
              </FormControl>
              <FormDescription v-if="!errors.length">
                How much.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="description"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Hamburgers with friends, launch, internet bill ..."
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription> Be descriptive. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField, errors }"
            name="category"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Food, Family, House, Pets, Hobbies ..."
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription v-if="!errors.length">
                Be descriptive.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex justify-end flex-col sm:flex-row">
            <Button type="submit"> Submit </Button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
