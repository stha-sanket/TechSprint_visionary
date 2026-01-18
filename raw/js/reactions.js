const ReactionEngine = {
    reactions: [
        {
            reactants: ['HCl', 'NaOH'],
            name: 'Neutralization Reaction',
            products: 'NaCl + H2O',
            description: 'Hydrochloric acid reacts with sodium hydroxide to form table salt and water.',
            effect: 'confetti',
            color: '#ffffff'
        }
    ],

    getReaction: (nameA, nameB) => {
        return ReactionEngine.reactions.find(r =>
            (r.reactants.includes(nameA) && r.reactants.includes(nameB))
        );
    }
};