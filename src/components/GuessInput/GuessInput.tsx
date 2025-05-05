import React, { useState, useEffect } from 'react';
import characters from '../../data/characters.json';
import './GuessInput.css';

interface Props {
    onEnter: (guess: string) => void;
    guesses: string[];
}

export default function GuessInput({ onEnter, guesses }: Props) {
    const [val, setVal] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (val.trim()) {
            const matches = characters
                .map(c => c.name)
                .filter(name =>
                    name.toLowerCase().includes(val.toLowerCase()) &&
                    !guesses.includes(name)
                )
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    }, [val, guesses]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && val.trim()) {
            onEnter(val.trim());
            setVal('');
            setSuggestions([]);
        }
    }

    function handleSelect(name: string) {
        onEnter(name);
        setVal('');
        setSuggestions([]);
    }

    return (
        <div className="autocomplete-container">
            <input
                className="guess-input"
                value={val}
                onChange={e => setVal(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                placeholder="Wpisz nazwę postaci i naciśnij Enter"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map(name => (
                        <li key={name} onMouseDown={() => handleSelect(name)}>
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
