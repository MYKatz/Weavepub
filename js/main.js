Vue.component('FooterBar', {
    template: `
     <footer>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#">WeavePub</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    </footer>
    `
});

var router = new VueRouter({
    routes: [
        { path: '/', component: { template: '<homepage></homepage>' }, alias: '/home' },
        { path: '/upload', component: { template: '<div><navigation-menu activePage="recent"></navigation-menu><upload-form></upload-form><footer-bar></footer-bar></div>' } },
        { path: '/recent', component: { template: '<div><navigation-menu activePage="recent"></navigation-menu><paper-viewer></paper-viewer><footer-bar></footer-bar></div>' } },
        { path: '/search', component: { template: '<div><navigation-menu activePage="browse"></navigation-menu><searchpage></searchpage><footer-bar></footer-bar></div>' } },

    ]
});

var app = new Vue({
    el: '#app',
    router
});