export function exporterFichier(nom, contenu) {
    const blob          = new Blob([contenu], { type: 'text/markdown' });
    const url           = URL.createObjectURL(blob);
    const a             = document.createElement('a');
    a.href              = url;
    a.download          = nom.endsWith('.md') ? nom : `${nom}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function lireFichier(file) {
    return new Promise((resolve, reject) => {
        const reader    = new FileReader();
        reader.onload   = (e) => resolve(e.target.result);
        reader.onerror  = (e) => reject(e);
        reader.readAsText(file);
    });
}