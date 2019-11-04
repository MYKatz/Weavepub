Vue.component('NavigationMenu', {
    template: `<div class="welcome d-flex justify-content-center flex-column">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark pt-4 px-0">
                <a class="navbar-brand mr-5" href="#">
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
                            <a class="nav-link" href="#" @click.prevent="$router.push('home')">Home</a>
                        </li>
                        <li class="nav-item dropdown" :class="{active: activePage == 'browse'}">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Browse
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" @click.prevent="$router.push({path: 'search', params: {}})">By author</a>
                                <a class="dropdown-item" href="#">By subject</a>
                                <a class="dropdown-item" href="#">By publisher</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Advanced search</a>
                            </div>
                        </li>
                        <li class="nav-item" :class="{active: activePage == 'recent'}">
                            <a class="nav-link" href="#recentPages" @click.prevent="$router.push('recent')">Recent</a>
                        </li>
                        <li class="nav-item" :class="{active: activePage == 'mypapers'}">
                            <a class="nav-link" href="#" @click.prevent="$router.push('mypapers')">My papers</a>
                        </li>
                        <li class="nav-item" :class="{active: activePage == 'upload'}" v-if="loggedIn">
                            <a class="nav-link" href="#" @click.prevent="$router.push('upload')">Upload</a>
                        </li>
                    </ul>
                    <div class="form-inline ml-auto" v-if="!loggedIn">
                        <button class="btn btn-light my-2 my-sm-0" type="button" data-toggle="modal"
                            data-target="#exampleModal">Log in</button>
                    </div>
                </div>
            </nav>
        </div>
    </div>`,
    props: ['activePage', 'loggedIn']
});