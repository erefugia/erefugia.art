document.addEventListener("DOMContentLoaded", () => {
    const base = document.querySelector('base')?.href || '/';

    fetch('/includes/header.html')
        .then(r => r.text())
        .then(html => document.getElementById('site-header').innerHTML = html);

    fetch('/includes/footer.html')
        .then(r => r.text())
        .then(html => document.getElementById('site-footer').innerHTML = html);
});