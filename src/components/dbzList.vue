<template>

  <div class="container">
    <div class="logo">
      <img src="https://i.pinimg.com/originals/44/ae/09/44ae092a4e174756de8d950236b6e7e6.png" class="img-logo">
    </div>
    <ul class="main-content">
      <li v-for="item in dbzs.items" :key="item.name" class="item">
        <dbzCard :name="item.name" :idChar="item.id" :race="item.race" :image="item.image" />
      </li>
    </ul>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import dbzCard from './dbzCard.vue';

const dbzs = ref([]);
const getDbzs = async () => {
  const result = await fetch('https://dragonball-api.com/api/characters');
  dbzs.value = await result.json();
}

onMounted(() => {
  getDbzs();
});

</script>

<style>
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
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