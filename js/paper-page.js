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
                        <button class="btn btn-primary btn-block" style="color:white;" v-on:click="toggleModal">Donate</button>
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
        
        <div class="modal fade" id="donateModal" tabindex="-1" role="dialog" aria-labelledby="donateModalLabel"
        aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="donateModalLabel">Donate to author</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">How much AR would you like to donate?</div>
                        <div class="custom-file mb-3">
                            <input type="number" v-model="donateAmount">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No thanks</button>
                        <button type="button" class="btn btn-primary" v-on:click=>Send Donation!</button>
                    </div>
                </div>
            </div>
        </div>




    </div>
    `,
    data: function () {
        return {
            loggedIn: true,
            title: null,
            authors: null,
            abstract: null,
            donateAmount: 0
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
    },
    methods: {
        toggleModal: function (event) {
            $("#donateModal").modal("toggle");
        },
        sendDonation: function (event) {
            console.log(this.donateAmount);
            if (localStorage.wallet) {
                console.log("donating...");
            } else {
                alert("Please log in first")
                location.reload();
            }
        }
    }
});