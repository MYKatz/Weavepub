

Vue.component('UploadForm', {
    template: `
        <div class="upload-paper">
            <h3>Title</h3>
            <input v-model="title" /><br />
            <hr/>
            <h3>Abstract</h3>
            <textarea v-model="abstract" /><br/>
            <hr />
            <h3>Subject</h3>
            <autocomplete
              placeholder="Enter the subject (e.g. Mathematics, Physics etc.)"
              @selected="selectSubject"
              :source="allSubjects">
            </autocomplete>
            <p v-if="subject && subject.display">The subject you chose was {{subject.display}}</p>
        </div>
    `,
    data: function() {
        return {
            title: '',
            abstract: '',
            subject: {display: ''},
            allSubjects: [
                {id: 0, name: 'Mathematics'},
                {id: 1, name: 'Physics'},
                {id: 2, name: 'Astrobiology'}
            ]
        };
    },
    computed: {
        searchResults: function() {

        }
    },
    methods: {
        selectSubject: function(v) {
            this.subject = v;
        }
    },
    components: {
        Autocomplete:  window["vuejs-autocomplete"]
    }
});