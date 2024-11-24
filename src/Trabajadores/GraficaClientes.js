import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const GraficaClientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await fetch('http://localhost/apiprueba/api.php');
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        obtenerDatos();

        const interval = setInterval(obtenerDatos, 5000);

        return () => clearInterval(interval);
    }, []);

    // Contar cuántos clientes hay de cada género
    const contarGeneros = () => {
        const conteo = { M: 0, F: 0, I: 0 };

        clientes.forEach((cliente) => {
            if (cliente.sexo === "M") conteo.M++;
            if (cliente.sexo === "F") conteo.F++;
            if (cliente.sexo === "I") conteo.I++;
        });

        return conteo;
    };

    // Generar los datos para la gráfica de pastel
    const generarDatosGrafica = () => {
        const conteoGeneros = contarGeneros();

        // Generar colores aleatorios para cada género
        const generarColorAleatorio = () => {
            return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
        };

        return {
            labels: ['Hombres', 'Mujeres', 'Indefinidos'],
            datasets: [
                {
                    data: [conteoGeneros.M, conteoGeneros.F, conteoGeneros.I],
                    backgroundColor: [
                        generarColorAleatorio(),
                        generarColorAleatorio(),
                        generarColorAleatorio(),
                    ],
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.8)", // Borde blanco brillante
                }
            ],
        };
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: "#00ff99", // Color verde neón para la leyenda
                    font: {
                        size: 16,
                        family: "'Courier New', Courier, monospace",
                        weight: "bold",
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 255, 153, 0.8)', // Fondo del tooltip con efecto ciberpunk
                titleColor: "#ff00ff", // Color para el título del tooltip
                bodyColor: "#00ff99", // Color para el cuerpo del tooltip
                callbacks: {
                    label: (context) => {
                        return `${context.label}: ${context.raw} personas`;
                    }
                }
            }
        },
        animation: {
            animateScale: true, // Efecto de escala al renderizar
        },
        scales: {
            x: {
                display: false, // El gráfico de pastel no necesita escalas en X
            },
            y: {
                display: false, // El gráfico de pastel no necesita escalas en Y
            },
        }
    };

    return (
        <div style={styles.chartContainer}>
            <h2 style={styles.header}>Distribución de Género de Clientes</h2>
            <Pie data={generarDatosGrafica()} options={options} />
        </div>
    );
};

const styles = {
    chartContainer: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#0a0a0a", // Fondo oscuro para un estilo ciberpunk
        border: "4px solid #ff00ff", // Borde brillante morado
        borderRadius: "20px",
        boxShadow: "0 0 15px #00ffff, 0 0 30px #ff00ff, inset 0 0 10px #222", // Sombra con efectos de neón
    },
    header: {
        color: "#00ff99", // Título en verde neón
        fontSize: "2em",
        textAlign: "center",
        marginBottom: "20px",
        textShadow: "2px 2px #ff00ff, 4px 4px #00ffff", // Sombra de texto para un efecto cibernético
    }
};

export default GraficaClientes;
