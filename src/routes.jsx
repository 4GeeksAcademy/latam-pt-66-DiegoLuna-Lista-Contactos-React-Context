import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";

import Contact from "./pages/Contact.jsx";
import AddContact from "./pages/AddContact.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Lista */}
        <Route path="/" element={<Contact />} />
        
        {/* Crear */}
        <Route path="/add-contact" element={<AddContact />} />
        
        {/* Editar */}
        <Route path="/edit-contact/:id" element={<AddContact />} />
        
      </Route>
    )
);