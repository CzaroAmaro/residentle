import type { Character } from '../../models/Characters';
import characters from '../../data/characters.json';
import './GuessRow.css';

interface Props {
    guess: string;
    solution: Character;
}

const propsToCheck = [
    'name',
    'gender',
    'profession',
    'occupation',
    'specialty',
    'title',
    'affiliation'
] as const;

type PropKey = typeof propsToCheck[number];

function GuessRow({ guess, solution }: Props) {
    const char = characters.find(c => c.name.toLowerCase() === guess.toLowerCase());

    return (
        <div className="guess-row">
            {propsToCheck.map((prop: PropKey, index) => {
                const guessVal = char ? String(char[prop]) : '';
                const solVal = String(solution[prop]);

                const exact = char ? guessVal.toLowerCase() === solVal.toLowerCase() : false;
                let partial = false;

                if (char && !exact) {
                    // Split both values into arrays of trimmed lowercase items
                    const solItems = solVal.split(',')
                        .map(s => s.trim().toLowerCase())
                        .filter(s => s.length > 0);

                    const guessItems = guessVal.split(',')
                        .map(g => g.trim().toLowerCase())
                        .filter(g => g.length > 0);

                    // Check for any common items
                    partial = solItems.some(solItem =>
                        guessItems.some(guessItem => guessItem === solItem)
                    );
                }

                const tileClass = exact ? 'correct' : partial ? 'partial' : '';
                const animationDelay = `${index * 0.4}s`;

                return (
                    <div
                        key={prop}
                        className={`guess-tile ${tileClass}`}
                        style={{ animationDelay }}
                        data-reveal={!!char}
                    >
                        <div className="tile-front">?</div>
                        <div className="tile-back">{char ? guessVal : '–'}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default GuessRow;