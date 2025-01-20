<template>
  <div :class="theme.theme === 'light' ? 'body' : 'body !bg-gray-600 !text-white'">
    <h1 class="text-2xl font-bold flex items-center">
      <RectangleGroupIcon class="h-5 w-5 mr-2" />
      Emplois du temps
    </h1>
    <div
      :class="
        theme.theme === 'light'
          ? 'border-2 rounded-lg bg-white px-3 py-2 pb-4'
          : 'border-2 rounded-lg px-3 py-2 pb-4 !bg-gray-600 !text-gray-200 border-none'
      "
    >
      <h1 class="font-bold">Créer un emploi du temps :</h1>
      <div class="flex flex-wrap items-end mt-2">
        <div class="mr-2 w-40" v-if="au.listeAU.length !== 0">
          <label>Année universitaire:</label>
          <Listbox v-model="au.oneAUSelectEDT">
            <div class="relative text-xs">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ au.oneAUSelectEDT }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="(AU, index) in au.listeAU"
                    :key="AU.id"
                    :value="AU.annee_debut + '-' + AU.annee_fin"
                    as="div"
                    @click="
                      () => {
                        au.idAU = AU.id
                      }
                    "
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ AU.annee_debut }} - {{ AU.annee_fin }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="mr-2 w-40" v-if="parcour.ListAllParcours.length !== 0">
          <label>Parcours :</label>
          <Listbox v-model="parcour.nomByAll">
            <div class="relative text-xs">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs"
                  >{{ parcour.nomByAll }} / {{ parcour.abreviationbyAll }}</span
                >
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-for="(prc, index) in parcour.ListAllParcours"
                    :key="prc.id"
                    :value="prc.nom_parcours"
                    @click="setIdParcours(prc.id, prc.abr_parcours)"
                    as="template"
                  >
                    <li
                      :class="[
                        parcour.abreviationbyAll === prc.abr_parcours
                          ? 'bg-amber-100 text-amber-900 text-xs'
                          : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span
                        :class="[
                          parcour.abreviationbyAll === prc.abr_parcours
                            ? 'font-medium'
                            : 'font-normal',
                          'block truncate'
                        ]"
                      >
                        {{ prc.nom_parcours }} / {{ prc.abr_parcours }}
                      </span>
                      <span
                        v-if="parcour.abreviationbyAll === prc.abr_parcours"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="mr-2 w-40" v-if="semestre.ListeSemestreEDT.length !== 0">
          <label>Semestre :</label>
          <Listbox v-model="semestre.semestreNomEDT">
            <div class="relative text-xs">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ semestre.semestreNomEDT }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-for="(sm, index) in semestre.ListeSemestreEDT"
                    :key="sm.id"
                    :value="sm.nom_semestre"
                    as="div"
                    @click="
                      () => {
                        semestre.semestreIdEDT = sm.id
                      }
                    "
                  >
                    <li
                      :class="[
                        semestre.semestreNomEDT === sm.nom_semestre
                          ? 'bg-amber-100 text-amber-900 text-xs'
                          : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span
                        :class="[
                          semestre.semestreNomEDT === sm.nom_semestre
                            ? 'font-medium'
                            : 'font-normal',
                          'block truncate'
                        ]"
                      >
                        {{ sm.nom_semestre }}
                      </span>
                      <span
                        v-if="semestre.semestreNomEDT === sm.nom_semestre"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div class="flex flex-wrap items-end mt-2">
        <div v-if="edt.listJour.length !== 0" class="mr-2 w-60">
          <label>Jour :</label>
          <Listbox v-model="edt.jour">
            <div class="relative text-xs">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ edt.jour }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="EDT in edt.listJour"
                    :key="EDT.id"
                    :value="EDT.nom"
                    as="div"
                    @click="
                      () => {
                        edt.idjour = EDT.id
                      }
                    "
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ EDT.nom }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="mr-2 w-40">
          <label class="flex"
            >Heures :
            <p class="ml-2">
              <Tooltip content="Créer une nouvelle horaire">
                <font-awesome-icon
                  @click="isModalOpen = true"
                  :class="theme.theme === 'light' ? '' : 'text-white'"
                  class="text-gray-500 cursor-pointer"
                  :icon="['fas', 'calendar-plus']"
              /></Tooltip></p
          ></label>
          <Listbox v-if="edt.listHeures.length !== 0" v-model="edt.heures">
            <div class="relative text-xs">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ edt.heures }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="hr in edt.listHeures"
                    :key="hr.id"
                    :value="hr.valeur"
                    as="div"
                    @click="
                      () => {
                        edt.idheures = hr.id
                      }
                    "
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span
                        class="flex justify-between items-center"
                        :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                      >
                        {{ hr.valeur }}
                        <font-awesome-icon
                          class="text-red-500 cursor-pointer"
                          :icon="['fas', 'trash-can']"
                          @click="deleteHeures(hr.id)"
                        />
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="mr-2 w-40" v-if="salle.listSalle.length !== 0">
          <label>Salles :</label>
          <Listbox v-model="salle.NomSalle">
            <div class="relative text-xs">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ salle.NomSalle }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="sll in salle.listSalle"
                    :key="sll.id"
                    :value="sll.nom_salle"
                    as="div"
                    @click="
                      () => {
                        salle.idSalle = sll.id
                      }
                    "
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ sll.nom_salle }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="mr-2 w-60" v-if="enseignant.ListeENSEDT.length !== 0">
          <label>Enseignant :</label>
          <Listbox v-model="enseignant.nom_ensEDT">
            <div class="relative text-xs">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ enseignant.nom_ensEDT }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="ens in enseignant.ListeENSEDT"
                    :key="ens.id"
                    :value="ens.nomComplet_ens"
                    as="div"
                    @click="
                      () => {
                        enseignant.id_ensEDT = ens.id
                        ec.getAllECByEnsEDT(ens.id)
                      }
                    "
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ ens.nomComplet_ens }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div v-if="ec.ListeECByEnsEDT.length !== 0" class="mr-2 w-60">
          <label>Matière :</label>
          <Listbox v-model="ec.nomECEDT">
            <div class="relative text-xs">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ ec.nomECEDT }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                  class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="EC in ec.ListeECByEnsEDT"
                    :key="EC.id"
                    :value="EC.nom_ec"
                    as="div"
                    @click="
                      () => {
                        ec.idECDT = EC.id
                      }
                    "
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ EC.nom_ec }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <button
          :disabled="!ec.nomECEDT || !edt.heures"
          @click="addDays()"
          class="px-5 py-1.5 mt-2 bg-yellow-500 text-black font-bold text-xs rounded"
        >
          Ajouter
        </button>
      </div>
      <div class="mt-2 flex flex-wrap max-h-[75px] oerflow-y-auto">
        <div
          v-for="(list, index) in ListeEDT"
          :key="index"
          :class="theme.theme === 'light' ? '' : '!text-black'"
          class="mr-2 border text-xs w-60 items-center bg-gray-300 rounded-xl flex justify-between px-3 py-1"
        >
          <div>
            <p class="font-bold">{{ list.jour.nom }}</p>
            <p>{{ list.enseignant.nom }}</p>
            <p>{{ list.matiere.nom }}</p>
          </div>
          <div class="flex">
            <p class="mr-5">{{ list.heures.nom }}</p>
            <font-awesome-icon
              class="text-red-500 cursor-pointer"
              :icon="['fas', 'circle-xmark']"
              @click="removeList(index)"
            />
          </div>
        </div>
      </div>
      <div class="mt-2 flex justify-center">
        <button
          :disabled="ListeEDT.length === 0"
          @click="postEDT()"
          class="px-5 py-2 bg-blue-500 text-white rounded text-xs"
        >
          Enregister les informations
        </button>
      </div>
    </div>

    <div class="flex items-end mt-2">
      <p class="mr-2 font-bold"><font-awesome-icon :icon="['fas', 'sort']" /> Trier par :</p>
      <Listbox v-model="au.oneAUSelectFind" v-if="au.listeAU.length !== 0">
        <div class="relative text-xs w-40">
          <ListboxButton
            :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
            class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
          >
            <span class="block truncate text-xs">{{ au.oneAUSelectFind }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
              class="z-10 absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="(AU, index) in au.listeAU"
                :key="AU.id"
                :value="AU.annee_debut + '-' + AU.annee_fin"
                as="div"
                @click="
                  () => {
                    au.idAUEDT = AU.id
                  }
                "
              >
                <li
                  :class="[
                    active ? 'bg-amber-100 text-amber-900 text-xs' : '',
                    'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                  ]"
                >
                  <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                    {{ AU.annee_debut }} - {{ AU.annee_fin }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
    <div
      v-if="edt.listEDT.length !== 0"
      :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
      class="bg-white border mt-1 max-h-[25vh] oerflow-y-auto"
    >
      <div :key="EDT.id" v-for="EDT in edt.listEDT" class="list-none flex px-2 py-1 border">
        <li class="font-bold w-[30%]">{{ EDT.au.annee_debut }} - {{ EDT.au.annee_fin }}</li>
        <li class="w-[30%]">{{ EDT.parcour.abr_parcours }}</li>
        <li class="w-[30%]">{{ EDT.semestre.nom_semestre }}</li>
        <li class="w-[5%]">
          <Tooltip content="Visualiser">
            <font-awesome-icon
              @click="
                () => {
                  edt.oneEDT = transformData(EDT.edt)
                  edt.AUedt = `${EDT.au.annee_debut} - ${EDT.au.annee_fin}`
                  edt.parcoursEdt = EDT.parcour.abr_parcours
                  edt.SemestreEdt = EDT.semestre.nom_semestre
                  show.showEDT = true
                }
              "
              class="text-yellow-500 cursor-pointer"
              :icon="['fas', 'eye']"
            />
          </Tooltip>
        </li>
        <li class="w-[5%]">
          <Tooltip content="Supprimer">
            <font-awesome-icon
              @click="deleteEDT(EDT.id)"
              class="text-red-500 cursor-pointer"
              :icon="['fas', 'trash-can']"
            />
          </Tooltip>
        </li>
      </div>
    </div>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10"
    >
      <div
      
      :class="theme.theme === 'light' ? '' : '!bg-gray-600'"
      class="bg-white p-6 rounded-lg shadow-lg w-80">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-md font-bold">Créer un horaire</h2>
          <button @click="isModalOpen = false">
            <font-awesome-icon :icon="['fas', 'times']"
            :class="theme.theme === 'light' ? '' : '!text-red-500'"
             class="text-gray-500" />
          </button>
        </div>
        <div class="mb-4">
          <label class="block text-sm mb-1">Heure de début</label>
          <input
            type="time"
            v-model="heureDebut"
            :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
            class="text-black w-full border border-gray-300 rounded p-2 text-sm focus:outline-none"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm mb-1">Heure de fin</label>
          <input
            type="time"
            v-model="heureFin"
            :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
            class="text-black w-full border border-gray-300 rounded p-2 text-sm focus:outline-none"
            required
          />
        </div>
        <button
          @click="createHoraire"
          class="w-full bg-green-500 text-black font-bold text-sm py-2 rounded"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RectangleGroupIcon } from '@heroicons/vue/24/outline'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useAu } from '@/stores/Au'
