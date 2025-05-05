import { useState, useEffect } from 'react';
import type { Character } from './models/Characters';
import characters from './data/characters.json';
import GuessInput from './components/GuessInput/GuessInput.tsx';
import GuessRow from './components/GuessRow/GuessRow.tsx';

function App() {
    const [solutions, setSolutions] = useState<Character | null>(null);
    const [guesses, setGuesses] = useState<string[]>([]);

    useEffect(() => {
        const idx = Math.floor(Math.random() * characters.length);
        setSolutions(characters[idx]);
    }, []);

    function handleGuess(name: string) {
        if (!characters.some(c => c.name === name)) {
            alert('Nie ma takiej postaci!');
            return;
        }
        setGuesses(prev => [...prev, name]);
    }

    if (!solutions) return <div>Ładowanie…</div>;

    return (
        <div>
            <GuessInput
                guesses={guesses}
                onEnter={handleGuess}
            />
            {guesses.map((g, i) => (
                <GuessRow key={i} guess={g} solution={solutions} />
            ))}
        </div>
    );
}

export default App;
