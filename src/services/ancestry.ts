import { supabase } from '../utils/supabase';
import { Ancestor, AncestryTree } from '../types/ancestry';

// Placeholder image for missing ancestors
const PLACEHOLDER_IMAGE = 'https://placehold.co/400x400?text=No+Photo+Available';

const createPlaceholderAncestor = (relation: string): Ancestor => ({
    id: `placeholder-${relation}`,
    name: `Unknown ${relation}`,
    registration_id: `placeholder-${relation}`,
    profile_image_url: PLACEHOLDER_IMAGE,
    champion_titles: [],
    relation,
});

const buildAncestorNode = async (dogId: string, relation: string): Promise<Ancestor> => {
    // Fetch ancestor data from the database
    const { data: ancestor, error } = await supabase
        .from('ancestors')
        .select('*')
        .eq('dog_id', dogId)
        .eq('relation', relation)
        .single();

    if (error || !ancestor) {
        return createPlaceholderAncestor(relation);
    }

    // Type the database result as Ancestor
    const dbAncestor = ancestor as unknown as Ancestor;

    return {
        id: dbAncestor.id,
        name: dbAncestor.name,
        registration_id: dbAncestor.registration_id,
        profile_image_url: dbAncestor.profile_image_url || PLACEHOLDER_IMAGE,
        champion_titles: dbAncestor.champion_titles || [],
        relation,
    };
};

export const buildAncestryTree = async (dogId: string): Promise<AncestryTree> => {
    try {
        // Fetch the dog's mother and father
        const mother = await buildAncestorNode(dogId, 'mother');
        const father = await buildAncestorNode(dogId, 'father');

        // Fetch grandparents
        const mothersMother = await buildAncestorNode(mother.registration_id, 'mother');
        const mothersFather = await buildAncestorNode(mother.registration_id, 'father');
        const fathersMother = await buildAncestorNode(father.registration_id, 'mother');
        const fathersFather = await buildAncestorNode(father.registration_id, 'father');

        return {
            mother,
            father,
            grandparents: {
                mothersMother,
                mothersFather,
                fathersMother,
                fathersFather,
            },
        };
    } catch (error) {
        console.error('Error building ancestry tree:', error);
        // Return a tree with placeholder ancestors in case of error
        return {
            mother: createPlaceholderAncestor('mother'),
            father: createPlaceholderAncestor('father'),
            grandparents: {
                mothersMother: createPlaceholderAncestor('grandmother'),
                mothersFather: createPlaceholderAncestor('grandfather'),
                fathersMother: createPlaceholderAncestor('grandmother'),
                fathersFather: createPlaceholderAncestor('grandfather'),
            },
        };
    }
}; 