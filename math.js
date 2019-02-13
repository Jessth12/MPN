single_mpn = function(set) {
    console.log(set);
    tjmj = set[0] * set[1];
    tggtmj = (set[1] - set[2]) * set[0];
    return (
        (1 / set[2]) * 2.303 * Math.log10((tjmj/tggtmj))
    )
}

multi_mpn = function(Raw, Filtered) {
    var gj = 0;
    var tjgj = 0;
    var tjgjmj = 0;
    var tjmj = 0;
    Filtered.forEach(function(arr){
        gj += arr[2];
        tjgj += (arr[1] - (arr[2]/2))*arr[0];
        tjgjmj += (arr[1] - arr[2]) * arr[0];
        tjmj += (arr[0] * arr[1]);
    });
    var lower = gj / (tjgj + tjgjmj);

    var mpng = gj / Math.pow(tjmj * tjgjmj, .5);

    gj = 0;
    tjgjmj = 0;
    Raw.forEach(function(arr){
        gj += arr[2];
        tjgjmj += (arr[1] - arr[2]) * arr[0];
    });

    var upper = gj / tjgjmj;

    console.log(lower.toExponential(3) + " < lambda < " + upper.toExponential(3));
    setSolutions(mpng.toExponential(3) + " MPN/g", lower.toExponential(3) + " < &lambda; < " + upper.toExponential(3));
}


// [Grams, Total, Positive]

qualify = function(groups) {
    fi = [];
    f = [];

    if (groups.length <= 3) 
        return groups;
    
    for (var x = 0; x < groups.length; x++) {
        if (groups[x][2] == 0 || groups[x][2] == groups[x][1]) {
            fi.push(x);
        } else {
            break;
        }
    }

    for (var y = groups.length-1; y > 0; y--) {
        if (groups[y][2] == 0 || groups[y][2] == groups[y][1]) {
            fi.push(y);
        } else {
            break;
        }
    }

    for (var z = 0; z < groups.length; z++){
        if (!fi.includes(z)) f.push(groups[z])
    }

    console.log(f);

    return f;
}

onSubmit = (matrix) => {
    console.log(matrix);
    let f = qualify(matrix);
    console.log(multi_mpn(matrix, f));
}