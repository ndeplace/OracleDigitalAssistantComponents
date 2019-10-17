
/*
    Version 1.0.1
    Before running this example, install necessary dependencies by running:
    npm install http-signature jssha
*/

var fs = require('fs');
var https = require('https');
var os = require('os');
var httpSignature = require('http-signature');
var jsSHA = require("jssha");


// TODO: update these values to your own
var tenancyId = "ocid1.tenancy.oc1..aaaaaaaa2jvfyfoc6c4fzxayx4tnisw4tgdmualsijeglyul4llarzkq2zna";
var authUserId = "ocid1.user.oc1..aaaaaaaa4jfu7xbqxlx4pwwa2kbz5fjmoy2n5ayopr2c7yrzmjgj735knkaq";
var keyFingerprint = "04:fc:2c:e8:ec:05:53:74:b5:bc:ef:1f:2f:21:9a:4c";
var privateKeyPath = "~/.oci/oci_api_key.pem";


var identityDomain = "identity.us-ashburn-1.oraclecloud.com";
var coreServicesDomain = "iaas.eu-frankfurt-1.oraclecloud.com";


if(privateKeyPath.indexOf("~/") === 0) {
    privateKeyPath = privateKeyPath.replace("~", os.homedir())
}
var privateKey = fs.readFileSync(privateKeyPath, 'ascii');


// signing function as described at https://docs.cloud.oracle.com/Content/API/Concepts/signingrequests.htm
				function sign(request, options) {

    var apiKeyId = options.tenancyId + "/" + options.userId + "/" + options.keyFingerprint;

    var headersToSign = [
        "host",
        "date",
        "(request-target)"
    ];

    var methodsThatRequireExtraHeaders = ["POST", "PUT"];

    if(methodsThatRequireExtraHeaders.indexOf(request.method.toUpperCase()) !== -1) {
        options.body = options.body || "";

        var shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(options.body);

        request.setHeader("Content-Length", options.body.length);
        request.setHeader("x-content-sha256", shaObj.getHash('B64'));

        headersToSign = headersToSign.concat([
            "content-type",
            "content-length",
            "x-content-sha256"
        ]);
    }

    httpSignature.sign(request, {
        key: options.privateKey,
        keyId: apiKeyId,
        headers: headersToSign
    });

    var newAuthHeaderValue = request.getHeader("Authorization").replace("Signature ", "Signature version=\"1\",");
    request.setHeader("Authorization", newAuthHeaderValue);
}

// generates a function to handle the https.request response object
function handleRequest(callback) {

    return function(response) {
        var responseBody = "";

        response.on('data', function(chunk) {
        responseBody += chunk;
    });

        response.on('end', function() {
            callback(JSON.parse(responseBody));
        });
    }
}

// gets the user with the specified id
function getUser(userId, callback) {

    var options = {
        host: identityDomain,
        path: "/20160918/users/" + encodeURIComponent(userId),
    };

    var request = https.request(options, handleRequest(callback));

    sign(request, {
        privateKey: privateKey,
        keyFingerprint: keyFingerprint,
        tenancyId: tenancyId,
        userId: authUserId
    });

    request.end();
};

// creates a Oracle Cloud Infrastructure VCN in the specified compartment
function createVCN(compartmentId, displayName, cidrBlock, callback) {
    
    var body = JSON.stringify({
        compartmentId: compartmentId,
        displayName: displayName,
        cidrBlock: cidrBlock
    });

    var options = {
        host: coreServicesDomain,
        path: '/20160918/vcns',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    };

    var request = https.request(options, handleRequest(callback));

    sign(request, {
        body: body,
        privateKey: privateKey,
        keyFingerprint: keyFingerprint,
        tenancyId: tenancyId,
        userId: authUserId
    });

    request.end(body);
};


// creates a Oracle Cloud Infrastructure VCN in the specified compartment
function listInstances(compartmentId, displayName, cidrBlock, callback) {
    
    var body = JSON.stringify({
        compartmentId: compartmentId
    });

    var options = {
        host: coreServicesDomain,
        path: '/20160918/compartments',
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    };

    var request = https.request(options, handleRequest(callback));

    sign(request, {
        body: body,
        privateKey: privateKey,
        keyFingerprint: keyFingerprint,
        tenancyId: tenancyId,
        userId: authUserId
    });

    request.end(body);
};



// test the above functions
console.log("GET USER:");

getUser(authUserId, function(data) {
    console.log(data);
        
    console.log("\nLIST CONTAINERS");

    // TODO: replace this with a compartment you have access to
    var compartmentIdToCreateVcnIn = tenancyId;

    // createVCN(compartmentIdToCreateVcnIn, "Test-VCN", "10.1.0.0/16", function(data) {
    //     console.log(data);
    // });

    listInstances("ocid1.tenancy.oc1..aaaaaaaa2jvfyfoc6c4fzxayx4tnisw4tgdmualsijeglyul4llarzkq2zna", "Test-VCN", "10.1.0.0/16", function(data) {
            console.log(data);
         });
});