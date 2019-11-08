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

Vue.use(VueRouter);

var router = new VueRouter({
    routes: [
        { path: '/', component: { template: '<homepage></homepage>' }, alias: '/home' },
        { path: '/upload', component: { template: '<div><navigation-menu activePage="upload"></navigation-menu><upload-form></upload-form><footer-bar></footer-bar></div>' } },
        { path: '/recent', component: { template: '<div><navigation-menu activePage="recent"></navigation-menu><paper-viewer></paper-viewer><footer-bar></footer-bar></div>' } },
        { path: '/mypapers', component: { template: '<div><navigation-menu activePage="mypapers"></navigation-menu><paper-viewer title="My Papers"></paper-viewer><footer-bar></footer-bar></div>' }},
        { path: '/search', component: { template: '<div><navigation-menu activePage="browse"></navigation-menu><searchpage></searchpage><footer-bar></footer-bar></div>' } },
        {
            path: '/search/:searchType', component: {
                props: ['searchType'],
                template: '<div><navigation-menu activePage="browse"></navigation-menu><searchpage :searchType="searchType"></searchpage><footer-bar></footer-bar></div>'
            }, props: true
        },
        {
            path: '/search/:searchType/:searchQuery', component: {
                props: ['searchType', 'searchQuery'],
                template: '<div><navigation-menu activePage="browse"></navigation-menu><searchpage :searchType="searchType" :searchQuery="searchQuery"></searchpage><footer-bar></footer-bar></div>'
            }, props: true
        },
        { path: '/paper/:txid', props: true, component: paperpage }



    ]
});

var app = new Vue({
    el: '#app',
    router
});
