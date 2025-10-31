const STORAGE_KEY = 'markdown_arborescence';
const MAX_STORAGE_SIZE = 4 * 1024 * 1024;

export function sauvegarderArborescence(arborescence) {
    try {
        const data = JSON.stringify(arborescence);

        const sizeInBytes = new Blob([data]).size;
        if (sizeInBytes > MAX_STORAGE_SIZE) {
            throw new Error('QUOTA_EXCEEDED');
        }

        localStorage.setItem(STORAGE_KEY, data);
        return { success: true };
    } catch (error) {
        if (error.name === 'QuotaExceededError' || error.message === 'QUOTA_EXCEEDED') {
            return {
                success: false,
                error: 'Le stockage est plein. Veuillez supprimer des fichiers ou exporter vos données.'
            };
        }
        console.error('Erreur lors de la sauvegarde:', error);
        return {
            success: false,
            error: 'Erreur lors de la sauvegarde des données.'
        };
    }
}

export function chargerArborescence() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
        return [];
    }
}

export function obtenirTailleStockage() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return 0;
        return new Blob([data]).size;
    } catch {
        return 0;
    }
}