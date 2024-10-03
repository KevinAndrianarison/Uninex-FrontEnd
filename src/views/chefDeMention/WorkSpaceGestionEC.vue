<template>
  <div class="listeParcourContent px-2 sm:px-0">
    <TabGroup>
      <TabList class="onglet flex space-x-1 rounded-sm bg-green-500/20 p-1">
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'w-full rounded-sm py-2.5 text-sm font-bold leading-5',
              'ring-white/60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white text-black shadow'
                : 'text-black hover:bg-white/[0.12] hover:text-black'
            ]"
            class="square"
          >
            <font-awesome-icon class="h-5 w-5 mr-2" :icon="['fas', 'square-plus']" /> Création d'un
            EC
          </button>
        </Tab>
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'w-full rounded-sm py-2.5 text-sm font-bold leading-5',
              'ring-white/60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white text-black shadow'
                : 'text-black hover:bg-white/[0.12] hover:text-black'
            ]"
            class="square"
          >
            <font-awesome-icon class="h-5 w-5 mr-2" :icon="['fas', 'circle-check']" /> Responsable
            d'un EC
          </button>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel :class="['rounded-sm']">
          <div>
            <div class="chooseSemestreEC" v-if="mention.nom_mention">
              <h1 class="create pl-5 mt-2">Sélectionnez un UE :</h1>
              <div class="class formInput border-gray-900/10 pb-5 pl-5">
                <div class="sm:col-span-3 mt-2 ctgr mr-4">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Mentions</label>
                  <div class="w-52 mt-1">
                    <Listbox v-model="mention.nom_mention">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate"
                            >{{ mention.nom_mention }} / {{ mention.abreviation }}</span
                          >
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(mnt, index) in mention.ListMentionByEns"
                              :value="mnt.nom_mention"
                              @click="setIdmention(mnt.id, mnt.abr_mention)"
                            >
                              <li
                                :class="[
                                  mention.abreviation === mnt.abr_mention
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    mention.abreviation === mnt.abr_mention
                                      ? 'font-medium'
                                      : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ mnt.nom_mention }} / {{ mnt.abr_mention }}</span
                                >
                                <span
                                  v-if="mention.abreviation === mnt.abr_mention"
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
                <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="parcour.nom">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Parcours</label>
                  <div class="w-52 mt-1">
                    <Listbox v-model="parcour.nom">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate"
                            >{{ parcour.nom }} / {{ parcour.abreviation }}</span
                          >
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(prc, index) in parcour.ListParcoursByMention"
                              :value="prc.nom_parcours"
                              @click="setIdParcours(prc.id, prc.abr_parcours)"
                            >
                              <li
                                :class="[
                                  parcour.abreviation === prc.abr_parcours
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    parcour.abreviation === prc.abr_parcours
                                      ? 'font-medium'
                                      : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ prc.nom_parcours }} / {{ prc.abr_parcours }}</span
                                >
                                <span
                                  v-if="parcour.abreviation === prc.abr_parcours"
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
                <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="semestre.semestreNom">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Semestre</label>
                  <div class="w-52 mt-1">
                    <Listbox v-model="semestre.semestreNom">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate">{{ semestre.semestreNom }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(sm, index) in semestre.ListeSemestre"
                              :value="sm.nom_semestre"
                              @click="setSemestreId(sm.id, sm.nom_semestre)"
                            >
                              <li
                                :class="[
                                  semestre.semestreNom === sm.nom_semestre
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    semestre.semestreNom === sm.nom_semestre
                                      ? 'font-medium'
                                      : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ sm.nom_semestre }}</span
                                >
                                <span
                                  v-if="semestre.semestreNom === sm.nom_semestre"
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

                <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="ue.nomUE">
                  <label class="block text-sm font-medium leading-6 text-gray-900"
                    >Unités d'enseignement</label
                  >
                  <div class="w-52 mt-1">
                    <Listbox v-model="ue.nomUE">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate">{{ ue.nomUE }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(UE, index) in ue.ListeueBysemestre"
                              :value="UE.nom_ue"
                              @click="setUEId(UE.id)"
                            >
                              <li
                                :class="[
                                  ue.nomUE === UE.nom_ue
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    ue.nomUE === UE.nom_ue ? 'font-medium' : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ UE.nom_ue }}</span
                                >
                                <span
                                  v-if="ue.nomUE === UE.nom_ue"
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
                <div class="w-52 sm:col-span-3 mr-4 mt-1" v-if="ue.nomUE">
                  <label class="block text-sm font-medium leading-6 text-gray-900"
                    >Nom de l'EC</label
                  >
                  <div class="mt-2 relative">
                    <input
                      type="text"
                      v-model="ec.nom_ec"
                      class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-3 pl-3 flex items-center text-gray-600"
                    ></button>
                  </div>
                </div>
                <div class="w-52 sm:col-span-3 mr-4 mt-1" v-if="ue.nomUE">
                  <label class="block text-sm font-medium leading-6 text-gray-900"
                    >Volume horaire (ET)</label
                  >
                  <div class="mt-2 relative">
                    <input
                      type="number"
                      v-model="ec.volume_et"
                      @input="limitvolumeHLength"
                      class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-3 pl-3 flex items-center text-gray-600"
                    ></button>
                  </div>
                </div>
                <div class="w-52 sm:col-span-3 mr-4 mt-1" v-if="ue.nomUE">
                  <label class="block text-sm font-medium leading-6 text-gray-900"
                    >Volume horaire (ED)</label
                  >
                  <div class="mt-2 relative">
                    <input
                      type="number"
                      v-model="ec.volume_ed"
                      @input="limitvolumeHLength"
                      class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-3 pl-3 flex items-center text-gray-600"
                    ></button>
                  </div>
                </div>
                <div class="w-52 sm:col-span-3 mr-4 mt-1" v-if="ue.nomUE">
                  <label class="block text-sm font-medium leading-6 text-gray-900"
                    >Volume horaire (TP)</label
                  >
                  <div class="mt-2 relative">
                    <input
                      type="number"
                      v-model="ec.volume_tp"
                      @input="limitvolumeHLength"
                      class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-3 pl-3 flex items-center text-gray-600"
                    ></button>
                  </div>
                </div>
                <div class="divbtn sm:col-span-3 mt-2" v-if="ue.nomUE">
                  <Button class="btn font-bold" @click="ec.createEC()"> Valider</Button>
                </div>
              </div>
            </div>
            <div class="listEC">
              <div class="header">
                <h1 class="create pl-5 mt-4">Liste des EC de cette unité d'enseignement :</h1>
              </div>
              <div class="listEtudValue">
                <div class="head">
                  <li class="widtUE">Nom de l'EC</li>
                  <li class="widthcredit">Volume ET</li>
                  <li class="widthcredit">Volume ED</li>
                  <li class="widthcredit">Volume TP</li>
                  <li class="widthUEnom"></li>
                </div>
                <div :key="index" v-for="(EC, index) in ec.ListeEC">
                  <div class="body">
                    <li class="widthvalueUE">{{ EC.nom_ec }}</li>
                    <li class="widthvaluecredit">{{ EC.volume_et }}</li>
                    <li class="widthvaluecredit">{{ EC.volume_ed }}</li>
                    <li class="widthvaluecredit">{{ EC.volume_tp }}</li>

                    <li class="widthvalueTrash">
                      <TrashIcon class="delete h-5 w-5" @click="deleteEC(EC.nom_ec, EC.id)" />
                    </li>
                  </div>
                </div>
                <div class="Empty" v-if="ec.ListeEC.length === 0">
                  <div class="gif"></div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>


        <TabPanel :class="['rounded-sm']">
          <div>
            <div class="chooseSemestreEC" v-if="mention.nom_mention">
              <h1 class="create pl-5 mt-2">Sélectionnez un EC et un enseignant :</h1>
              <div class="class formInput border-gray-900/10 pb-5 pl-5">
                <div class="sm:col-span-3 mt-2 ctgr mr-4">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Mentions</label>
                  <div class="w-52 mt-1">
                    <Listbox v-model="mention.nom_mention">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate"
                            >{{ mention.nom_mention }} / {{ mention.abreviation }}</span
                          >
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(mnt, index) in mention.ListMentionByEns"
                              :value="mnt.nom_mention"
                              @click="setIdmention(mnt.id, mnt.abr_mention)"
                            >
                              <li
                                :class="[
                                  mention.abreviation === mnt.abr_mention
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    mention.abreviation === mnt.abr_mention
                                      ? 'font-medium'
                                      : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ mnt.nom_mention }} / {{ mnt.abr_mention }}</span
                                >
                                <span
                                  v-if="mention.abreviation === mnt.abr_mention"
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
                <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="parcour.nom">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Parcours</label>
                  <div class="w-52 mt-1">
                    <Listbox v-model="parcour.nom">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate"
                            >{{ parcour.nom }} / {{ parcour.abreviation }}</span
                          >
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(prc, index) in parcour.ListParcoursByMention"
                              :value="prc.nom_parcours"
                              @click="setIdParcours(prc.id, prc.abr_parcours)"
                            >
                              <li
                                :class="[
                                  parcour.abreviation === prc.abr_parcours
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    parcour.abreviation === prc.abr_parcours
                                      ? 'font-medium'
                                      : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ prc.nom_parcours }} / {{ prc.abr_parcours }}</span
                                >
                                <span
                                  v-if="parcour.abreviation === prc.abr_parcours"
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
                <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="semestre.semestreNom">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Semestre</label>
                  <div class="w-52 mt-1">
                    <Listbox v-model="semestre.semestreNom">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate">{{ semestre.semestreNom }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(sm, index) in semestre.ListeSemestre"
                              :value="sm.nom_semestre"
                              @click="setSemestreId(sm.id, sm.nom_semestre)"
                            >
                              <li
                                :class="[
                                  semestre.semestreNom === sm.nom_semestre
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    semestre.semestreNom === sm.nom_semestre
                                      ? 'font-medium'
                                      : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ sm.nom_semestre }}</span
                                >
                                <span
                                  v-if="semestre.semestreNom === sm.nom_semestre"
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

                <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="ue.nomUE">
                  <label class="block text-sm font-medium leading-6 text-gray-900"
                    >Unités d'enseignement</label
                  >
                  <div class="w-52 mt-1">
                    <Listbox v-model="ue.nomUE">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate">{{ ue.nomUE }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(UE, index) in ue.ListeueBysemestre"
                              :value="UE.nom_ue"
                              @click="setUEId(UE.id)"
                            >
                              <li
                                :class="[
                                  ue.nomUE === UE.nom_ue
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    ue.nomUE === UE.nom_ue ? 'font-medium' : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ UE.nom_ue }}</span
                                >
                                <span
                                  v-if="ue.nomUE === UE.nom_ue"
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
                <div class="sm:col-span-3 mt-2 ctgr mr-4" v-if="ec.ecNom">
                  <label class="block text-sm font-medium leading-6 text-gray-900"
                    >Eléments constitutifs</label
                  >
                  <div class="w-52 mt-1">
                    <Listbox v-model="ec.ecNom">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate">{{ ec.ecNom }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(EC, index) in ec.ListeEC"
                              :value="EC.nom_ec"
                              @click="setECId(EC.id)"
                            >
                              <li
                                :class="[
                                  ec.ecNom === EC.nom_ec
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    ec.ecNom === EC.nom_ec ? 'font-medium' : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ EC.nom_ec }}</span
                                >
                                <span
                                  v-if="ec.ecNom === EC.nom_ec"
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
                <div class="sm:col-span-3 mt-2">
                  <label class="block text-sm font-medium leading-6 text-gray-900"
                    >Choisissez un enseignant :</label
                  >
                  <div class="w-52 mt-1 ctgr mr-4">
                    <Listbox v-model="enseignant.name">
                      <div class="relative">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate">{{ enseignant.name }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              :key="index"
                              v-for="(ens, index) in enseignant.ListeENS"
                              :value="ens.nomComplet_ens"
                              @click="setEnseignantBottom(ens.id)"
                            >
                              <li
                                :class="[
                                  enseignant.name === ens.nomComplet_ens
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4'
                                ]"
                              >
                                <span
                                  :class="[
                                    enseignant.name === ens.nomComplet_ens
                                      ? 'font-medium'
                                      : 'font-normal',
                                    'block truncate'
                                  ]"
                                  >{{ ens.nomComplet_ens }}</span
                                >
                                <span
                                  v-if="enseignant.name === ens.nomComplet_ens"
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
                <div class="divbtn sm:col-span-3 mt-2" v-if="enseignant.name && ec.ecNom">
                  <Button class="btn font-bold" @click="ec.addRespEC()"> Valider</Button>
                </div>
              </div>
            </div>
            <div class="listEC">
              <div class="header">
                <h1 class="create pl-5 mt-4">Liste des responsables des EC :</h1>
              </div>
              <div class="listEtudValue">
                <div class="head">
                  <li class="widtUE">Nom de l'EC</li>
                  <li class="widthvalueRESP RESP">Responsable</li>
                  <li class="widthUEnom text-center">Dissocier</li>
                </div>
                <div :key="index" v-for="(EC, index) in ec.ListeEC">
                  <div class="body">
                    <li class="widthvalueUE">{{ EC.nom_ec }}</li>
                    <li class="widthvalueRESP" v-if="EC.enseignant !== null">
                      {{ EC.enseignant.nomComplet_ens }}
                    </li>
                    <li class="widthvalueTrash">
                      <font-awesome-icon
                        @click="ec.dissoscierResp(EC.id, EC.enseignant_id)"
                        class="delete h-5 w-5"
                        :icon="['fas', 'user-slash']"
                      />
                    </li>
                  </div>
                </div>
                <div class="Empty" v-if="ec.ListeEC.length === 0">
                  <div class="gif"></div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useParcour } from '@/stores/Parcour'
import { useSemestre } from '@/stores/Semestre'
import { useUe } from '@/stores/Ue'
import { useEc } from '@/stores/Ec'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useShow } from '@/stores/Show'
import { useMention } from '@/stores/Mention'
import { useEnseignant } from '@/stores/Enseignant'
import { onBeforeMount } from 'vue'

const semestre = useSemestre()
const ue = useUe()
const ec = useEc()
const parcour = useParcour()
const show = useShow()
const mention = useMention()
const enseignant = useEnseignant()

function deleteEC(nom, id) {
  ec.nomEC = nom
  ec.id = id
  show.showDeletEC = true
}

function setIdParcours(id, abr) {
  parcour.parcours_id = id
  parcour.abreviation = abr
}

function setIdmention(id, abr) {
  mention.mention_id = id
  mention.abreviation = abr
}

function setSemestreId(id, nom) {
  semestre.semestreNom = nom
  semestre.semestreId = id
}

function setECId(id) {
  ec.id = id
}

function limitvolumeHLength(event) {
  const value = event.target.value
  if (value.length > 3) {
    event.target.value = value.slice(0, 3)
    ue.credit_ue = event.target.value
  }
}

function setEnseignantBottom(id) {
  enseignant.idBottom = id
}

onBeforeMount(() => {
  enseignant.getAllENS()
})

function setUEId(id) {
  ue.id = id
}
</script>

<style scoped src="../../styles/Ue.css"></style>
