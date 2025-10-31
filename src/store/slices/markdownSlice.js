import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    arborescence: [],
    fichierOuvert: null,
    contenuFichierOuvert: '',
    sauvegardeEnCours: false,
    dossierSelectionne: null,
};

function trierArborescence(items) {
    return items.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type === 'dossier' ? -1 : 1;
        }
        return a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' });
    });
}

function nomExisteDansParent(arborescence, nom, parentId) {
    const rechercherDansItems = (items) => {
        for (let item of items) {
            if (item.nom.toLowerCase() === nom.toLowerCase()) {
                return true;
            }
            if (item.type === 'dossier' && item.enfants) {
                if (rechercherDansItems(item.enfants)) return true;
            }
        }
        return false;
    };

    if (!parentId) {
        return arborescence.some(item => item.nom.toLowerCase() === nom.toLowerCase());
    }

    const trouverParent = (items) => {
        for (let item of items) {
            if (item.id === parentId) {
                return item.enfants || [];
            }
            if (item.type === 'dossier' && item.enfants) {
                const resultat = trouverParent(item.enfants);
                if (resultat) return resultat;
            }
        }
        return null;
    };

    const enfantsParent = trouverParent(arborescence);
    return enfantsParent ? enfantsParent.some(item => item.nom.toLowerCase() === nom.toLowerCase()) : false;
}

