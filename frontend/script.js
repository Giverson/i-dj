async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    if (!query) return alert('Digite uma música');

    const response = await fetch(`/search?query=${query}`);
    const data = await response.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.forEach(track => {
        const trackEl = document.createElement('div');
        trackEl.innerHTML = `
            <p><strong>${track.name}</strong> - ${track.artist}</p>
            <a href="${track.url}" target="_blank">Ouvir no Spotify</a>
            ${track.preview ? `<audio controls src="${track.preview}"></audio>` : '<p>Sem prévia</p>'}
        `;
        resultsDiv.appendChild(trackEl);
    });
}
