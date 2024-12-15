<template>
  <div class="container">
    <div class="logo">
      <img src="https://i.pinimg.com/originals/44/ae/09/44ae092a4e174756de8d950236b6e7e6.png" class="img-logo">
    </div>
    <div class="container-search">
      <div class="input-group">
        <input type="text" v-model="searchChar" class="form-control search" placeholder="Search character"
          aria-label="Username" aria-describedby="basic-addon1">
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
      <div class="pagination">
        <button @click="loadPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
        <span>{{ currentPage }}</span>
        <button @click="loadPage(currentPage + 1)">Next</button>
      </div>
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
const currentPage = ref(1);


const getDbzs = async (page = 1) => {
  try {
    const result = await axios.get(`https://dragonball-api.com/api/characters?page=${page}`);
    dbzs.value = result.data;
  }
  catch (error) {
    console.error('Error fetching characters:', error);
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


const loadPage = (page) => {
  if (page > 0) {
    currentPage.value = page;
    getDbzs(page);
  }
};

onMounted(() => {
  getDbzs(currentPage.value);
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


.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #ff5722;
  /* Color llamativo, similar a un estilo vibrante */
  color: white;
  border: none;
  border-radius: 30px;
  /* Bordes redondeados */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.pagination button:hover {
  background-color: #e64a19;
  /* Color más oscuro al pasar el ratón */
  transform: scale(1.1);
  /* Efecto de agrandamiento */
}

.pagination span {
  margin-top: 8px;
  font-size: 15px;
  font-weight: bold;
  color: black !important;
}


.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: #dcdcdc;
  /* Color más suave para el botón deshabilitado */
}

@media (max-width: 900px) {
  .main-content {
    grid-template-columns: repeat(2, 2fr);
    justify-items: center;
    /* Centra horizontalmente */
    align-items: center;
    /* Centra verticalmente */

  }

  .img-logo {
    max-width: 80%;
    height: 30%;
  }
}

@media (max-width: 720px) {
  .main-content {
    grid-template-columns: 1fr;
    justify-items: center;
    /* Centra horizontalmente */
    align-items: center;
    /* Centra verticalmente */
  }

  .img-logo {
    height: 30%;
    max-width: 90%;

  }
}

</style>