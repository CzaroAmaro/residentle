import { useState, useEffect } from 'react';
import type { Character } from './models/Characters';
import characters from './data/characters.json';
import GuessInput from './components/GuessInput/GuessInput';
import GuessRow from './components/GuessRow/GuessRow';
import './app.css';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

const propsToCheck = [
    'name','gender','profession','occupation',
    'specialty','title','affiliation'
] as const;

const categoryLabels: Record<typeof propsToCheck[number], string> = {
    name: 'Name', gender: 'Gender', profession: 'Profession',
    occupation: 'Occupation', specialty: 'Specialty',
    title: 'Title', affiliation: 'Affiliation',
};

export default function App() {
    const [solution, setSolution] = useState<Character | null>(null);
    const [guesses, setGuesses] = useState<string[]>([]);
    const { width, height } = useWindowSize();

    useEffect(() => {
        setSolution(characters[Math.floor(Math.random() * characters.length)]);
    }, []);

    function handleGuess(name: string) {
        if (!characters.some(c => c.name === name)) {
            alert('Nie ma takiej postaci!');
            return;
        }
        setGuesses(prev => [name, ...prev]);
    }

    if (!solution) return <div>Ładowanie…</div>;

    const isSolved =
        guesses.length > 0 &&
        guesses[0].toLowerCase() === solution.name.toLowerCase();

    return (
        <div className="app-container">
            <GuessInput guesses={guesses} onEnter={handleGuess}/>

            <div className="category-row">
                {propsToCheck.map(prop => (
                    <div key={prop} className="category-header">
                        {categoryLabels[prop]}
                    </div>
                ))}
            </div>

            <div className="guesses-wrapper">
                {guesses.map(g => (
                    <GuessRow
                    key={g}
                    guess={g}
                    solution={solution}
                    />
                ))}
            </div>

            {isSolved && (
                <>
                    <div className="congrats">
                        🎉 Brawo! To {solution.name}! 🎉
                    </div>
                    <Confetti
                        width={width}
                        height={height}
                        numberOfPieces={300}
                        recycle={false}
                    />
                </>
            )}
        </div>
    );
}