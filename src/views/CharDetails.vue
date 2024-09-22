<template>
    <div class="character-card">
        <div class="character-header">
            <div class="slider-container">
                <div class="slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                   <div v-for="(transformation, index) in charImages" :key="transformation.id || 'base'" class="slide">
                        <img :src="transformation.image" :alt="transformation.name" class="slider-img">
                    </div>
                </div>
                <button class="slider-button prev" @click="prevSlide(charImages)">⬅️</button>
                <button class="slider-button next" @click="nextSlide(charImages)">➡️</button>
            </div>
        </div>
        <div class="character-body">
            <h5 class="character-name">{{ typedName }}</h5>
            <p class="character-info">{{ typedRaceGender }}</p>
            <p class="character-stat">
                {{ typeDescription }}
            </p>
            <p class="character-stat">
                <strong>Base KI:</strong> {{ typedBaseKi }}
            </p>
            <p class="character-stat">
                <strong>Total KI:</strong> {{ typedTotalKi }}
            </p>
            <p class="character-stat">
                <strong>Race:</strong> {{ typeRace }}
            </p>
            <p class="character-stat">
                <strong>Planet:</strong> {{ typedPlanet }}
            </p>
            <p class="character-affiliation">
                <strong>Affiliation:</strong> {{ typedAffiliation }}
            </p>
        </div>
    </div>
    <RouterLink to="/" class="btn-back"><- back
        </RouterLink>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const characterId = route.params.idChar;
const charData = ref([]);

const typedName = ref('');
const typedRaceGender = ref('');
const typedBaseKi = ref('');
const typedTotalKi = ref('');
const typedAffiliation = ref('');
const typeDescription = ref('');
const typeRace = ref('');
const typedPlanet = ref('');
const currentIndex = ref(0);  // Índice para el slider
const charImages = ref([]);



const typeEffect = (text, refVar, speed = 50) => {
    let i = 0;
    const type = () => {
        if (i < text.length) {
            refVar.value += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

const getCharData = async () => {
    try {
        const response = await fetch(`https://dragonball-api.com/api/characters/${characterId}`);
        const data = await response.json();
        charData.value = data;

        // Llamada para iniciar el efecto de tipeo
        typeEffect(data.name, typedName);
        typeEffect(`${data.race} - ${data.gender}`, typedRaceGender, 60);
        typeEffect(data.ki.toString(), typedBaseKi, 70);
        typeEffect(data.maxKi.toString(), typedTotalKi, 70);
        typeEffect(data.affiliation, typedAffiliation, 80);
        typeEffect(data.race, typeRace, 80);
        typeEffect(data.originPlanet.name, typedPlanet, 80);

        // Agregar la imagen inicial del personaje y luego las transformaciones
        charImages.value.push({
            image: data.image, // Imagen inicial del personaje
            name: data.name, // Nombre inicial del personaje
            ki: data.ki
        });

        // Agregar las transformaciones
        data.transformations.forEach(transformation => {
            charImages.value.push(transformation);
        });

        console.log(charImages);
        

    } catch {
        console.log('Error fetching character data');
    }
};

const nextSlide = (arrayTrans) => {
    if (currentIndex.value < charData.value.transformations.length) {
        currentIndex.value++;
        typedBaseKi.value = '';
        typedName.value = '';
        typeEffect(arrayTrans[currentIndex.value].ki.toString(), typedBaseKi, 70);
        typeEffect(arrayTrans[currentIndex.value].name, typedName, 70);
    }
};

const prevSlide = (arrayTrans) => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        typedBaseKi.value = '';
        typedName.value = '';

        typeEffect(arrayTrans[currentIndex.value].ki.toString(), typedBaseKi, 70);
        typeEffect(arrayTrans[currentIndex.value].name, typedName, 70);

    }
};


onMounted(() => {
    getCharData();
})


</script>

<style>
body {
    background-color: #ffaa3bea;
}

.btn-back{
    display: flex;
    color: rgba(36, 104, 221, 0.847);
    justify-content: space-around;
    font-size: larger;
    font-weight: 500;
}

.character-card {
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    color: white;
    max-width: 60%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin: 20px auto;

}

.slider-container {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.slider {
    display: flex;
    transition: transform 0.3s ease-in-out;
}

.slide {
    min-width: 100%;
    box-sizing: border-box;
    text-align: center;
    object-fit: contain;
    background-image: url('https://web.dragonball-api.com/images-compress/89980.webp');
    background-position: center center;
    background-size: cover;
    background-color: white;
}

.slider-img {
    width: auto;
    /* Establece un ancho fijo */
    height: 500px;
    /* Establece una altura fija */
    object-fit: cover;
    /* Asegura que la imagen se recorte para ajustarse al tamaño sin distorsionarse */
    display: block;
    margin: 0 auto;
    
}

.slider-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
   
    font-size: 1.5rem;
}

.slider-button.prev {
    left: 10px;
}

.slider-button.next {
    right: 10px;
}


.character-header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.character-img {
    width: 50%;
    height: auto;
    background-color: white;
}

.character-body {
    padding: 15px;
    background: #1c1e22;
}

.character-name {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    color: #ffffff;
}

.character-info {
    text-align: center;
    color: #ffaa3bea;
    margin-bottom: 15px;
    font-size: smaller;
    margin-top: -15px;
}

.character-stat {
    font-size: 0.9rem;
    color: #ffffff;
    text-align: center;
}

.character-stat strong {
    color: #ffeb3b;
    /* Resalta el título en amarillo */
}

.character-affiliation {
    font-size: 0.9rem;
    margin-bottom: 10px;
    color: #ffffff;
    text-align: center;
}

.character-affiliation strong {
    color: #ffeb3b;
}

</style>
