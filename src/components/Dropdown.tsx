import { useState } from "react";
import { FaTrash,FaShare } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Dropdown.css"
import CreateCommunityModal from "./CreateCommunityModal";
import { useUser } from "@clerk/clerk-react";
import { Id } from "../../convex/_generated/dataModel";
interface Dropdown {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    type: "picture" | "album";
    owner: string;
}

const Dropdown = ({isOpen, onClose, onDelete,type, owner}: Dropdown) => {
    const { user } = useUser() //get current user
    const isOwner = user?.externalId == owner;
    if (!isOpen) return null

    return <>
    
        <div className="modal-overlay" onClick={onClose}>

        </div>
        <div className="create-dropdown">
            <div className="dropdown-header">
                <h3>Delete</h3>
            </div>
            <div className="dropdown-options">
                {isOwner && <button className="dropdown-options" onClick={onDelete}>
                    <div className="option-icon"><FaTrash/></div>
                    <div className="option-content">
                        <span className="option-title">Delete {type}</span>
                        <span className="option-description">Delete your {type}</span>
                    </div>
                </button>}

            </div>
        </div>

    </>

}

export default Dropdown