const markdownSlice = createSlice({
    name: 'markdown',
    initialState,
    reducers: {
        chargerArborescence: (state, action) => {
            state.arborescence = action.payload;
        },

        setSauvegardeEnCours: (state, action) => {
            state.sauvegardeEnCours = action.payload;
        },

        setDossierSelectionne: (state, action) => {
            state.dossierSelectionne = action.payload;
        },

        creerDossier: (state, action) => {
            const { nom, parentId } = action.payload;

            if (nom.length > 100) {
                throw new Error('Le nom ne peut pas dépasser 100 caractères');
            }
            if (/[/\\:*?"<>|]/.test(nom)) {
                throw new Error('Le nom contient des caractères interdits (/ \\ : * ? " < > |)');
            }
            if (nomExisteDansParent(state.arborescence, nom, parentId)) {
                throw new Error('Un élément avec ce nom existe déjà à cet emplacement');
            }

            const nouveauDossier = {
                id: crypto.randomUUID(),
                nom,
                type: 'dossier',
                enfants: [],
                parentId: parentId || null,
            };

            if (!parentId) {
                state.arborescence.push(nouveauDossier);
                state.arborescence = trierArborescence(state.arborescence);
            } else {
                const ajouterDansParent = (items) => {
                    for (let item of items) {
                        if (item.id === parentId) {
                            item.enfants.push(nouveauDossier);
                            item.enfants = trierArborescence(item.enfants);
                            return true;
                        }
                        if (item.type === 'dossier' && item.enfants) {
                            if (ajouterDansParent(item.enfants)) return true;
                        }
                    }
                    return false;
                };
                ajouterDansParent(state.arborescence);
            }
        },

        creerFichier: (state, action) => {
            const { nom, parentId } = action.payload;

            const nomFinal = nom.endsWith('.md') ? nom : `${nom}.md`;

            if (nomFinal.length > 100) {
                throw new Error('Le nom ne peut pas dépasser 100 caractères');
            }
            if (/[/\\:*?"<>|]/.test(nomFinal)) {
                throw new Error('Le nom contient des caractères interdits (/ \\ : * ? " < > |)');
            }
            if (nomExisteDansParent(state.arborescence, nomFinal, parentId)) {
                throw new Error('Un fichier avec ce nom existe déjà à cet emplacement');
            }

            const nouveauFichier = {
                id: crypto.randomUUID(),
                nom: nomFinal,
                type: 'fichier',
                contenu: '',
                parentId: parentId || null,
            };

            if (!parentId) {
                state.arborescence.push(nouveauFichier);
                state.arborescence = trierArborescence(state.arborescence);
            } else {
                const ajouterDansParent = (items) => {
                    for (let item of items) {
                        if (item.id === parentId) {
                            item.enfants.push(nouveauFichier);
                            item.enfants = trierArborescence(item.enfants);
                            return true;
                        }
                        if (item.type === 'dossier' && item.enfants) {
                            if (ajouterDansParent(item.enfants)) return true;
                        }
                    }
                    return false;
                };
                ajouterDansParent(state.arborescence);
            }
        },

        renommer: (state, action) => {
            const { id, nouveauNom } = action.payload;


            if (nouveauNom.length > 100) {
                throw new Error('Le nom ne peut pas dépasser 100 caractères');
            }
            if (/[/\\:*?"<>|]/.test(nouveauNom)) {
                throw new Error('Le nom contient des caractères interdits (/ \\ : * ? " < > |)');
            }

            const renommerRecursif = (items, parentId = null) => {
                for (let item of items) {
                    if (item.id === id) {
                        const nomFinal = item.type === 'fichier' && !nouveauNom.endsWith('.md')
                            ? `${nouveauNom}.md`
                            : nouveauNom;

                        const autresItems = items.filter(i => i.id !== id);
                        if (autresItems.some(i => i.nom.toLowerCase() === nomFinal.toLowerCase())) {
                            throw new Error('Un élément avec ce nom existe déjà à cet emplacement');
                        }

                        item.nom = nomFinal;
                        return true;
                    }
                    if (item.type === 'dossier' && item.enfants) {
                        if (renommerRecursif(item.enfants, item.id)) return true;
                    }
                }
                return false;
            };
            renommerRecursif(state.arborescence);
        },

        supprimer: (state, action) => {
            const id = action.payload;
            const supprimerRecursif = (items) => {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].id === id) {
                        items.splice(i, 1);
                        return true;
                    }
                    if (items[i].type === 'dossier' && items[i].enfants) {
                        if (supprimerRecursif(items[i].enfants)) return true;
                    }
                }
                return false;
            };
            supprimerRecursif(state.arborescence);

            if (state.fichierOuvert === id) {
                state.fichierOuvert = null;
                state.contenuFichierOuvert = '';
            }
        },

        deplacer: (state, action) => {
            const { id, nouveauParentId } = action.payload;

            let elementADeplacer = null;
            const extraire = (items) => {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].id === id) {
                        elementADeplacer = items.splice(i, 1)[0];
                        return true;
                    }
                    if (items[i].type === 'dossier' && items[i].enfants) {
                        if (extraire(items[i].enfants)) return true;
                    }
                }
                return false;
            };
            extraire(state.arborescence);

            if (!elementADeplacer) return;

            if (nomExisteDansParent(state.arborescence, elementADeplacer.nom, nouveauParentId)) {
                if (elementADeplacer.parentId) {
                    const remettre = (items) => {
                        for (let item of items) {
                            if (item.id === elementADeplacer.parentId) {
                                item.enfants.push(elementADeplacer);
                                return true;
                            }
                            if (item.type === 'dossier' && item.enfants) {
                                if (remettre(item.enfants)) return true;
                            }
                        }
                        return false;
                    };
                    remettre(state.arborescence);
                } else {
                    state.arborescence.push(elementADeplacer);
                }
                throw new Error('Un élément avec ce nom existe déjà à cet emplacement');
            }

            elementADeplacer.parentId = nouveauParentId || null;

            if (!nouveauParentId) {
                state.arborescence.push(elementADeplacer);
                state.arborescence = trierArborescence(state.arborescence);
            } else {
                const inserer = (items) => {
                    for (let item of items) {
                        if (item.id === nouveauParentId) {
                            item.enfants.push(elementADeplacer);
                            item.enfants = trierArborescence(item.enfants);
                            return true;
                        }
                        if (item.type === 'dossier' && item.enfants) {
                            if (inserer(item.enfants)) return true;
                        }
                    }
                    return false;
                };
                inserer(state.arborescence);
            }
        },

        ouvrirFichier: (state, action) => {
            const id = action.payload;
            const trouverFichier = (items) => {
                for (let item of items) {
                    if (item.id === id && item.type === 'fichier') {
                        return item;
                    }
                    if (item.type === 'dossier' && item.enfants) {
                        const trouve = trouverFichier(item.enfants);
                        if (trouve) return trouve;
                    }
                }
                return null;
            };

            const fichier = trouverFichier(state.arborescence);
            if (fichier) {
                state.fichierOuvert = id;
                state.contenuFichierOuvert = fichier.contenu || '';
            }
        },

        mettreAJourContenu: (state, action) => {
            state.contenuFichierOuvert = action.payload;

            if (state.fichierOuvert) {
                const mettreAJour = (items) => {
                    for (let item of items) {
                        if (item.id === state.fichierOuvert) {
                            item.contenu = action.payload;
                            return true;
                        }
                        if (item.type === 'dossier' && item.enfants) {
                            if (mettreAJour(item.enfants)) return true;
                        }
                    }
                    return false;
                };
                mettreAJour(state.arborescence);
            }
        },

        fermerFichier: (state) => {
            state.fichierOuvert = null;
            state.contenuFichierOuvert = '';
        },

        importerFichier: (state, action) => {
            const { nom, contenu, parentId } = action.payload;

            const nomFinal = nom.endsWith('.md') ? nom : `${nom}.md`;

            if (nomFinal.length > 100) {
                throw new Error('Le nom ne peut pas dépasser 100 caractères');
            }

            if (nomExisteDansParent(state.arborescence, nomFinal, parentId)) {
                throw new Error('Un fichier avec ce nom existe déjà à cet emplacement');
            }

            const nouveauFichier = {
                id: crypto.randomUUID(),
                nom: nomFinal,
                type: 'fichier',
                contenu,
                parentId: parentId || null,
            };

            if (!parentId) {
                state.arborescence.push(nouveauFichier);
                state.arborescence = trierArborescence(state.arborescence);
            } else {
                const ajouterDansParent = (items) => {
                    for (let item of items) {
                        if (item.id === parentId) {
                            item.enfants.push(nouveauFichier);
                            item.enfants = trierArborescence(item.enfants);
                            return true;
                        }
                        if (item.type === 'dossier' && item.enfants) {
                            if (ajouterDansParent(item.enfants)) return true;
                        }
                    }
                    return false;
                };
                ajouterDansParent(state.arborescence);
            }
        },
    },
});

export const {
    chargerArborescence,
    setSauvegardeEnCours,
    setDossierSelectionne,
    creerDossier,
    creerFichier,
    renommer,
    supprimer,
    deplacer,
    ouvrirFichier,
    mettreAJourContenu,
    fermerFichier,
    importerFichier,
} = markdownSlice.actions;

export default markdownSlice.reducer;