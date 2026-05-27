export const initialStore = () => {
    return {
        contacts: []
    };
};

export default function storeReducer(store, action = {}) {
    switch(action.type){
        case 'set_contacts':
            return {
                ...store,
                contacts: action.payload
            };
        default:
            return store;
    }
}

const agendaSlug = "diegoluna_agenda";
const baseURL = `https://playground.4geeks.com/contact/agendas/${agendaSlug}`;

// Leer
export const getContacts = async (dispatch) => {
    try {
        const response = await fetch(`${baseURL}/contacts`);
        
        if (response.status === 404) {
            await fetch(baseURL, { method: "POST" }); 
            getContacts(dispatch); // Volvemos a pedir los contactos
            return;
        }
        
        if (response.ok) {
            const data = await response.json();
            dispatch({ type: 'set_contacts', payload: data.contacts });
        }
    } catch (error) {
        console.error("Error obteniendo contactos:", error);
    }
};

// Borrar
export const deleteContact = async (dispatch, id) => {
    try {
        const response = await fetch(`${baseURL}/contacts/${id}`, { method: "DELETE" });
        if (response.ok) {
            getContacts(dispatch); 
        }
    } catch (error) {
        console.error("Error borrando contacto:", error);
    }
};

// Crear
export const addContact = async (dispatch, newContact) => {
    try {
        const response = await fetch(`${baseURL}/contacts`, {
            method: "POST",
            body: JSON.stringify(newContact),
            headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
            getContacts(dispatch);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error creando contacto:", error);
        return false;
    }
};

// Actualizar
export const updateContact = async (dispatch, id, updatedContact) => {
    try {
        const response = await fetch(`${baseURL}/contacts/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedContact),
            headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
            getContacts(dispatch); 
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error actualizando contacto:", error);
        return false;
    }
};