import React from 'react';

const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍'];

const EmojiPicker = ({ onSelect }) => {
    return (
        <div className="bg-gray-700 p-2 rounded-lg flex space-x-2">
            {emojis.map((emoji) => (
                <button
                    key={emoji}
                    onClick={() => onSelect(emoji)}
                    className="text-2xl focus:outline-none"
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};

export default EmojiPicker;
