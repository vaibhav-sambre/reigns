// Card list with search for admin

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Card } from '../engine/types';
import { getAllCards, deleteCard } from '../persistence/db';
import './CardList.css';

export function CardList() {
    const [cards, setCards] = useState<Card[]>([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        setIsLoading(true);
        const allCards = await getAllCards();
        setCards(allCards);
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            await deleteCard(id);
            await loadCards();
        }
    };

    const filteredCards = cards.filter((card) => {
        const searchLower = search.toLowerCase();
        return (
            card.id.toLowerCase().includes(searchLower) ||
            card.prompt.toLowerCase().includes(searchLower) ||
            card.title?.toLowerCase().includes(searchLower) ||
            card.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
    });

    if (isLoading) {
        return <div className="card-list__loading">Loading cards...</div>;
    }

    return (
        <div className="card-list">
            <div className="card-list__header">
                <h2 className="card-list__title">Cards ({cards.length})</h2>
                <Link to="/admin/card/new" className="card-list__add-btn">
                    + Add Card
                </Link>
            </div>

            <div className="card-list__search">
                <input
                    type="text"
                    placeholder="Search cards by ID, title, prompt, or tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="card-list__search-input"
                />
            </div>

            <div className="card-list__table-wrapper">
                <table className="card-list__table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Tags</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCards.map((card) => (
                            <tr key={card.id}>
                                <td className="card-list__cell--id">{card.id}</td>
                                <td>{card.title || <span className="card-list__no-title">No title</span>}</td>
                                <td>
                                    <div className="card-list__tags">
                                        {card.tags.map((tag) => (
                                            <span key={tag} className="card-list__tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div className="card-list__actions">
                                        <Link
                                            to={`/admin/card/${card.id}`}
                                            className="card-list__action-btn card-list__action-btn--edit"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(card.id)}
                                            className="card-list__action-btn card-list__action-btn--delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredCards.length === 0 && (
                <div className="card-list__empty">
                    {search ? 'No cards match your search.' : 'No cards yet.'}
                </div>
            )}
        </div>
    );
}