import { useParcour } from '@/stores/Parcour'
import { ref, onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import 'tippy.js/dist/tippy.css'
import Tooltip from '../../components/Tooltip.vue'
import { useSemestre } from '@/stores/Semestre'
import { useEdt } from '@/stores/Edt'
import { useSalle } from '@/stores/Salle'
import { useEnseignant } from '@/stores/Enseignant'
import { useEc } from '@/stores/Ec'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'
import { useTheme } from '@/stores/Theme'

const enseignant = useEnseignant()
const edt = useEdt()
const theme = useTheme()
const salle = useSalle()
const au = useAu()
const ec = useEc()
const parcour = useParcour()
const semestre = useSemestre()
const URL = useUrl().url
const show = useShow()
const messages = useMessages()

const isModalOpen = ref(false)
const heureDebut = ref('')
const heureFin = ref('')
const ListeEDT = ref([])

onBeforeMount(() => {
  parcour.getAllParcours()
  edt.getAllJours()
  edt.getAllHeures()
  salle.getallSalle()
  enseignant.getAllENSEDT()
})

function transformData(rawData) {
  const order = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  const groupedByDay = {}

  rawData.forEach((item) => {
    const dayName = item.jour.nom
    const horaire = item.heure.valeur
    const seance = {
      horaire: horaire,
      matiere: `EC ${item.ec_id}`,
      enseignant: item.enseignant.nomComplet_ens,
      salle: item.salle.nom_salle
    }
    if (!groupedByDay[dayName]) {
      groupedByDay[dayName] = {}
    }
    if (!groupedByDay[dayName][horaire]) {
      groupedByDay[dayName][horaire] = seance
    }
  })
  return Object.keys(groupedByDay)
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((dayName) => ({
      jour: dayName,
      seances: Object.values(groupedByDay[dayName])
    }))
}

function deleteEDT(id) {
  edt.idEDT = id
  show.showDeletEDT = true
}

function setIdParcours(id, abr) {
  parcour.parcours_id = id
  parcour.abreviationbyAll = abr
}

function addDays() {
  let day = {
    jour: {
      nom: edt.jour,
      id: edt.idjour
    },
    heures: {
      nom: edt.heures,
      id: edt.idheures
    },
    salle: {
      nom: salle.NomSalle,
      id: salle.idSalle
    },
    enseignant: {
      nom: enseignant.nom_ensEDT,
      id: enseignant.id_ensEDT
    },
    matiere: {
      nom: ec.nomECEDT,
      id: ec.idECDT
    }
  }
  ListeEDT.value.push(day)
}

function removeList(index) {
  ListeEDT.value.splice(index, 1)
}

function createHoraire() {
  show.showSpinner = true
  const formData = {
    valeur: `${formatHeure(heureDebut.value)} - ${formatHeure(heureFin.value)}`
  }
  axios
    .post(`${URL}/api/heure`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      heureDebut.value = ''
      heureFin.value = ''
      edt.getAllHeures()
      messages.messageSucces = response.data.message
      isModalOpen.value = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      show.showSpinner = false
    })
    .catch((error) => {
      console.error(error)
      messages.messageError = error.response.data.message
      setTimeout(() => {
        messages.messageError = ''
      }, 3000)
      show.showSpinner = false
    })
}

