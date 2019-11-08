Vue.component('Paper', {
    template: `
    <div class="col-md-12 col-lg-4">
        <div class="card mb-4">
            <div class="card-body">
                <h4 class="card-title">Improved Learning in a Large-Enrollment Physics Class</h4>
                <p class="card-authors">{{authorsAsString}}</p>
                <p class="card-text">{{shortAbstract}}</p>
                 <a class="btn btn-outline-success btn-pill" href="#">Read More &rarr;</a>
            </div>
        </div>
    </div>
    `,
    props: ['title', 'authors', 'abstract'],
    computed: {
        authorsAsString: function () {
            return this.authors.join(", ");
        },
        shortAbstract: function () {
            return this.abstract.length >= 200 ? this.abstract.slice(0, 200) + "..." : this.abstract;
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
                    <div class="card-deck">
                        <Paper v-for="paper in papers" :title="paper.title" :authors="paper.authors" :abstract="paper.abstract" :key="paper.id"></Paper>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    `,
    props: {
        hideTitle: Boolean,
        title: {
            type: String,
            default: "Latest Paperes"
        },
        papers: {
            type: Array,
            default: function () {
                var ret = [];
                for (let i = 0; i < 6; ++i) {
                    ret.push({
                        title: "Improved Learning in a Large-Enrollment Physics Class",
                        authors: ["Louis Deslauriers", "Carl Wieman"],
                        abstract: `We compared the amounts of learning achieved using two different instructional approaches
                under controlled conditions. We measured the learning of a specific set of topics and objectives when...`,
                        id: i
                    });
                }
                return ret;
            }
        }
    }
});