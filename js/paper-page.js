const paperpage = Vue.component('paperpage', {
    template: `
    <div>
        <navigation-menu activePage="none"></navigation-menu>
        <div class="blog section section-invert py-4">
            <div class="row">
                <div class="col-md-3">
                    <div class="mx-5">
                        <h4 class="card-title">{{ title }}</h4>
                        <p class="card-authors">{{ authors }}</p>
                        <p class="card-text">{{ abstract }}</p>
                        <button class="btn btn-primary btn-block" style="color:white;" v-on:click="toggleModal">Donate</button>
                    </div> 
                </div>
                <div class="col-md-8">
                    <object class="paper-pdf" v-bind:data="'https://arweave.net/' + txid" type="application/pdf">
                        <embed v-bind:src="'https://arweave.net/' + txid" type="application/pdf" />
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
                        <button type="button" class="btn btn-primary" v-on:click="sendDonation">Send Donation!</button>
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
            owneraddr: null,
            donateAmount: 0
        }
    },
    props: ["txid"],
    watch: {
        txid: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler: async function (val, oldVal) {
                obj = await getTagsFromId(val);
                console.log(obj);
                this.title = obj["title"];
                this.authors = obj["authors"];
                this.abstract = obj["abstract"];
                this.owneraddr = obj["owner"];
            }
        }
    },
    methods: {
        toggleModal: function (event) {
            $("#donateModal").modal("toggle");
        },
        sendDonation: async function (event) {
            if (localStorage.wallet) {
                console.log("donating...", this.donateAmount);
                sendADonation(this.owneraddr, this.donateAmount);

            } else {
                alert("Please log in first")
                location.reload();
            }
        }
    }
});