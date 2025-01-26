<template>
  <div
    :class="
      theme.theme === 'light'
        ? 'list p-2 overflow-y-auto'
        : 'list p-2 overflow-y-auto !bg-gray-600 !text-white'
    "
  >
    <h1 class="titre"><FireIcon class="h-7 w-7 mr-2" /> Résultats finaux</h1>
    <div class="flex">
      <div :class="theme.theme === 'light' ? '' : '!bg-gray-600'" class="chooseSemestre w-[50%]">
        <h1 class="create pl-5 mt-2" v-if="parcour.abreviationbyEns">Sélectionnez un semestre :</h1>
        <div v-if="parcour.abreviationbyEns" class="class formInput border-gray-900/10 pb-5 pl-5">
          <div class="sm:col-span-3 mt-2 ctgr mr-4">
            <label class="block text-sm font-medium leading-6">Parcours</label>
            <div class="w-52 mt-1">
              <Listbox v-model="parcour.abreviationbyEns">
                <div class="relative">
                  <ListboxButton
                    :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                    class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span class="block truncate">{{ parcour.abreviationbyEns }}</span>
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
                      :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                      class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        :key="index"
                        v-for="(prc, index) in parcour.ListParcoursByEns"
                        :value="prc.abr_parcours"
                        @click="setIdParcours(prc.id, prc.nom_parcours)"
                      >
                        <li
                          :class="[
                            parcour.abreviationbyEns === prc.abr_parcours
                              ? 'bg-amber-100 text-amber-900 '
                              : '',
                            'relative cursor-default select-none py-2 pl-10 pr-4'
                          ]"
                        >
                          <span
                            :class="[
                              parcour.abreviationbyEns === prc.abr_parcours
                                ? 'font-medium'
                                : 'font-normal',
                              'block truncate'
                            ]"
                            >{{ prc.abr_parcours }}</span
                          >
                          <span
                            v-if="parcour.abreviationbyEns === prc.abr_parcours"
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
            <label class="block text-sm font-medium leading-6">Semestre</label>
            <div class="w-52 mt-1">
              <Listbox v-model="semestre.semestreNom">
                <div class="relative">
                  <ListboxButton
                    :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                    class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
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
                      :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                      class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    >
                      <ListboxOption
                        :key="index"
                        v-for="(sm, index) in semestre.ListeSemestre"
                        :value="sm.nom_semestre"
                      >
                        <li
                          :class="[
                            semestre.semestreNom === sm.nom_semestre
                              ? 'bg-amber-100 text-amber-900'
                              : '',
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
        </div>
      </div>
      <div class="flex flex-col justify-center w-[50%]">
        <div class="create px-5 mt-2 text-blue-500 flex justify-between items-center">
          <div class="flex gap-2">
            Admis :
            <p :class="theme.theme === 'light' ? '' : 'text-white'" class="text-black">
              {{ countAdmis }} étudiant(s)
            </p>
          </div>
          <button
            v-if="countAdmis !== 0"
            @click="AdmisList"
            :class="theme.theme === 'light' ? '' : 'text-white'"
            class="font-light text-black hover:bg-blue-200 py-1 px-3 text-sm hover:text-blue-900 rounded"
          >
            <font-awesome-icon :icon="['fas', 'file-pdf']" class="text-blue-600" />
            Générer une liste
          </button>
        </div>
        <div class="create px-5 mt-2 text-yellow-500 flex justify-between items-center">
          <div class="flex gap-2">
            Autorisé à redoubler :
            <p :class="theme.theme === 'light' ? '' : 'text-white'" class="text-black">
              {{ countRedouble }} étudiant(s)
            </p>
          </div>
          <button
            v-if="countRedouble !== 0"
            @click="RedoubleList"
            :class="theme.theme === 'light' ? '' : 'text-white'"
            class="font-light text-black hover:bg-blue-200 py-1 px-3 text-sm hover:text-blue-900 rounded"
          >
            <font-awesome-icon :icon="['fas', 'file-pdf']" class="text-blue-600" />
            Générer une liste
          </button>
        </div>
        <div class="create px-5 mt-2 text-red-500 flex justify-between items-center">
          <div class="flex gap-2">
            Eliminé :
            <p :class="theme.theme === 'light' ? '' : 'text-white'" class="text-black">
              {{ countElimine }} étudiant(s)
            </p>
          </div>
          <button
            v-if="countElimine !== 0"
            @click="ElimineList"
            :class="theme.theme === 'light' ? '' : 'text-white'"
            class="font-light text-black hover:bg-blue-200 py-1 hover:text-blue-900 text-sm px-3 rounded"
          >
            <font-awesome-icon :icon="['fas', 'file-pdf']" class="text-blue-600" />
            Générer une liste
          </button>
        </div>
      </div>
    </div>
    <h1 class="text-sm py-1">Choisissez un parcours pour le prochain AU :</h1>
    <div
      :class="theme.theme === 'light' ? '' : '!bg-gray-600 border-none'"
      class="bg-white border-2 rounded-lg flex items-center justify-between p-2"
    >
      <div class="flex flex-col gap-2">
        <div class="flex gap-2 items-center">
          <Listbox v-model="au.nomAUDelib" v-if="au.listeAUDelib.length !== 0">
            <div class="relative text-xs w-40">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ au.nomAUDelib }}</span>
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
                    v-for="(AU, index) in au.listeAUDelib"
                    :key="AU.id"
                    :value="AU.annee_debut + '-' + AU.annee_fin"
                    as="div"
                    @click="
                      () => {
                        au.idAUDelib = AU.id
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
          <Listbox v-model="niveau.nom_niveauDelib" v-if="niveau.ListNiveauDelib.length !== 0">
            <div class="relative text-xs w-40">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ niveau.nom_niveauDelib }}</span>
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
                    v-for="(nv, index) in niveau.ListNiveauDelib"
                    :key="nv.id"
                    :value="nv.nom_niveau"
                    as="div"
                    @click="
                      () => {
                        niveau.idniveauDelib = nv.id
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
                        {{ nv.nom_niveau }}
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
          <Listbox
            v-model="parcour.abr_parcoursDelib"
            v-if="parcour.ListParcoursDelib.length !== 0"
          >
            <div class="relative text-xs w-40">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ parcour.abr_parcoursDelib }}</span>
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
                    v-for="(prc, index) in parcour.ListParcoursDelib"
                    :key="prc.id"
                    :value="prc.abr_parcours"
                    as="div"
                    @click="
                      () => {
                        parcour.parcours_idDelib = prc.id
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
                        {{ prc.abr_parcours }}
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
          <Listbox
            v-model="semestre.semestreNomDelib"
            v-if="semestre.ListeSemestreDelib.length !== 0"
          >
            <div class="relative text-xs w-40">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ semestre.semestreNomDelib }}</span>
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
                    v-for="(smtr, index) in semestre.ListeSemestreDelib"
                    :key="smtr.id"
                    :value="smtr.nom_semestre"
                    as="div"
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ smtr.nom_semestre }}
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
          <div class="text-blue-500 font-bold">[Admis]</div>
        </div>
        <div class="flex gap-2 items-center">
          <Listbox v-model="au.nomAUDelibRed" v-if="au.listeAUDelibRed.length !== 0">
            <div class="relative text-xs w-40">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ au.nomAUDelibRed }}</span>
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
                    v-for="(AU, index) in au.listeAUDelibRed"
                    :key="AU.id"
                    :value="AU.annee_debut + '-' + AU.annee_fin"
                    as="div"
                    @click="
                      () => {
                        au.idAUDelibRed = AU.id
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
          <Listbox
            v-model="niveau.nom_niveauDelibRed"
            v-if="niveau.ListNiveauDelibRed.length !== 0"
          >
            <div class="relative text-xs w-40">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ niveau.nom_niveauDelibRed }}</span>
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
                    v-for="(nv, index) in niveau.ListNiveauDelibRed"
                    :key="nv.id"
                    :value="nv.nom_niveau"
                    as="div"
                    @click="
                      () => {
                        niveau.idniveauDelibRed = nv.id
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
                        {{ nv.nom_niveau }}
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
          <Listbox
            v-model="parcour.abr_parcoursDelibRed"
            v-if="parcour.ListParcoursDelibRed.length !== 0"
          >
            <div class="relative text-xs w-40">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ parcour.abr_parcoursDelibRed }}</span>
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
                    v-for="(prc, index) in parcour.ListParcoursDelibRed"
                    :key="prc.id"
                    :value="prc.abr_parcours"
                    as="div"
                    @click="
                      () => {
                        parcour.parcours_idDelibRed = prc.id
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
                        {{ prc.abr_parcours }}
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
          <Listbox
            v-model="semestre.semestreNomDelibRed"
            v-if="semestre.ListeSemestreDelibRed.length !== 0"
          >
            <div class="relative text-xs w-40">
              <ListboxButton
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="text-black relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-xs">{{ semestre.semestreNomDelibRed }}</span>
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
                    v-for="(smtr, index) in semestre.ListeSemestreDelibRed"
                    :key="smtr.id"
                    :value="smtr.nom_semestre"
                    as="div"
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900 text-xs' : '',
                        'relative cursor-default select-none py-2 pl-10 pr-4 text-xs'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ smtr.nom_semestre }}
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
          <div class="text-yellow-500 font-bold">[Redoublement]</div>
        </div>
      </div>
      <button
        v-if="
          semestre.semestreIdDelib.length !== 0 &&
          semestre.semestreIdDelibRed.length !== 0 &&
          (countAdmis !== 0 || countRedouble !== 0)
        "
        @click="delibaration()"
        class="bg-blue-500 text-white rounded px-4 py-1.5"
      >
        Valider la déliberation
      </button>
    </div>
    <div
      :class="theme.theme === 'light' ? 'listEtud' : 'listEtud !bg-gray-600 !text-white'"
      v-if="niveau.ListNiveau.length !== 0"
    >
      <div class="header gap-2">
        <input
          placeholder="🔎 Recherche par nom"
          @input="etudiant.searchDefinitive(etudiant.searchalueDef)"
          v-model="etudiant.searchalueDef"
          :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
          type="search"
          class="pl-3 pr-3 ml-5 mt-3 block rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
        />
        <input
          type="number"
          v-model="noteElim"
          :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
          class="w-20 pl-3 pr-1 mt-3 block text-center rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
        />
        <p class="text-xs font-bold">( Note éliminatoire )</p>
      </div>
      <div class="listEtudValue">
        <div class="head">
          <li class="widthnom">Nom complet</li>
          <li class="widthemail">Observation</li>
          <li class="widthemails text-center">Moyenne générale /20</li>
        </div>
        <div :key="index" v-for="(etd, index) in etudiant.listdefinitive">
          <div :class="theme.theme === 'light' ? 'body' : 'body !text-gray-200'" class="body">
            <li class="widthvaluenom">{{ etd.nomComplet_etud }}</li>
            <li class="widthvalueemail">
              <p
                v-if="etd.moyenne_generale >= 10 && etd.worstNote >= noteElim"
                class="text-green-500"
              >
                Admis
              </p>
              <p v-if="etd.moyenne_generale >= 10 && etd.worstNote < noteElim" class="text-red-500">
                Éliminé
              </p>
              <p v-if="etd.moyenne_generale < 10 && etd.worstNote < noteElim" class="text-red-500">
                Éliminé
              </p>
              <p
                v-if="
                  etd.moyenne_generale < 10 && etd.worstNote >= noteElim && etd.status_etud === 0
                "
                class="text-red-500"
              >
                Éliminé
              </p>
              <p
                v-if="
                  etd.moyenne_generale < 10 && etd.worstNote >= noteElim && etd.status_etud === 1
                "
                class="text-yellow-500"
              >
                Autorisé à redoubler
              </p>
            </li>
            <li class="widthvalueemails">
              <p class="text-center w-full">{{ etd.moyenne_generale }}</p>
            </li>
          </div>
        </div>
        <div class="Empty" v-if="etudiant.listdefinitive.length === 0">
          <div class="gif"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useParcour } from '@/stores/Parcour'
