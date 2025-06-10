import { useState, useRef } from 'react';
import styles from './taginput.module.css'; // crea este archivo para estilos

export default function TagInput({ tags, setTags, placeholder = 'Agrega una habilidad...' }) {
    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            const newTag = input.trim().replace(/,$/, '');
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInput('');
        } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className={styles.tagInputContainer} onClick={() => inputRef.current.focus()}>
            {tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                    {tag}
                    <button type="button" onClick={() => removeTag(index)} className={styles.removeBtn}>
                        ×
                    </button>
                </span>
            ))}
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={styles.input}
            />
        </div>
    );
}
