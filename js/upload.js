Vue.component('UploadForm', {
    template: `
    <div class="container-fluid" style="background: #F9FAFC">
    <div class="container">
        <form class="upload-paper" @keydown.enter.capture.prevent @submit.prevent="submitForm">
            <h3>Title</h3>
            <input v-model="title" required class="paper-title" type="text"/><br />
            <hr/>
            <h3>Abstract</h3>
            <textarea v-model="abstract" required/><br/>
            <hr />
            <h3>Authors</h3>
            <textarea v-model="authors" required/><br/>
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
                Successfully uploaded! Your file will be included in the next block (may take ~10 mins). Click to go back home
            </button>
            <button v-if="uploadProgress < 0" class="btn btn-danger">
                Upload failed. Click to retry.
            </button>
            </div>
        </form>
    </div>
    </div>
    `,
    data: function () {
        return {
            title: '',
            abstract: '',
            authors: '',
            subject: { display: '' },
            allSubjects: [
                { id: 1, name: 'Mathematics' },
                { id: 2, name: 'Physics' },
                { id: 3, name: 'Biology' },
                { id: 4, name: 'Anthropology' },
                { id: 5, name: 'Art History' },
                { id: 6, name: 'Computer Science' },
                { id: 7, name: 'Economics' },
                { id: 8, name: 'Chemistry' },
                { id: 9, name: 'Psychology' },
                { id: 10, name: 'Other' },
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
        submitForm: async function () {
            if (!localStorage.wallet) {
                alert("You're not logged in! Please return home and try again.");
            }
            console.log("Uploading stuff with title", this.title, "abstract", this.abstract, "subject", this.subject.selectedObject.name, "and file", this.$refs.pdfUpload.files[0]);
            var subject = this.subject.selectedObject.name;
            var title = this.title;
            var abstract = this.abstract;
            var authors = this.authors;
            var _this = this;

            const reader = new FileReader();
            reader.onload = async function () {
                const file_data = reader.result;
                //send arweave transaction
                await uploadFile(title, abstract, authors, subject, file_data);
                alert("successfully uploaded - it may take a few minutes for your paper to be accepted into the blockchain.")
                location.reload();
                this.uploadProgress = 101;/*  */
                /* var seconds = 0, dt = 1, totalUploadTime = 15 * 60, padding = 1000;
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
                }); */
            }
            reader.readAsDataURL(this.$refs.pdfUpload.files[0]);

        }
    },
    components: {
        Autocomplete: window["vuejs-autocomplete"]
    }
});