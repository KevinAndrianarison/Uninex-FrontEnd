<template>
  <div class="body bg-white border rounded-lg min-h-[85vh]">
    <div class="head flex justify-center mt-2">
      <select class="mr-10 py-2 px-2 rounded border focus:outline-none">
        <option value="A">Les plus recents</option>
        <option value="A">Les plus aimés</option>
        <option value="A">Les plus recents</option>
      </select>

      <input
        type="search"
        class="py-2 px-2 rounded border focus:outline-none"
        placeholder="Rechercher..."
      />
    </div>
    <div class="flex justify-evenly mt-2">
      <div class="w-[20%] max-h-[200px] overflow-auto">
        <div class="flex text-blue-500">
          <p class="font-bold mr-4">X</p>
          Tags
        </div>
        <div class="flex">
          <p class="font-bold mr-4">X</p>
          Meta
        </div>
      </div>
      <div class="w-[45%] overflow-y-auto max-h-[80vh] rounded">
        <div class="flex p-4 border-2">
          <div class="image border">JO</div>
          <div class="content w-[95%] pl-4">
            <h1 class="font-bold">ANDRIANARISON Steeve</h1>
            <p class="titre">Titre de l'annonce</p>
            <p class="text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione nisi ipsum deserunt
              voluptatum. Nostrum ducimus exercitationem alias. Quibusdam, inventore. Hic
              repellendus consequuntur accusamus amet assumenda in perferendis beatae mollitia
              repellat.
            </p>
            <div class="mt-2 flex">
              <a href="" class="font-bold text-blue-500 underline">Nom du fichier.pdf </a>
              <p class="font-bold ml-2 text-blue-500">X</p>
            </div>
            <div class="flex mt-2 justify-between">
              <div class="flex">
                <p class="font-bold mr-4">X</p>
                <p class="font-bold mr-4">X</p>
                <p class="text-gray-500">3 hours ago</p>
              </div>
              <div class="flex">
                <p class="font-bold mr-4">X</p>
                <p class="font-bold">X</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[30%] border-2 rounded p-2">
        <h1 class="font-bold">Commentaires :</h1>
        <textarea
          placeholder="Ecrire ici..."
          class="border w-full min-h-[50px] focus:outline-none p-1"
        >
        </textarea>
        <div class="relative bottom-7 right-5 text-end"><p class="font-bold">X</p></div>
        <div class="max-h-[350px] overflow-y-auto">
          <di class="coms w-full flex">
            <div class="image border mr-1">LO</div>
            <div class="border w-[85%] p-1 rounded text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia libero ipsa ab quae,
              tenetur, vel dolor animi reiciendis iure, repudiandae cumque est dignissimos quo
              aspernatur totam magni et! Sed, amet!
              <div class="flex justify-end">
                <p class="font-bold mr-2">X</p>
                <p class="font-bold mr-2">X</p>
              </div>
            </div>
          </di>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.titre {
  font-size: 21px;
}
</style>
