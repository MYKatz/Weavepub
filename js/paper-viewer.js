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
                        <div v-if="papers.length == 0">Loading...</div>
                        <div v-if="papers[0] == 'bad'">No results found</div>
                        <Paper v-for="paper in papers" :title="paper.title" :authors="paper.authors" :abstract="paper.abstract" :key="paper.txid" :txid="paper.txid"></Paper>
                </div>
            </div>
        </div>
        </div>
    </div>
    `,
    data: function () {
        return { papers: [] }
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
                    let ret = [];
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
                    this.papers = ret;
                } else if (newValue === 'mypapers') {
                    let mine = await getMyPapers();
                    this.papers = mine;
                }
                if (this.papers.length == 0) {
                    this.papers = ["bad"];
                }
            }
        },
        searchQ: {
            handler: async function (newValue) {
                this.papers = [];
                console.log(newValue["queries"], newValue["types"]);
                this.papers = await searchPapers(newValue["types"], newValue["queries"]);
                if (this.papers.length == 0) {
                    this.papers = ["bad"];
                }
            }
        }
    }
});