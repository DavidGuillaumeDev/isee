import React, { useState } from 'react';

const VideoDetails = ({ videoData, onUpdate }) => {
    const [title, setTitle] = useState(videoData ? videoData.title : '');
    const [description, setDescription] = useState(videoData ? videoData.description : '');

    const handleSubmit = () => {
        if (videoData) {
            onUpdate({ ...videoData, title, description });
        }
    };

    if (!videoData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="video-info-container">
            <h2>Informations sur la vidéo</h2>
            
            <div className="video-statistics">
                <p>Nombre de vues: {videoData.views}</p>
                <p>Nombre de commentaires: {videoData.comments}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default VideoDetails;
