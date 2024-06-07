import React, { useState, useEffect } from 'react';
import './App.css';

const Character = () => {
    const [currentCharacterId, setCurrentCharacterId] = useState(1);
    const [character, setCharacter] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchCharacter = async (characterId) => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
                if (!response.ok) {
                    throw new Error('personagem nao encontrado');
                }
                const characterData = await response.json();
                setCharacter(characterData);
                return characterData;
            } catch (error) {
                console.error('Erro ao buscar personagem:', error);
                return null;
            }
        };

        const updateCharacter = async () => {
            const fetchedCharacter = await fetchCharacter(currentCharacterId);
            if (fetchedCharacter) {
                const fetchedEpisodes = await Promise.all(fetchedCharacter.episode.map(fetchEpisode));
                setEpisodes(fetchedEpisodes);
            } else {
                alert('personagem não encontrado,Insira um ID de numero válido');
            }
        };

        updateCharacter();
    }, [currentCharacterId]);
    
    const fetchEpisode = async (episodeUrl) => {
        try {
            const response = await fetch(episodeUrl);
            if (!response.ok) {
                throw new Error('Episódio não encontrado');
            }
            const episodeData = await response.json();
            return episodeData;
        } catch (error) {
            console.error('Erro ao buscar episódio:', error);
            return null;
        }
    };
    
    const handleSearch = async () => {
        const characterId = parseInt(document.getElementById('character-id-input').value.trim());
        if (characterId) {
            setCurrentCharacterId(characterId);
        } else {
            alert('Por favor, selecione um número');
        }
    };
    
    const handlePrevious = () => {
        if (currentCharacterId > 1) {
            setCurrentCharacterId((prev) => prev - 1);
        } else {
            alert('Este é o primeiro personagem.');
        }
    };
    
    const handleNext = () => {
        setCurrentCharacterId((prev) => prev + 1);
    };
    

    return (
        <div className="wrapper">
            <div className="container">
                <div className="card">
                    {character && (
                        <>
                            <img id="character-image" className="card-image" src={character.image} alt={character.name} />
                            <div className="card-info">
                                <h2 id="character-name">nome: {character.name}</h2>
                                <p id="character-status">Status: {character.status}</p>
                                <p id="character-species">especie: {character.species}</p>
                                <p id="character-gender">Genero: {character.gender}</p>
                                <p id="character-origin">origem: {character.origin.name}</p>
                                <p id="character-location">Localizacao: {character.location.name}</p>
                                <p id="character-created">Criacao: {new Date(character.created).toLocaleDateString()}</p>
                                <p id="character-id">ID: {character.id}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="info-img">
                    <div id="episode-list" className="episodes">
                        {episodes.map((episode, index) => (
                            <p key={index} className="episode">
                                {episode.episode} - {episode.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="numero">
                    <input id="character-id-input" type="numemro" placeholder="selecione o numero" />
                </div>
                <div className="buttons">
                    <button id="previous-button" className="button" onClick={handlePrevious}>Anterior</button>
                    <button id="search-button" className="button" onClick={handleSearch}>Pesquisar</button>
                    <button id="next-button" className="button" onClick={handleNext}>Próximo</button>
                </div>
            </div>
        </div>
    );
};

export default Character;
