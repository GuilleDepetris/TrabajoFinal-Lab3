<template>
  <div class="contenedor-graficos">
    <canvas id="myChart" :style="{ display: display1 }"></canvas>
    <canvas id="myChart2" :style="{ display: display2 }"></canvas>
    <p class="cargando" v-if="cargando">Cargando Graficos...</p>
    <p class="cargando" v-if="cargando1">
      No hay transacciones como para mostrar los graficos
    </p>
  </div>
  <i class="fa-solid fa-chevron-right" @click="cambiarGrafico()"></i>
</template>
<script>
import Chart from "chart.js/auto";
export default {
  name: "GraficosDeEstado",
  props: {
    cantidadesTotales: Object,
  },
  data() {
    return {
      grafico: true,
      display1: "block",
      display2: "none",
      cargando: true,
      cargando1: false,
    };
  },
  mounted() {
    setTimeout(() => {
      try {
        if (this.cantidadesTotales.length > 0) {
          this.renderizandoGrafico();
          this.renderizandoGrafico2();
        } else {
          this.cargando1 = true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.cargando = false;
      }
    }, 4500);
  },
  methods: {
    cambiarGrafico() {
      if (this.display1 === "block") {
        this.display1 = "none";
        this.display2 = "block";
        console.log(this.display1);
      } else {
        this.display1 = "block";
        this.display2 = "none";
      }
    },
    renderizandoGrafico() {
      const ctx = document.getElementById("myChart");
      const nombres = this.cantidadesTotales.map((item) => item.nombre);
      const precios = this.cantidadesTotales.map((item) => item.precioTotal);
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: nombres,
          datasets: [
            {
              label: "Cantidad",
              data: precios,
              backgroundColor: "rgba(54, 100, 235, 0.5)",
              borderColor: "rgba(50, 90, 200, 1)",
              borderWidth: 1.7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      myChart;
    },
    renderizandoGrafico2() {
      const ctx2 = document.getElementById("myChart2");
      const nombres = this.cantidadesTotales.map((item) => item.nombre);
      const cantidades = this.cantidadesTotales.map((item) => item.cantidad);
      const myChart2 = new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: nombres,
          datasets: [
            {
              label: "Cantidad",
              data: cantidades,
              backgroundColor: [
                "rgba(54, 100, 235, 0.7)",
                "rgba(100, 100, 100, 0.7)",
                "rgba(0, 255, 255, 0.6)",
                "rgba(128, 0, 128, 0.7)",
                "rgba(255, 0, 0, 0.7)",
                "rgba(0, 255, 0, 0.7)",
                "rgba(255, 0, 255, 0.7)",
                "rgba(0, 0, 0, 0.7)",
                "rgba(0, 155, 255, 0.7)",
                "rgba(255, 0, 100, 0.7)",
              ],
              borderColor: "rgba(50, 90, 200, 1)",
              borderWidth: 1.7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      myChart2;
    },
  },
};
</script>
<style scoped>
.cargando {
  margin-top: 100px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}
.contenedor-graficos {
  width: 90%;
  height: 100vh;
  max-width: 550px;
  max-height: 550px;
  margin: auto auto;
  margin-top: 10px;
}
i {
  position: absolute;
  top: 50%;
  right: 30px;
  font-size: 40px;
  color: rgba(140, 140, 140, 0.9);
}
i:hover {
  color: rgba(140, 140, 140, 0.6);
}
@media only screen and (max-width: 900px) {
  .contenedor-graficos {
    min-width: 400px;
    min-height: 400px;
    margin: auto;
  }
  i {
    position: absolute;
    top: 162%;
    right: 30px;
    font-size: 40px;
    color: rgba(140, 140, 140, 0.9);
  }
}
</style>
