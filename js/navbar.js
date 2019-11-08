Vue.component('NavigationMenu', {
    template: `<div class="welcome d-flex justify-content-center flex-column">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark pt-4 px-0">
                <a class="navbar-brand mr-5" href="#" @click.prevent="$router.push('/home')">
                    <img src="images/logo.svg" class="mr-2 nav-brand" alt="Shards - Agency Landing Page">
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
