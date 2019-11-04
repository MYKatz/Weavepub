var router = new VueRouter({
    routes: [
        {path: '/', component: {template: '<div>Hello world</div>'}},
        {path: '/upload', component: {template: '<upload-form></upload-form>'}}
    ]
});

var app = new Vue({
    el: '#app',
    router
});