import { cva, type VariantProps } from "class-variance-authority";

export { default as DropdownMenu } from "./DropdownMenu.vue";

export { default as DropdownMenuCheckboxItem } from "./DropdownMenuCheckboxItem.vue";
export { default as DropdownMenuContent } from "./DropdownMenuContent.vue";
export { default as DropdownMenuGroup } from "./DropdownMenuGroup.vue";
export { default as DropdownMenuItem } from "./DropdownMenuItem.vue";
export { default as DropdownMenuLabel } from "./DropdownMenuLabel.vue";
export { default as DropdownMenuRadioGroup } from "./DropdownMenuRadioGroup.vue";
export { default as DropdownMenuRadioItem } from "./DropdownMenuRadioItem.vue";
export { default as DropdownMenuSeparator } from "./DropdownMenuSeparator.vue";
export { default as DropdownMenuShortcut } from "./DropdownMenuShortcut.vue";
export { default as DropdownMenuSub } from "./DropdownMenuSub.vue";
export { default as DropdownMenuSubContent } from "./DropdownMenuSubContent.vue";
export { default as DropdownMenuSubTrigger } from "./DropdownMenuSubTrigger.vue";
export { default as DropdownMenuTrigger } from "./DropdownMenuTrigger.vue";
export { DropdownMenuPortal } from "radix-vue";

export const dropdownMenuItemVariant = cva(
  "relative flex cursor-default select-none items-center rounded-sm gap-2 px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50  [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "",
        danger: "text-red-700 focus:text-red-700 focus:bg-red-50"
      }
    },
  },
);

export type DropdownMenuItemVariant = VariantProps<typeof dropdownMenuItemVariant>;
