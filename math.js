single_mpn = function(set) {
    console.log(set);
    tjmj = set[0] * set[1];
    tggtmj = (set[1] - set[2]) * set[0];
    return (
        (1 / set[2]) * 2.303 * Math.log10((tjmj / tggtmj))
    )
}

multi_mpn = function(Raw, Filtered) {
    var gj = 0; // denotes the number of positive tubes in selected dilutions
    var tjgj = 0; // denotes the grams of sample in all tubes in the selected dilutions
    var tjgjmj = 0; // denotes the grams of sample in all negative tubes in the selected dilutions
    var tjmj = 0;

    // arr[0] : sample volume : .1 grams
    // arr[1] : sample population : 3 tubes
    // arr[2] : positive samples : 1 positive


    Filtered.forEach(function(arr) {
        gj += arr[2];
        tjgj += (arr[1] - (arr[2] / 2)) * -arr[0];
        tjgjmj += (arr[1] - arr[2]) * arr[0];
        tjmj += (arr[0] * arr[1]);
    });

    console.log({ gj, tjgj, tjgjmj, tjmj });

    var lower = gj / (tjgj + tjgjmj);

    var mpng = gj / Math.pow(tjmj * tjgjmj, .5);

    gj = 0;
    tjgjmj = 0;

    Raw.forEach(function(arr) {
        gj += parseInt(arr[2]);
        tjgjmj += (parseInt(arr[1]) - parseInt(arr[2])) * parseFloat(arr[0]);
    });

    var upper = gj / tjgjmj;

    console.log(lower.toExponential(3) + " < lambda < " + upper.toExponential(3));
    setSolutions(mpng.toExponential(3) + " MPN/g", lower.toExponential(3) + " < &lambda; < " + upper.toExponential(3));
}


// [Grams, Total, Positive]

qualify = function(groups) {
    fi = [];
    f = [];

    for (var x = 0; x < groups.length; x++) {
        if (groups[x][2] == 0 || groups[x][2] == groups[x][1]) {
            fi.push(x);
        }
    }

    for (var z = 0; z < groups.length; z++) {
        if (!fi.includes(z)) {
            let result = groups[z].map(function(x) {
                return parseFloat(x, 10);
            });
            f.push(result);
        }
    }

    return f;
}

onSubmit = (matrix) => {

    for (let x = 0; x < matrix.length; x++) {

        matrix[x] = [parseFloat(matrix[x][0]), parseInt(matrix[x][1]), parseInt(matrix[x][2])];
    }

    console.log("Raw Matrix", matrix);
    let f = qualify(matrix);
    console.log("filtered", f);
    console.log(multi_mpn(matrix, f));
}

console.log("Version 1.2")