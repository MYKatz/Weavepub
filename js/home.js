Vue.component('homepage', {
    template: `
    <div class="homepage">
        <navigation-menu activePage="home" :loggedIn="loggedIn"></navigation-menu>
        <div class="welcome d-flex justify-content-center flex-column" style="height: 60vh; min-height: 700px;">
        <div class="container">
            <!-- Navigation -->
            <!-- / Navigation -->
        </div> <!-- .container -->

        <!-- Inner Wrapper -->
        <div class="inner-wrapper mt-auto mb-auto container">
            <div class="row">
                <div class="col-12 mt-auto mb-auto mr-3" style="text-align: center">
                    <h1 class="welcome-heading display-4 text-white">Search papers</h1>
                    <p class="text-muted">Free, creative commons-licensed papers await you!
                    </p>
                    <form @submit.prevent>
                    <input required class="form-control border-0 mr-3 mb-2 mr-sm-0 landing-search my-5" type="text"
                        placeholder="Search query">
                    <button
                        class="btn btn-lg btn-success btn-pill align-self-center">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiPgogIDxnPgogICAgPHBhdGggc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgZD0iTTExIDExbDMuNSAzLjUiPjwvcGF0aD4KICAgIDxjaXJjbGUgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiIGN4PSI2LjUiIGN5PSI2LjUiIHI9IjUuNSIgZmlsbD0ibm9uZSI+PC9jaXJjbGU+CiAgPC9nPgo8L3N2Zz4K" class="autocomplete__icon">
                        Search</button>
                     </form>

                </div>
            </div>
        </div>
        <!-- / Inner Wrapper -->
        </div>
        <div id="recentPapers" name="recentPapers">
            <paper-viewer></paper-viewer>
        </div>
        <footer-bar></footer-bar>
    </div>
    `,
    data: function() {
        return {
            loggedIn: true
        }
    }
});