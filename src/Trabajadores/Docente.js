import React, { useEffect, useState } from "react";

const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
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

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Lista de Personas rmitessfp</h1>
            <div style={styles.gridContainer}>
                {clientes.map((cliente, index) => (
                    <div key={index} style={styles.clienteCard}>
                        <div style={styles.clienteDetail}>ID: <strong>{cliente.id}</strong></div>
                        <div style={styles.clienteDetail}>Nombre: <strong>{cliente.nombre}</strong></div>
                        <div style={styles.clienteDetail}>Teléfono: <strong>{cliente.telefono}</strong></div>
                        <div style={styles.clienteDetail}>Sexo: <strong>{cliente.sexo}</strong></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Orbitron', sans-serif",
        backgroundColor: "#0a0a0a",
        border: "4px solid #ff00ff",
        borderRadius: "20px",
        boxShadow: "0 0 15px #00ffff, 0 0 30px #ff00ff, inset 0 0 10px #222",
        color: "#00ff99",
        textAlign: "center",
        transition: "box-shadow 0.3s ease-in-out",
    },
    header: {
        color: "#00ff99",
        fontSize: "2.5em",
        textShadow: "2px 2px #ff00ff, 4px 4px #00ffff",
        marginBottom: "20px",
        textTransform: "uppercase",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Organización en cuadrícula
        gap: "20px",
    },
    clienteCard: {
        background: "linear-gradient(145deg, #1a1a1a, #333)",
        padding: "15px",
        borderRadius: "10px",
        border: "2px solid #ff00ff",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7), 0 0 10px #ff00ff, 0 0 20px #00ffff",
        fontFamily: "'Orbitron', sans-serif",
        color: "#00ff99",
        textAlign: "left",
        position: "relative",
        transform: "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        overflow: "hidden",
        cursor: "pointer",
    },
    clienteDetail: {
        margin: "5px 0",
        fontSize: "1.1em",
        color: "#f0f0f0",
        textShadow: "1px 1px #222",
    },
};

export default ListaClientes;
