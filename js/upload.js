Vue.component('UploadForm', {
    template: `
        <form class="upload-paper" @keydown.enter.capture.prevent @submit.prevent="submitForm">
            <h3>Title</h3>
            <input v-model="title" required class="paper-title" type="text"/><br />
            <hr/>
            <h3>Abstract</h3>
            <textarea v-model="abstract" required/><br/>
            <hr />
            <h3>Subject</h3>
            <autocomplete
              placeholder="Enter the subject (e.g. Mathematics, Physics etc.)"
              @selected="selectSubject"
              :source="allSubjects">
            </autocomplete>
            <p>You selected {{subject.display}}</p>
            <hr />
            <h3>Terms</h3>
            <p>Yeah so you probs wanna upload your own work
            OR something under a creative commons license idk which version</p>
            <input type="checkbox" name="terms" id="terms" required/> <label for="terms">I have read and agreed to the terms and conditions (lol no I haven't but I'll check it anyway)</label>
            <hr />
            <input type="file" required ref="pdfUpload" class="btn btn-primary" accept="application/pdf"/><br />
            <div class="submit">
            <template v-if="0 <= uploadProgress && uploadProgress < 100">
            <button class="btn btn-secondary submit">Submit</button>
            <span v-if="0 !== uploadProgress">
                Progress: <progress :value="uploadProgress" max="100"></progress>
            </span>
            </template>
            <button v-if="uploadProgress >= 100" class="btn btn-success" @click.prevent>
                Successfully uploaded! Click to go back home
            </button>
            <button v-if="uploadProgress < 0" class="btn btn-danger">
                Upload failed. Click to retry.
            </button>
            </div>
        </form>
    `,
    data: function () {
        return {
            title: '',
            abstract: '',
            subject: { display: '' },
            allSubjects: [
                { id: 1, name: 'Mathematics' },
                { id: 2, name: 'Physics' },
                { id: 3, name: 'Astrobiology' }
            ],
            uploadProgress: 0
        };
    },
    computed: {
    },
    methods: {
        selectSubject: function (v) {
            this.subject = v;
        },
        submitForm: function () {
            console.log("Uploading stuff with title", this.title, "abstract", this.abstract, "subject", this.subject, "and file", this.$refs.pdfUpload.files);
            var seconds = 0, dt = 1, totalUploadTime = 15 * 60, padding = 1000;
            var interval = setInterval(() => {
                seconds += dt;
                if (seconds <= totalUploadTime) {
                    this.uploadProgress = seconds / (totalUploadTime + padding) * 100;
                } else {
                    let decay = 1 / padding;
                    let totalDecay = 1 - Math.exp(-decay * (seconds - totalUploadTime));
                    this.uploadProgress = (totalUploadTime + padding * totalDecay) / (totalUploadTime + padding) * 100;
                }
            }, dt * 1000);
            new Promise((resolve) => setTimeout(resolve, 1000, "Done!")).then(() => {
                clearInterval(interval);
                this.uploadProgress = 100;
            });
        }
    },
    components: {
        Autocomplete: window["vuejs-autocomplete"]
    }
});