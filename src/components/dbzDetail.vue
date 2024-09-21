<template>
    <div class="card" >
        <img :src="image" class="card-img-top" alt="Image">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <!-- Sección del nombre y raza -->
                <div>
                    <h5 class="card-title">{{ name }}</h5>
                    <p class="card-text">{{ race }}</p>
                </div>
                <!-- Botón alineado al lado derecho -->
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
</script>

<style>
/* Puedes agregar estilos personalizados aquí si lo necesitas */

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0057b328;
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.card {
    width: 250px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

}

h5,
p {
    color: rgb(17, 16, 16);
    text-transform: uppercase;
    padding-left: 4px;
    ;
}

/* Estilo general de los botones */
.btn {
    display: inline-block;
    padding: 5px 10px;
    /* margin: 5px; */
    /* Bordes redondeados */
    text-decoration: none;
    color: rgba(25, 108, 175, 0.814);
    font-weight: bold;
    text-align: center;
    transition: all 0.3s ease;
    font-size: smaller;
}

.btn:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}

/* Estilos de los botones específicos */
.btn-default {
    background-color: #007bff;
}

.btn-success {
    background-color: #28a745;
}

.btn-danger {
    background-color: transparent;
    color: #dc3545;
    border: 2px solid #dc3545;
}

.btn-warn {
    background-color: #ffc107;
    color: black;
}

.btn-dark {
    background-color: #343a40;
}

.btn-hex {
    background-color: #6f42c1;
}

.btn-rgb {
    background-color: #20c997;
}

/* Efectos de hover */
.btn-default:hover {
    background-color: #0056b3;
}

.btn-success:hover {
    background-color: #218838;
}

.btn-danger:hover {
    background-color: #dc3545;
    color: white;
}

.btn-warn:hover {
    background-color: #e0a800;
}

.btn-dark:hover {
    background-color: #23272b;
}

.btn-hex:hover {
    background-color: #563d7c;
}

.btn-rgb:hover {
    background-color: #17a2b8;
}
</style>