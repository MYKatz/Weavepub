var filechoose = document.getElementById("keychoose");

const arweave = Arweave.init({
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
});

var papersCachedLoaded = 0, papersCachedTotal = 0;
var myPapersLoaded = 0, myPapersTotal = 0;

const papersCached = (async function () {
    const txids = await arweave.arql({
        op: "equals",
        expr1: "Application-ID",
        expr2: "WeavePub-prod"
    });
    papersCachedTotal = txids.length + 1;
    papersCachedLoaded = 1;
    let out = [];
    for (let txid of txids) {
        out.push(await getTagsFromId(txid));
        papersCachedLoaded++;
    }
    return out;
})();

function doesPaperMatchSearch(paperTags, filters) {
    for (let filter in filters) {
        if (!filters.hasOwnProperty(filter)) continue;
        let queryWords = filters[filter].toLowerCase().split(/\s+/);
        let queryOn = filter === 'contents' ? (paperTags.title + '\n' + paperTags.abstract) : (paperTags[filter] || '');
        for (let word of queryWords) {
            if (queryOn.toLowerCase().indexOf(word) === -1) return false;
        }
    }
    return true;
}

async function searchPapers(filters) {
    // var out = [], papers = await papersCached;
    // for (let tags of papers) {
    //     for (let j = 0; j < types.length; j++) {
    //         console.log(types[j]);
    //         console.log(tags);
    //         if (tags[types[j]] && tags[types[j]].toLowerCase().indexOf(queries[j].toLowerCase()) !== -1) {
    //             out.push(tags);
    //             break;
    //         }
    //     }
    // }
    // console.log(out);
    let papers = await papersCached;
    return papers.filter(tags => doesPaperMatchSearch(tags, filters));
}

async function searchRecent() {
    let papers = await papersCached;
    let out = papers.slice();
    out.sort(compare);
    return out;
}

function compare(o1, o2) {
    if (o1.created && o2.created) {
        if (o1.created > o2.created) {
            return -1;
        }
        return 1;
    }
    return 0;
}

async function getMyPapers() {
    var wallet = JSON.parse(localStorage.wallet);
    var addr = await arweave.wallets.jwkToAddress(wallet);
    out = [];
    myPapersLoaded = myPapersTotal = 0;
    if (addr) {
        var txids = await arweave.arql({
            op: "and",
            expr1: {
                op: "equals",
                expr1: "from",
                expr2: addr
            },
            expr2: {
                op: "equals",
                expr1: "Application-ID",
                expr2: "WeavePub-prod"
            }
        });
        console.log(txids);
        myPapersTotal = txids.length + 1;
        myPapersLoaded = 1;
        for (var i = 0; i < txids.length; i++) {
            var tags = await getTagsFromId(txids[i]);
            out.push(tags);
            myPapersLoaded++;
        }
    } else {
        alert("You're not logged in!");
    }
    return out
}

async function processPaperFromId(txid) {
    var transaction = await arweave.transactions.get(txid);
    var tags = {};
    tags["owner"] = await arweave.wallets.ownerToAddress(transaction.owner);
    tags["txid"] = txid;
    transaction.get("tags").forEach((tag) => {
        let key = tag.get("name", { decode: true, string: true });
        let value = tag.get("value", { decode: true, string: true });
        tags[key] = value;
    });
    console.log(tags);
    return tags;
}

async function getTagsFromId(txid) {
    var owner = await fetch(`https://arweave.net/tx/${txid}/owner`);
    const response = await fetch(`https://arweave.net/tx/${txid}/tags`);
    var json = await response.json();
    var tags = {};
    var owner = await owner.text();
    tags["txid"] = txid;
    tags["owner"] = await arweave.wallets.ownerToAddress(owner);
    for (var i = 0; i < json.length; i++) {
        obj = json[i];
        tags[atob(obj.name)] = atob(obj.value);
    }
    return tags;
}


filechoose.onchange = function (e) {
    var filelist = filechoose.files;
    if (filelist) {
        login(filelist, function (ev) {
            try {
                wallet = JSON.parse(ev.target.result);

                arweave.wallets.jwkToAddress(wallet).then((address) => {
                    localStorage.setItem('wallet', JSON.stringify(wallet));
                    $("#exampleModal").modal("toggle");
                    location.reload();
                });
            } catch (err) {
                alert("Error logging in. Please try again.");
                alert(err);
                filechoose.value = "";
                success = false;
            } finally {
            }
        });
    }
};

function login(files, fileLoadCallback) {
    var reader = new FileReader();

    reader.onload = fileLoadCallback;

    reader.readAsText(files[0]);
}

async function uploadFile(title, abstract, authors, subject, filedata) {
    var wallet = JSON.parse(localStorage.wallet);
    let transaction = await arweave.createTransaction({
        data: filedata
    }, wallet);

    transaction.addTag("Application-ID", "WeavePub-prod");
    transaction.addTag('Content-Type', 'application/pdf');
    transaction.addTag("created", new Date().getTime());
    transaction.addTag("title", title);
    transaction.addTag("abstract", abstract);
    transaction.addTag("authors", authors);
    transaction.addTag("subject", subject);

    console.log(transaction);
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);

    console.log("resp: ", response);
    return response;
}

async function sendADonation(toaddr, amnt) {
    let key = JSON.parse(localStorage.wallet);
    let transaction = await arweave.createTransaction({
        target: toaddr,
        quantity: arweave.ar.arToWinston(amnt.toString())
    }, key);
    await arweave.transactions.sign(transaction, key);
    const response = await arweave.transactions.post(transaction);
    return response;
}

