// firebase-db.js
import { db, auth } from './firebase-config.js';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, addDoc, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Guardar perfil de usuario
export async function saveUserProfile(userId, userData) {
    try {
        await setDoc(doc(db, "usuarios", userId), {
            ...userData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Obtener perfil de usuario
export async function getUserProfile(userId) {
    try {
        const docRef = doc(db, "usuarios", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { success: true, data: docSnap.data() };
        } else {
            return { success: false, error: "Usuario no encontrado" };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Actualizar perfil de usuario
export async function updateUserProfile(userId, updates) {
    try {
        const docRef = doc(db, "usuarios", userId);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Crear un nuevo grupo
export async function createGroup(groupData) {
    try {
        const docRef = await addDoc(collection(db, "grupos"), {
            ...groupData,
            createdAt: new Date().toISOString(),
            participantesActuales: 0,
            estado: "abierto"
        });
        return { success: true, groupId: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Obtener grupos disponibles
export async function getAvailableGroups() {
    try {
        const q = query(collection(db, "grupos"), where("estado", "==", "abierto"));
        const querySnapshot = await getDocs(q);
        const groups = [];
        querySnapshot.forEach((doc) => {
            groups.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, groups: groups };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Unirse a un grupo
export async function joinGroup(userId, groupId, ordenJuego) {
    try {
        await setDoc(doc(db, "participantes_grupo", `${userId}_${groupId}`), {
            userId: userId,
            groupId: groupId,
            ordenJuego: ordenJuego,
            semanaRecibe: ordenJuego + 1,
            haRecibido: false,
            pagos: [],
            joinedAt: new Date().toISOString()
        });
        
        // Incrementar contador de participantes
        const groupRef = doc(db, "grupos", groupId);
        const groupSnap = await getDoc(groupRef);
        const currentCount = groupSnap.data().participantesActuales || 0;
        await updateDoc(groupRef, {
            participantesActuales: currentCount + 1
        });
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

