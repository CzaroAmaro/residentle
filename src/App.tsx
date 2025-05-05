import { useState, useEffect } from 'react';
import type { Character } from './models/Characters';
import characters from './data/characters.json';
import GuessInput from './components/GuessInput/GuessInput.tsx';
import GuessRow from './components/GuessRow/GuessRow.tsx';
import './app.css'


const propsToCheck = [
    'name',
    'gender',
    'profession',
    'occupation',
    'specialty',
    'title',
    'affiliation'
] as const;

const categoryLabels = {
    name: 'Name',
    gender: 'Gender',
    profession: 'Profession',
    occupation: 'Occupation',
    specialty: 'Specialty',
    title: 'Title',
    affiliation: 'Affiliation',
};

function App() {
    const [solution, setSolution] = useState<Character | null>(null);
    const [guesses, setGuesses] = useState<string[]>([]);

    useEffect(() => {
        const idx = Math.floor(Math.random() * characters.length);
        setSolution(characters[idx]);
    }, []);

    function handleGuess(name: string) {
        if (!characters.some(c => c.name === name)) {
            alert('Nie ma takiej postaci!');
            return;
        }
        setGuesses(prev => [...prev, name]);
    }

    if (!solution) return <div>Ładowanie…</div>;

    return (
        <div>
            <GuessInput
                guesses={guesses}
                onEnter={handleGuess}
            />

            {/* Nagłówki kategorii - wyświetlane tylko raz */}
            <div className="category-row">
                {propsToCheck.map(prop => (
                    <div key={prop} className="category-header">
                        {categoryLabels[prop]}
                    </div>
                ))}
            </div>

            {/* Wiersze z próbami */}
            {guesses.map((g, i) => (
                <GuessRow key={i} guess={g} solution={solution} />
            ))}
        </div>
    );
}

export default App;