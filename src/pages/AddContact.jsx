import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { addContact, updateContact } from "../store.js";

const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
            if (contactToEdit) setContact(contactToEdit);
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    // Función al hacer click en Guardar
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        let success = false;
        if (id) {
            success = await updateContact(dispatch, id, contact);
        } else {
            success = await addContact(dispatch, contact);
        }

        if (success) navigate("/");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{id ? "Edit Contact" : "Add a new contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-bold">Full Name</label>
                    <input type="text" className="form-control" name="name" value={contact.name} onChange={handleChange} placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control" name="email" value={contact.email} onChange={handleChange} placeholder="Enter email" required />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Phone</label>
                    <input type="text" className="form-control" name="phone" value={contact.phone} onChange={handleChange} placeholder="Enter phone" required />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <input type="text" className="form-control" name="address" value={contact.address} onChange={handleChange} placeholder="Enter address" required />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
            
            <div className="mt-3">
                <Link to="/">or get back to contacts</Link>
            </div>
        </div>
    );
};

export default AddContact;