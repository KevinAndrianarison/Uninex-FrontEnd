<!-- <template>
  <div class="body">
    <div class="inProgress"></div>
    <p>Page en cours de développement ! ⏳</p>
  </div>
</template>

<script setup></script>

<style scoped src="../styles/PageInProgress.css"></style> -->

<template>
  <div class="flex justify-between body min-h-[85vh] max-h-[85vh]">
    <div class="bg-white border border-2 w-[30%] rounded-2xl p-4">
      <div class="flex items-center justify-between px-2">
        <h1 class="text-xl text-center font-bold">Discussions</h1>
        <p class="font-bold">X</p>
      </div>
      <input
        type="text"
        placeholder="Recherche"
        class="bg-gray-100 w-full mt-2 py-1 px-5 rounded-3xl focus:outline-none"
      />
      <div class="flex justify-between px-1.5 bg-gray-800 w-[90%] m-auto mt-2 py-1 rounded-3xl">
        <div class="text-white bg-gray-500 w-[45%] py-0.5 rounded-3xl text-center">Toutes</div>
        <div class="text-white w-[45%] text-center">Groupes</div>
        <div></div>
      </div>
      <div class="mt-5 max-h-[75%] overflow-y-auto">
        <div class="bg-gray-100 w-full flex rounded-3xl">
          <div class="logo w-[48px] h-[50px] bg-blue-200 rounded-3xl">LO</div>
          <div class="px-3 w-[80%] flex flex-col justify-center">
            <div class="flex justify-between items-center">
              <p>Steeve</p>
              <p class="text-gray-500 text-xs">15h35</p>
            </div>
            <div class="text-gray-500 text-xs">Contenu du message</div>
          </div>
        </div>
        <div class="mt-2 w-full flex">
          <div class="logo w-[48px] h-[50px] bg-blue-200 rounded-3xl">LO</div>
          <div class="px-3 w-[80%] flex flex-col justify-center">
            <div class="flex justify-between items-center">
              <p>Steeve</p>
              <p class="text-gray-500 text-xs">15h35</p>
            </div>
            <div class="text-gray-500 text-xs">Contenu du message</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-green-100 border-2 rounded-xs  w-[65%]">
      <div class="divBlur bg-white border-b flex items-center pl-5 justify-between px-5 h-[8%]">
        <p class="font-bold text-lg">Steeve Vevin</p>
        <p class="font-bold">X</p>
      </div>
      <div class="h-[80%] max-h-[80%] overflow-y-auto bg-green-100 px-5">
        <p class="text-black text-center py-1">Nouvelle discussion</p>
        <div class="w-[50%] mt-2 flex items-end">
          <div class="bg-blue-300 rounded-3xl logo w-[50px] h-[50px] mr-2">A</div>
          <div class="w-[80%]">
            <p class="borderRadius bg-white border p-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, odio a repellat
              reiciendis praesentium atque, asperiores necessitatibus porro esse sapiente illo.
              Saepe ut explicabo laudantium cumque impedit. Nostrum, rerum voluptates.
            </p>
          </div>
        </div>
        <div class="w-[full] mt-2 flex justify-end items-end">
          <div class="w-[45%] mr-2">
            <p class="borderRadiusReverse bg-white border p-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, odio a repellat
              reiciendis praesentium atque, asperiores necessitatibus porro esse sapiente illo.
              Saepe ut explicabo laudantium cumque impedit. Nostrum, rerum voluptates.
            </p>
          </div>
          <div class="bg-blue-300 rounded-3xl logo w-[50px] h-[50px]">A</div>
        </div>
      </div>
      <div class="h-[12%]  flex justify-between items-center px-5">
        <input type="text" class="h-[75%] rounded-3xl px-5 w-[80%]" placeholder="Ecrire ici...">
        <div class="justify-evenly flex w-[15%]">
          <p class="font-bold">X</p>
          <p class="font-bold">X</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.borderRadius {
  border-radius: 20px 20px 20px 0;
}

.borderRadiusReverse {
  border-radius: 20px 20px 0px 20px;
}
</style>
