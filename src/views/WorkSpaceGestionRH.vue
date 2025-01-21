<script setup>
import TotalUserChef from '@/components/TotalUserChef.vue'
import TotalUserChefParc from '@/components/TotalUserChefParc.vue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { UserGroupIcon } from '@heroicons/vue/24/outline'
import { Camera } from 'lucide-vue-next'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
</script>

<template>
  <!-- <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline"> Open </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">Name</div>
        <div class="grid grid-cols-4 items-center gap-4">Username</div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit"> Save changes </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet> -->
  <!-- <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple"> Apple </SelectItem>
        <SelectItem value="banana"> Banana </SelectItem>
        <SelectItem value="blueberry"> Blueberry </SelectItem>
        <SelectItem value="grapes"> Grapes </SelectItem>
        <SelectItem value="pineapple"> Pineapple </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select> -->
  <h1 class="titre font-bold">
    <UserGroupIcon class="h-7 w-7 mr-5" />
    Gestion RH
  </h1>
  <div class="head flex flex-wrap gap-4 justify-center">
    <TotalUserChef nombre="11" />
    <TotalUserChefParc nombre="12" />
  </div>
  <!-- <Camera color="red" :size="32" /> -->
</template>

<style scoped>
.titre {
  font-size: 26px;
  font-family: 'Montserrat', 'sans-serif';
  display: flex;
  align-items: center;
}
</style>