import { useSemestre } from '@/stores/Semestre'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useNiveau } from '@/stores/Niveau'
import { useEtudiant } from '@/stores/Etudiant'
import { FireIcon } from '@heroicons/vue/24/outline'
import { onBeforeMount, ref, computed } from 'vue'
import { useDirecteur } from '@/stores/Directeur'
import { useAu } from '@/stores/Au'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useTheme } from '@/stores/Theme'

const niveau = useNiveau()
const semestre = useSemestre()
const parcour = useParcour()
const etudiant = useEtudiant()
const au = useAu()
const noteElim = ref(5)
const listeAdmins = ref([])
const listeRed = ref([])
const directeur = useDirecteur()
const theme = useTheme()
const URL = useUrl().url

function setIdParcours(id, name) {
  parcour.parcours_id = id
  parcour.nomByEns = name
}

function delibaration() {
  listeAdmins.value = etudiant.listdefinitive.filter(
    (etd) => etd.moyenne_generale >= 10 && etd.worstNote >= noteElim.value
  )

  listeRed.value = etudiant.listdefinitive.filter(
    (etd) => etd.moyenne_generale < 10 && etd.worstNote >= noteElim.value && etd.status_etud === 1
  )
  delibAdmis()
  delibRed()
}

function delibAdmis() {
  listeAdmins.value.forEach((etd) => {
    fetch(
      etd.user_id,
      etd.user.email,
      etd.nomComplet_etud,
      semestre.semestreIdDelib,
      1,
      au.idAUDelib
    )
  })
}

