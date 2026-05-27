import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
    const navigate = useNavigate();

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center">

                <img 
                    src="https://picsum.photos/100/100" 
                    alt="profile" 
                    className="rounded-circle me-3" 
                    style={{ width: "80px", height: "80px", objectFit: "cover" }} 
                />
                
                <div>
                    <h5 className="mb-1">{contact.name}</h5>
                    <p className="text-muted mb-1">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {contact.address}
                    </p>
                    <p className="text-muted mb-1">
                        <i className="fas fa-phone me-2"></i>
                        {contact.phone}
                    </p>
                    <p className="text-muted mb-0">
                        <i className="fas fa-envelope me-2"></i>
                        {contact.email}
                    </p>
                </div>
            </div>

            <div>
                {/* Editar */}
                <button 
                    className="btn btn-light me-2"
                    onClick={() => navigate(`/edit-contact/${contact.id}`)}
                >
                    <i className="fas fa-pencil-alt"></i>
                </button>
                
                {/* Eliminar */}
                <button 
                    className="btn btn-light"
                    onClick={() => onDelete(contact.id)}
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </li>
    );
};

export default ContactCard;