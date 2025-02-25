import React, { useState } from 'react';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Envoi des données au backend
        try {
            const response = await fetch('/signalement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: message, categorie: 'général', id_utilisateur: 1 }), // Remplacez 1 par l'ID de l'utilisateur connecté
            });
            if (response.ok) {
                alert('Merci pour votre message!');
            } else {
                alert('Erreur lors de l\'envoi du message.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'envoi du message.');
        }
    };

    return (
        <section id="contact" className="p-4">
            <h2 className="text-xl font-bold">Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block">Nom:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" required />
                </div>
                <div>
                    <label htmlFor="email" className="block">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" required />
                </div>
                <div>
                    <label htmlFor="message" className="block">Message:</label>
                    <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="border p-2 w-full" required></textarea>
                </div>
                <button type="submit" className="bg-green-500 text-white p-2">Envoyer</button>
            </form>
        </section>
    );
}

export default Contact;
