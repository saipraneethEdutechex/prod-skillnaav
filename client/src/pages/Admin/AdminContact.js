import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminContact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contact");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contact Submissions</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 py-2">Name</th>
            <th className="w-1/3 py-2">Email</th>
            <th className="w-1/3 py-2">Subject</th>
            <th className="w-1/3 py-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{contact.name}</td>
              <td className="border px-4 py-2">{contact.email}</td>
              <td className="border px-4 py-2">{contact.subject}</td>
              <td className="border px-4 py-2">{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminContact;