function delibRed() {
  listeRed.value.forEach((etd) => {
    fetch(
      etd.user_id,
      etd.user.email,
      etd.nomComplet_etud,
      semestre.semestreIdDelibRed,
      0,
      au.idAUDelibRed
    )
  })
}

function fetch(user_id, email, nomComplet_etud, Semestre, status, idAU) {
  let formData = {
    password: '',
    validiter_compte: 'false'
  }
  axios
    .put(`${URL}/api/user/setup/${user_id}`, formData)
    .then((response) => {
      let formdata = {
        email: email,
        status_user: 'Etudiant',
        validiter_compte: false
      }
      axios
        .post(`${URL}/api/user/createEtudiant`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((responseUser) => {
          let formDataEtudiant = {
            user_id: responseUser.data.id,
            nomComplet_etud: nomComplet_etud,
            validiter_inscri: false,
            status_etud: status,
            au_id: idAU
          }
          axios
            .post(`${URL}/api/etudiant`, formDataEtudiant, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((responseEtd) => {
              let formDataToSemestre = {
                etudiant_id: responseEtd.data.id,
                semestre_ids: Semestre
              }
              axios
                .post(`${URL}/api/semestres/addEtudiant`, formDataToSemestre, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then((response) => {})
                .catch((err) => {
                  console.error(err)
                })
            })
            .catch((err) => {
              console.error(err)
            })
        })
        .catch((err) => {
          console.error(err)
        })
    })
    .catch((err) => {
      console.error(err)
    })
}

function AdmisList() {
  etudiant.statusDeliberation = 'ADMIS'
  etudiant.listDeliberation = etudiant.listdefinitive.filter(
    (etd) => etd.moyenne_generale >= 10 && etd.worstNote >= noteElim.value
  )
  directeur.isListeEtudDelib = true
  directeur.getFirst()
}

function RedoubleList() {
  etudiant.statusDeliberation = 'AUTORISER A REDOUBLER'
  etudiant.listDeliberation = etudiant.listdefinitive.filter(
    (etd) => etd.moyenne_generale < 10 && etd.worstNote >= noteElim.value
  )
}

function ElimineList() {
  etudiant.statusDeliberation = 'ELIMINE'
  etudiant.listDeliberation = etudiant.listdefinitive.filter(
    (etd) => etd.moyenne_generale < 10 || etd.worstNote < noteElim.value
  )
}

const countAdmis = computed(() => {
  return etudiant.listdefinitive.filter(
    (etd) => etd.moyenne_generale >= 10 && etd.worstNote >= noteElim.value
  ).length
})

const countRedouble = computed(() => {
  return etudiant.listdefinitive.filter(
    (etd) => etd.moyenne_generale < 10 && etd.worstNote >= noteElim.value && etd.status_etud === 1
  ).length
})

const countElimine = computed(() => {
  return etudiant.listdefinitive.filter(
    (etd) => etd.moyenne_generale < 10 && etd.worstNote < noteElim.value
  ).length
})

onBeforeMount(() => {
  etudiant.listdefinitive = []
  parcour.getParcoursByIdEns(au.idAU)
})

function getOneEtudiant(id) {
  etudiant.isshowNotes = true
  etudiant.id_etud = id
  etudiant.getEtudiantById()
}
</script>

<style scoped src="../../styles/ListeEtudiant.css"></style>
