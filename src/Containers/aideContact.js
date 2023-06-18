import React from 'react';

const AideContact = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-8 mt-20">
      <div className="pdf-container" style={{ height: '75vh' }}>
      <p className="text-center p-4 rounded bg-indigo-600 text-white mb-4">
            Vous pouvez nous contacter par mail à l'adresse suivante : <a href="mailto: isee@support.com ">isee@support.com</a>
        </p>
        <iframe
          src="/conditions_utilisation.pdf"
          style={{ width: '100%', height: '100%' }}
          frameborder="0"
        >
          Votre navigateur ne supporte pas les iframes.
        </iframe>
      </div>
    </div>
  );
};

export default AideContact;
