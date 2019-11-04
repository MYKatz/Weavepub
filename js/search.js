Vue.component('SingleSearchBar', {
    template: `
        <div class="container my-3">
            <select v-model="searchType" class="custom-select searchpage-formitem" style="width: 20%" :disabled="isAdvanced" :style="{backgroundColor: isAdvanced ? 'white' : ''}">
                <option value="">Search by...</option>
                <option value="contents" >Contents</option>
                <option value="author">Author</option>
                <option value="subject">Subject</option>
                <option value="publisher">Publisher</option>
            </select>
            <input class="form-control border-0 mr-3 mb-2 mr-sm-0 page-search my-3 searchpage-formitem" type="text"
                    :placeholder="!isAdvanced ? 'Search query' : 'Search query (leave blank for no filter)'" style="width: 79%"
                    @input="$emit('input', $event.target.value)" v-model="searchVal">
        </div>
    `,
    data: function () { return { value: '', chosenSearchType: '', searchVal: this.initValue } },
    props: ['initSearchType', 'isAdvanced', 'initValue'],
    computed: {
        searchType: {
            get: function () { return this.chosenSearchType || this.initSearchType; },
            set: function (v) { this.chosenSearchType = v; }
        }
    }
});

Vue.component('searchpage', {
    template: `
    <div>
        <div class="blog section section-invert py-4 section-title">
            <h3 class="text-center m-5">Search papers</h3>
            <form @submit.prevent="doSearch">
            <single-search-bar :initSearchType="searchType" v-if="searchType !== 'advanced'" ref="singleFilter" :initValue="searchQuery"></single-search-bar>
            <template v-else>
                <single-search-bar v-for="searchType in allSearchTypes"
                    :initSearchType="searchType" :isAdvanced="true" :key="searchType" @input="$set(filters, searchType, $event)"></single-search-bar>
            </template>
            <button type="submit" style="display: none;">submit</button>
            </form>
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
            loggedIn: true,
            filters: {
                contents: '',
                author: '',
                subject: '',
                publisher: ''
            },
            allSearchTypes: ['contents', 'author', 'subject', 'publisher']
        }
    },
    props: ['searchType', 'searchQuery'],
    mounted: function () {
        if (this.searchQuery) {
            console.log(this.searchQuery);
        }
    },
    methods: {
        doSearch: function () {
            if (this.searchType !== 'advanced') {
                let singleFilter = this.$refs.singleFilter;
                let obj = {};
                for (let searchType of this.allSearchTypes) obj[searchType] = '';
                obj[singleFilter.searchType] = singleFilter.value;
                this.filters = obj;
            }
            console.log("Searching with", this.filters);
        }
    }
});