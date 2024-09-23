<template>
  <div class="container">
    <div class="logo">
      <img src="https://i.pinimg.com/originals/44/ae/09/44ae092a4e174756de8d950236b6e7e6.png" class="img-logo">
    </div>
    <div class="container-search">
      <div class="input-group">
        <input type="text" v-model="searchChar" class="form-control search" 
        placeholder="Search character" aria-label="Username" aria-describedby="basic-addon1">
      </div>
    </div>
    <div v-if="dbzSearch && searchChar != ''" class="main-content">
      <li v-for="itemdbz in dbzSearch" :key="itemdbz.name" class="item">
        <dbzCard :name="itemdbz.name" :idChar="itemdbz.id" :race="itemdbz.race" :image="itemdbz.image" />
      </li>
    </div>
    <div v-else>
      <ul class="main-content">
        <li v-for="item in dbzs.items" :key="item.name" class="item">
          <dbzCard :name="item.name" :idChar="item.id" :race="item.race" :image="item.image" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import dbzCard from './dbzCard.vue';
import axios from 'axios';

const dbzs = ref([]);
const searchChar = ref('');
const dbzSearch = ref();

const getDbzs = async () => {
  try {
    const result = await fetch('https://dragonball-api.com/api/characters');
    dbzs.value = await result.json();
  }
  catch (error) {
    console.error('no hay data'.error);
    dbzSearch.value = [];

  }

}

watch(searchChar, async (newValue) => {
  try {
    const response = await axios.get(`https://dragonball-api.com/api/characters?name=${newValue}`)
    if (response.data && response.data.length > 0) {
      dbzSearch.value = response.data;
    } else {
      dbzSearch.value = [];
    }
    console.log(dbzSearch.value);
  }
  catch (error) {
    console.error('no hay data'.error);
  }
})


onMounted(() => {
  getDbzs();
});

</script>

<style>
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.container-search {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 10vh;
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;
}


.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-logo {
  width: auto;
  height: 300px;
}

/* Estilo de la lista principal */
.main-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 3 columnas */
  gap: 20px;
  /* Espacio entre elementos */
  padding: 10px;
  width: 100%;
}

/* Cada ítem de la lista */
.item {
  list-style-type: none;
}

@media (max-width: 900px) {
  .main-content {
    grid-template-columns: repeat(2, 2fr);
    /* 2 columnas en pantallas medianas */
  }
}

@media (max-width: 480px) {
  .main-content {
    grid-template-columns: repeat(1fr);
    /* 2 columnas en pantallas medianas */
  }
}
</style>