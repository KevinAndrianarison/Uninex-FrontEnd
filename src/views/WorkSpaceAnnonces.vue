<template>
  <div class="body bg-white border rounded-lg min-h-[85vh]">
    <div class="head flex justify-center mt-2">
      <select class="mr-10 py-2 px-2 rounded border focus:outline-none">
        <option value="A">Les plus important</option>
        <option value="A">Les plus recents</option>
        <option value="A">Les plus aimés</option>
      </select>

      <input
        type="search"
        class="py-2 px-2 rounded border focus:outline-none"
        placeholder="Rechercher..."
      />
    </div>
    <div class="flex justify-evenly mt-2">
      <div class="w-[20%] max-h-[200px] overflow-auto cursor-pointer">
        <div class="flex text-blue-500">📚 Education</div>
        <div class="flex">🏀 Sport</div>
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
                <p class="font-bold mr-4">
                  <font-awesome-icon
                    class="iconadd text-gray-500 cursor-pointer text-red-500"
                    :icon="['fas', 'heart']"
                  />
                  100
                </p>
                <p class="font-bold mr-4">
                  <Tooltip content="Commentaires">
                    <font-awesome-icon
                      class="iconadd text-gray-500 cursor-pointer text-gray-500 mr-1"
                      :icon="['fas', 'comment-dots']" /></Tooltip
                  >20
                </p>
                <p class="text-gray-500">3 hours ago</p>
              </div>
              <div class="flex">
                <p class="font-bold mr-4">
                  <Tooltip content="Modifier">
                    <font-awesome-icon
                      class="iconadd cursor-pointer text-yellow-500"
                      :icon="['fas', 'pen']"
                  /></Tooltip>
                </p>
                <p class="font-bold">
                  <Tooltip content="Supprimer">
                    <font-awesome-icon
                      class="iconadd text-gray-500 cursor-pointer text-red-500"
                      :icon="['fas', 'trash-can']"
                      @click="showDeletePost()"
                  /></Tooltip>
                </p>
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
        <div class="relative bottom-7 right-5 text-end">
          <Tooltip content="Envoyer">
            <font-awesome-icon
              class="iconadd text-gray-500 cursor-pointer"
              :icon="['fas', 'paper-plane']"
            />
          </Tooltip>
        </div>
        <div class="max-h-[350px] overflow-y-auto">
          <di class="coms w-full flex">
            <div class="image border mr-1">LO</div>
            <div class="border w-[85%] p-1 rounded text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia libero ipsa ab quae,
              tenetur, vel dolor animi reiciendis iure, repudiandae cumque est dignissimos quo
              aspernatur totam magni et! Sed, amet!
              <div class="flex justify-end">
                <p class="font-bold mr-2">
                  <Tooltip content="Modifier">
                    <font-awesome-icon
                      class="iconadd cursor-pointer text-yellow-500"
                      :icon="['fas', 'pen']"
                  /></Tooltip>
                </p>
                <p class="font-bold mr-2">
                  <Tooltip content="Supprimer">
                    <font-awesome-icon
                      class="iconadd cursor-pointer text-red-500"
                      :icon="['fas', 'trash-can']"
                  /></Tooltip>
                </p>
              </div>
            </div>
          </di>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tooltip from '../components/Tooltip.vue'
import { useShow } from '@/stores/Show'

const show = useShow()

function showDeletePost() {
  show.showDeletePost = true
  
}
</script>

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
