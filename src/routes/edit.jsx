import { Form, useLoaderData, redirect } from "react-router-dom";

import { updateContact } from "../contacts";

//hacemos la accion de edicion
export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }

export default function EditContact() {
  const { contact } = useLoaderData();
    
  //usamos el formulario de rectrouter
  return (
    
    <Form method="post" id="contact-form">
      <p>
        <span>Nombre y Apellido</span>
        <input
          placeholder="Nombre"
          aria-label="Nombre"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Apellido"
          aria-label="Apellido"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@twitter"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notas</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Guardar</button>
        <button type="button">Cancelar</button>
      </p>
    </Form>
  );
}