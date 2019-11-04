var filechoose = document.getElementById("keychoose");


async function searchPapers(type, query) {
    const txids = await arweave.arql({
        op: "equals",
        expr1: "Application-ID",
        expr2: "WeavePub"
    });

    for (var i = 0; i < txids.length; i++) {
        var tags = processPasteFromId(txids[0]);
        if (tags[type].indexOf(query) != -1) {
            //valid! do something here
        }
    }
}

async function processPasteFromId(txid) {
    var transaction = await arweave.transactions.get(txid);
    var tags = {};
    transaction.get("tags").forEach((tag) => {
        let key = tag.get("name", { decode: true, string: true });
        let value = tag.get("value", { decode: true, string: true });
        tags[key] = value;
    });
    return tags;
}

filechoose.onchange = function (e) {
    var filelist = filechoose.files;
    if (filelist) {
        login(filelist, function (ev) {
            try {
                wallet = JSON.parse(ev.target.result);

                arweave.wallets.jwkToAddress(wallet).then((address) => {
                    //do something with the state here
                });
            } catch (err) {
                alert("Error logging in. Please try again.");
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