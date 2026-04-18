// firebase-config.js
// Importamos los módulos necesarios de Firebase (Versión Modular 10.8.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Tu configuración extraída directamente de la consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmyWKPTd67VaJnGPlYo_KlnloQ00hUkiU",
  authDomain: "bolsoapp-fb89e.firebaseapp.com",
  projectId: "bolsoapp-fb89e",
  storageBucket: "bolsoapp-fb89e.firebasestorage.app",
  messagingSenderId: "1064352456646",
  appId: "1:1064352456646:web:e527d378d042af81795cc7",
  measurementId: "G-LR9NJ127MN"
};

// Inicializamos la aplicación
const app = initializeApp(firebaseConfig);

// Exportamos las herramientas para usarlas en tus archivos HTML (Panel, Registro, etc.)
export const db = getFirestore(app);      // Para manejar tus colecciones como 'lista_negra'
export const storage = getStorage(app);  // Para las fotos de las cédulas y selfies
export const auth = getAuth(app);        // Para el control de acceso de usuarios

/**
 * Función reutilizable para subir archivos (Cédulas/Captures)
 * @param {File} archivo - El archivo físico del input
 * @param {string} ruta - El nombre con el que se guardará en Storage
 */
export async function subirArchivo(archivo, ruta) {
    try {
        const storageRef = ref(storage, ruta);
        const snapshot = await uploadBytes(storageRef, archivo);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Error al subir archivo:", error);
        throw error;
    }
}