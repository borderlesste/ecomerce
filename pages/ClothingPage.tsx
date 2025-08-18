
import React, { useState } from 'react';

const ClothingPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
        }
    };

    return (
        <div className="text-center py-20 bg-white rounded-lg shadow-lg">
            <h1 className="text-5xl font-extrabold text-text-main">Próximamente</h1>
            <p className="mt-4 text-xl text-text-light">Nuestra exclusiva colección de ropa está casi lista.</p>
            <div className="mt-8 max-w-md mx-auto">
                {!submitted ? (
                    <>
                        <p className="mb-4 text-text-light">
                            Suscríbete para ser el primero en saber cuándo estará disponible.
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Tu correo electrónico"
                                required
                                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-rose-700 transition-colors"
                            >
                                Notifícame
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                        <p className="font-bold">¡Gracias!</p>
                        <p>Te hemos añadido a la lista. Te avisaremos pronto.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClothingPage;
