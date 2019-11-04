Vue.component('searchpage', {
    template: `
    <div>
        <div class="blog section section-invert py-4">
            <h3 class="text-center m-5">Search papers</h3>
            <div class="container my-3 section-title">
                <select class="custom-select searchpage-formitem" style="width: 20%">
                    <option selected>Search by...</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="subject">Subject</option>
                </select>
                <input class="form-control border-0 mr-3 mb-2 mr-sm-0 page-search my-3 searchpage-formitem" type="text"
                    placeholder="Search query" style="width: 79%">
            </div>
        </div>
        <div>
            <div id="recentPapers" name="recentPapers">
                <paper-viewer :hideTitle="true"></paper-viewer>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            loggedIn: true
        }
    }
});