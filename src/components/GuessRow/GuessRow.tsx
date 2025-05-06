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

                const exact = char ? guessVal === solVal : false;
                let partial = false;

                if (char && solVal.includes(',')) {
                    const items = solVal.split(',').map(s => s.trim().toLowerCase());
                    partial = items.some(item => {
                        const g = guessVal.toLowerCase();
                        return item !== g && (item.includes(g) || g.includes(item));
                    });
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
