Vue.component('NavigationMenu', {
    template: `<div class="welcome d-flex justify-content-center flex-column">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark pt-4 px-0">
                <a class="navbar-brand mr-5" href="#" @click.prevent="$router.push('/home')">
                    <img src="data:image/png;base64,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" class="mr-2 nav-brand" alt="Logo">
                    Weavepub
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item" :class="{active: activePage == 'home'}">
                            <a class="nav-link" href="#" @click.prevent="$router.push('/home')">Home</a>
                        </li>
                        <li class="nav-item dropdown" :class="{active: activePage == 'browse'}">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Browse
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" @click.prevent="$router.push({path: '/search/contents'})">By keywords</a>
                                <a class="dropdown-item" href="#" @click.prevent="$router.push({path: '/search/authors'})">By author</a>
                                <a class="dropdown-item" href="#" @click.prevent="$router.push({path: '/search/subject'})">By subject</a>
                                <a class="dropdown-item" href="#" @click.prevent="$router.push({path: '/search/publisher'})">By publisher</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" @click.prevent="$router.push({path: '/search/advanced'})">Advanced search</a>
                            </div>
                        </li>
                        <li class="nav-item" :class="{active: activePage == 'recent'}">
                            <a class="nav-link" href="#recentPages" @click.prevent="$router.push('/recent')">Recent</a>
                        </li>
                        <li class="nav-item" :class="{active: activePage == 'mypapers'}" v-if="loggedIn">
                            <a class="nav-link" href="#" @click.prevent="$router.push('/mypapers')">My papers</a>
                        </li>
                        <li class="nav-item" :class="{active: activePage == 'upload'}" v-if="loggedIn">
                            <a class="nav-link" href="#" @click.prevent="$router.push('/upload')">Upload</a>
                        </li>
                    </ul>
                    <div class="form-inline ml-auto">
                        <button class="btn btn-light my-2 my-sm-0" type="button" data-toggle="modal"
                            data-target="#exampleModal" v-if="!loggedIn">Log in</button>
                        <button class="btn btn-light my-2 my-sm-0" type="button"
                         v-if="loggedIn" v-on:click="signout">Sign out</button>                      
                    </div>
                </div>
            </nav>
        </div>
    </div>`,
    props: ['activePage'],
    data: function () {
        return {
            loggedIn: false
        }
    },
    mounted: function () {
        this.loggedIn = Boolean(localStorage.wallet);
    },
    methods: {
        signout: function () {
            localStorage.clear();
            location.reload();
        }
    }
});
