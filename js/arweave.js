var filechoose = document.getElementById("keychoose");

const arweave = Arweave.init({
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
});

async function searchPapers(types, querys) {
    const txids = await arweave.arql({
        op: "equals",
        expr1: "Application-ID",
        expr2: "WeavePub"
    });

    out = [];
    for (var i = 0; i < txids.length; i++) {
        var tags = processPasteFromId(txids[0]);
        for (var j = 0; j < types.length; j++) {
            if (tags[type].indexOf(query) != -1) {
                //valid! do something here
            }
        }
    }
}

async function searchRecent() {
    const txids = await arweave.arql({
        op: "equals",
        expr1: "Application-ID",
        expr2: "WeavePub"
    });
    return txids;
    out = [];
    for (var i = 0; i < txids.length; i++) {
        var tags = processPasteFromId(txids[0]);
        out.push(tags);
    }
    return tags;
}

async function getMyPapers() {
    var wallet = JSON.parse(localStorage.wallet)
    var addr = await arweave.wallets.jwkToAddress(wallet);
    out = []
    if (addr) {
        const txids = await arweave.arql({
            op: "and",
            expr1: {
                op: "equals",
                expr1: "from",
                expr2: addr
            },
            expr2: {
                op: "equals",
                expr1: "Application-ID",
                expr2: "WeavePub"
            }
        });
        for (var i = 0; i < txids.length; i++) {
            var tags = processPasteFromId(txids[0]);
            out.push(tags);
        }
    }
}

async function processPaperFromId(txid) {
    const arweave = Arweave.init({
        host: 'arweave.net',// Hostname or IP address for a Arweave host
        port: 443,          // Port
        protocol: 'https',  // Network protocol http or https
        timeout: 20000,     // Network request timeouts in milliseconds
        logging: false,     // Enable network request logging
    });
    var transaction = await arweave.transactions.get(txid);
    var tags = {};
    tags["owner"] = await arweave.wallets.ownerToAddress(transaction.owner);
    transaction.get("tags").forEach((tag) => {
        let key = tag.get("name", { decode: true, string: true });
        let value = tag.get("value", { decode: true, string: true });
        tags[key] = value;
    });
    console.log(tags);
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

async function uploadFile(title, abstract, subject, filedata) {
    var wallet = JSON.parse(localStorage.wallet);
    let transaction = await arweave.createTransaction({
        data: filedata
    }, wallet);

    transaction.addTag("Application-ID", "WeavePub");
    transaction.addTag("created", new Date().getTime());
    transaction.addTag("title", title);
    transaction.addTag("abstract", abstract);
    transaction.addTag("subject", subject);

    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);

    console.log("resp: ", response);
    return response;
}

