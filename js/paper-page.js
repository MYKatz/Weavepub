const paperpage = Vue.component('paperpage', {
    template: `
    <div>
        <navigation-menu activePage="recent"></navigation-menu>
        <div class="blog section section-invert py-4">
            <div class="row">
                <div class="col-md-3">
                    <div class="mx-3">
                        <h4 class="card-title">{{ title }}</h4>
                        <p class="card-authors">{{ authors }}</p>
                        <p class="card-text">{{ abstract }}</p>
                    </div>
                </div>
                <div class="col-md-8">
                    <object class="paper-pdf" v-bind:data="'http://arweave.net/' + txid" type="application/pdf">
                        <embed v-bind:src="'http://arweave.net/' + txid" type="application/pdf" />
                    </object>
                </div>
            </div>
        </div>
        <footer-bar></footer-bar>
    </div>
    `,
    data: function () {
        return {
            loggedIn: true,
            title: null,
            authors: null,
            abstract: null,
        }
    },
    props: ["txid"],
    watch: {
        txid: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            async handler(val, oldVal) {
                obj = await processPaperFromId(val);
                this.title = obj["title"];
                this.authors = obj["authors"];
                this.abstract = obj["abstract"];
            }
        }
    }
});