function postEDT() {
  show.showSpinner = true
  const formData = {
    au_id: au.idAU,
    parcour_id: parcour.parcours_id,
    parcour_id: parcour.parcours_id,
    semestre_id: semestre.semestreIdEDT
  }
  axios
    .post(`${URL}/api/grpedt`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      messages.messageSucces = 'Emplois de temps créé !'
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
      let listValue = ListeEDT.value
      ListeEDT.value = []
      listValue.forEach((list) => {
        let formdata = {
          jour_id: list.jour.id,
          heure_id: list.heures.id,
          salle_id: list.salle.id,
          ec_id: list.matiere.id,
          enseignant_id: list.enseignant.id,
          groupedt_id: response.data.id
        }
        axios
          .post(`${URL}/api/edt`, formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            edt.getByIdAU()
            show.showSpinner = false
          })
          .catch((err) => {
            console.error(err)
            show.showSpinner = false
          })
      })
    })
    .catch((error) => {
      console.error(error)
      show.showSpinner = false
    })
}

function deleteHeures(id) {
  axios
    .delete(`${URL}/api/heure/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      edt.getAllHeures()
    })
    .catch((error) => {
      console.error(error)
    })
}

function formatHeure(heure) {
  return heure.replace(':', 'h')
}
</script>

<style scoped></style>
