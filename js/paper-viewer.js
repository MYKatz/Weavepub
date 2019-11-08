Vue.component('Paper', {
    template: `
    <div class="col-md-12 col-lg-4">
        <div class="card mb-4">
            <div class="card-body">
                <h4 class="card-title">{{paperTitle}}</h4>
                <p class="card-authors">{{authorsAsString}}</p>
                <p class="card-text">{{shortAbstract}}</p>
                 <router-link class="btn btn-outline-success btn-pill" :to="paperLink">Read More &rarr;</router-link>
            </div>
        </div>
    </div>
    `,
    props: ['title', 'authors', 'abstract', 'txid'],
    computed: {
        authorsAsString: function () {
            return this.authors;
        },
        shortAbstract: function () {
            if (!this.abstract) return '(No abstract provided)';
            return this.abstract.length >= 200 ? this.abstract.slice(0, 200) + "..." : this.abstract;
        },
        paperTitle: function () {
            return this.title;
        },
        paperLink: function () {
            return "/paper/" + this.txid;
        }
    }
});

Vue.component('PaperViewer', {
    template: `
    <div class="paper-viewer">
        <div class="blog section section-invert py-4">
        <h3 class="section-title text-center m-5" v-if="!hideTitle">{{title}}</h3>
        <div class="container">
            <div class="py-4">
                <div class="row">
                        <div v-if="papers.length == 0 && !noResultsFound" class="align-content-center progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="loadProgress" aria-valuemax="1" aria-valuemin="0" :style="{width: Math.round(loadProgress*100) + '%'}"></div>
                        </div>
                        <div v-if="noResultsFound">No results found</div>
                        <Paper v-for="paper in papers" :title="paper.title" :authors="paper.authors" :abstract="paper.abstract" :key="paper.txid" :txid="paper.txid"></Paper>
                </div>
            </div>
        </div>
        </div>
    </div>
    `,
    data: function () {
        return { papers: [], noResultsFound: false, loadProgress: 0 }
    },
    created: function() {
        let interval = setInterval(() => {
            var loaded = this.loadPapersFrom === 'mypapers' ? myPapersLoaded : papersCachedLoaded;
            var total = this.loadProgress === 'mypapers' ? myPapersTotal : papersCachedTotal;
            this.loadProgress = total === 0 ? 0 : loaded / total;
            if (loaded === total && total !== 0) {
                clearInterval(interval);
            }
            console.log("Load progress", this.loadProgress);
        }, 50);
    },
    props: {
        hideTitle: Boolean,
        searchQ: {
            type: Object,
            required: false
        },
        title: {
            type: String,
            default: "Latest Papers"
        },
        /*papers: {
            type: Array,
            default: function () {
                var ret = [];
                for (let i = 0; i < 6; ++i) {
                    ret.push({
                        title: "Improved Learning in a Large-Enrollment Physics Class",
                        authors: ["Louis Deslauriers", "Carl Wieman"].join(", "),
                        abstract: `We compared the amounts of learning achieved using two different instructional approaches
                under controlled conditions. We measured the learning of a specific set of topics and objectives when...`,
                        created: i
                    });
                }
                return ret;
            }
        }*/
        loadPapersFrom: {
            type: String,
            default: 'default'
        }
    },
    watch: {
        loadPapersFrom: {
            immediate: true,
            handler: async function (newValue) {
                if (newValue === 'recent') {
                    let recent = await searchRecent();
                    this.papers = recent;
                } else if (newValue === 'default') {
                    /*                     for (let i = 0; i < 6; ++i) {
                                            ret.push({
                                                title: "Improved Learning in a Large-Enrollment Physics Class",
                                                authors: ["Louis Deslauriers", "Carl Wieman"].join(", "),
                                                abstract: `We compared the amounts of learning achieved using two different instructional approaches
                                    under controlled conditions. We measured the learning of a specific set of topics and objectives when...`,
                                                created: 0,
                                                txid: i
                                            });
                                        } */
                    this.papers = [];
                } else if (newValue === 'mypapers') {
                    let mine = await getMyPapers();
                    this.papers = mine;
                }
                this.noResultsFound = this.papers.length === 0;
            }
        },
        searchQ: {
            handler: async function (newValue) {
                this.papers = [];
                console.log(newValue["queries"], newValue["types"]);
                this.papers = await searchPapers(newValue["types"], newValue["queries"]);
                this.noResultsFound = this.papers.length === 0;
            }
        }
    }
});