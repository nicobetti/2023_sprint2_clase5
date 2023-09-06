import { Outlet, Link, useLoaderData,Form, redirect } from "react-router-dom";

//importamos la funcion getContacts de nuestro archivo js contacts
import { getContacts, createContact } from "../contacts";

//creamos nuestra accion y llamamos a createcontact
export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
  }
  

//exportamos un loader
export async function loader(){
    const contacts = await getContacts();
  return { contacts };
}

export default function Root() {
    //cargamos los contactos
    const {contacts} = useLoaderData();
    return (
      <>
        <div id="sidebar">
          <h1>Contactos</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Buscar"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            {
            }
            <Form method="post">
                <button type="submit">Nuevo</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
                <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                    <Link to={`contacts/${contact.id}`}>
                        {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                        ) : (
                        <i>Sin nombre</i>
                        )}{" "}
                        {contact.favorite && <span>★</span>}
                    </Link>
                    </li>
                ))}
                </ul>
            ) : (
                <p>
                <i>Sin contactos</i>
                </p>
            )}
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }