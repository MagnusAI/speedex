import { supabase } from '../utils/supabase';
import { Ancestor, AncestryTree } from '../types/ancestry';

// Placeholder image for missing ancestors
const PLACEHOLDER_IMAGE = 'https://placehold.co/400x400?text=No+Photo+Available';

/**
 * Creates a placeholder ancestor when real data is not available
 */
const createPlaceholderAncestor = (relation: string): Ancestor => ({
    id: `placeholder-${relation}`,
    name: `Unknown ${relation}`,
    registration_id: `placeholder-${relation}`,
    profile_image_url: PLACEHOLDER_IMAGE,
    champion_titles: [],
    relation,
});

/**
 * Fetches a specific ancestor from the database
 * The dog_id is the main dog's ID, and relation specifies the type of relationship
 * (e.g., 'mother', 'fathers_mother', etc.)
 */
const buildAncestorNode = async (dogId: string, relation: string): Promise<Ancestor> => {
    if (!dogId || dogId.startsWith('placeholder')) {
        return createPlaceholderAncestor(relation);
    }

    try {
        // Fetch ancestor data from the database
        const { data: ancestor, error } = await supabase
            .from('ancestors')
            .select('*')
            .eq('dog_id', dogId)
            .eq('relation', relation)
            .single();

        if (error || !ancestor) {
            console.log(`No ancestor found for dog_id ${dogId} and relation ${relation}`);
            return createPlaceholderAncestor(relation);
        }

        // Type the database result as Ancestor
        return {
            id: ancestor.id,
            name: ancestor.name || `Unknown ${relation}`,
            registration_id: ancestor.ancestor_id || `placeholder-${relation}`,
            profile_image_url: ancestor.profile_image_url || PLACEHOLDER_IMAGE,
            champion_titles: ancestor.champion_titles || [],
            relation,
        };
    } catch (err) {
        console.error(`Error fetching ancestor (relation: ${relation}) for dog ${dogId}:`, err);
        return createPlaceholderAncestor(relation);
    }
};

/**
 * Builds a complete ancestry tree for a dog, including parents, grandparents, and great-grandparents
 */
export const buildAncestryTree = async (dogId: string): Promise<AncestryTree> => {
    try {
        if (!dogId) {
            throw new Error('No dog ID provided');
        }

        // Important: Based on our database structure, all ancestors (including grandparents and
        // great-grandparents) reference the main dog directly through dog_id.
        // The relation field distinguishes different types of relationships.

        // Fetch direct parents
        const mother = await buildAncestorNode(dogId, 'mother');
        const father = await buildAncestorNode(dogId, 'father');

        // Fetch grandparents - they all reference the main dog directly
        const mothersMother = await buildAncestorNode(dogId, 'mothers_mother');
        const mothersFather = await buildAncestorNode(dogId, 'mothers_father');
        const fathersMother = await buildAncestorNode(dogId, 'fathers_mother');
        const fathersFather = await buildAncestorNode(dogId, 'fathers_father');

        // Fetch great-grandparents - they all reference the main dog directly
        const mothersMothersMother = await buildAncestorNode(dogId, 'mothers_mothers_mother');
        const mothersMothersFather = await buildAncestorNode(dogId, 'mothers_mothers_father');
        const mothersFathersMother = await buildAncestorNode(dogId, 'mothers_fathers_mother');
        const mothersFathersFather = await buildAncestorNode(dogId, 'mothers_fathers_father');

        const fathersMothersMother = await buildAncestorNode(dogId, 'fathers_mothers_mother');
        const fathersMothersFather = await buildAncestorNode(dogId, 'fathers_mothers_father');
        const fathersFathersMother = await buildAncestorNode(dogId, 'fathers_fathers_mother');
        const fathersFathersFather = await buildAncestorNode(dogId, 'fathers_fathers_father');

        return {
            mother,
            father,
            grandparents: {
                mothersMother,
                mothersFather,
                fathersMother,
                fathersFather,
            },
            greatGrandparents: {
                mothersMothersParents: {
                    mother: mothersMothersMother,
                    father: mothersMothersFather,
                },
                mothersFathersParents: {
                    mother: mothersFathersMother,
                    father: mothersFathersFather,
                },
                fathersMothersParents: {
                    mother: fathersMothersMother,
                    father: fathersMothersFather,
                },
                fathersFathersParents: {
                    mother: fathersFathersMother,
                    father: fathersFathersFather,
                },
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
            greatGrandparents: {
                mothersMothersParents: {
                    mother: createPlaceholderAncestor('great-grandmother'),
                    father: createPlaceholderAncestor('great-grandfather'),
                },
                mothersFathersParents: {
                    mother: createPlaceholderAncestor('great-grandmother'),
                    father: createPlaceholderAncestor('great-grandfather'),
                },
                fathersMothersParents: {
                    mother: createPlaceholderAncestor('great-grandmother'),
                    father: createPlaceholderAncestor('great-grandfather'),
                },
                fathersFathersParents: {
                    mother: createPlaceholderAncestor('great-grandmother'),
                    father: createPlaceholderAncestor('great-grandfather'),
                },
            },
        };
    }
}; 