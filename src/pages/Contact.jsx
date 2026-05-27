import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts, deleteContact } from "../store.js"; 

const Contact = () => {
    const { store, dispatch } = useGlobalReducer(); 

    const [contactToDelete, setContactToDelete] = useState(null);

    useEffect(() => {
        getContacts(dispatch);
    }, []);

    const handleDeleteClick = (id) => {
        setContactToDelete(id);
    };

    const confirmDelete = () => {
        if (contactToDelete) {
            deleteContact(dispatch, contactToDelete);
            setContactToDelete(null); 
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add-contact" className="btn btn-success">
                    Add new contact
                </Link>
            </div>

            <ul className="list-group">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <ContactCard 
                            key={contact.id} 
                            contact={contact} 
                            onDelete={handleDeleteClick} 
                        />
                    ))
                ) : (
                    <li className="list-group-item text-center text-muted">
                        No contacts found. Add one!
                    </li>
                )}
            </ul>

            {contactToDelete && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                                <button type="button" className="btn-close" onClick={() => setContactToDelete(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>If you delete this thing the entire universe will go down!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setContactToDelete(null)}>Oh no!</button>
                                <button type="button" className="btn btn-secondary" onClick={confirmDelete}>Yes baby!</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;