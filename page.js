const input_group = '<label for="positive">Positives</label><input min=0 type="number"><label for="total">Population</label><input min=0 type="number"><label for="volume">Volume</label><input min=0 type="number"><a class="remove-link" onclick="remove_button(this);"><div class="remove-button"><h1 class="remove-text">x</h1></div></a>';

let add_input_group = () => {
    let ele = document.getElementById('input-list');
    let new_group = document.createElement('div');
    new_group.classList.add('input-list-item');
    new_group.innerHTML = input_group;
    ele.appendChild(new_group);
    onload();
}

let remove_button = (element) => {
    console.log(element);
    element.parentElement.remove();
}

let onload = () => {
    let container = document.getElementById('input-container');

    let title = document.getElementById('input-title');
    let submit = document.getElementById('submit-container');

    let list_height = container.offsetHeight - (140 + 75);

    let list = document.getElementById('input-list');
    list.style.height = list_height + "px";

    // center query text
    let submit_button = document.getElementById('submit-button');
    let submit_button_text = document.getElementById('submit-button-text');

    let submit_text_margin = (submit_button.offsetWidth-submit_button_text.offsetWidth)/2;
    submit_button_text.style.marginLeft = submit_text_margin + "px";

    // align addition button
    let add_button = document.getElementById('add-input-list-item-container');
    let add_button_margin = Math.floor((container.offsetWidth - add_button.offsetWidth) * .99);
    add_button.style.marginLeft = add_button_margin + 'px';

    //align remove button
    let remove_button_array = document.getElementsByClassName('remove-link');
    console.log(remove_button_array);
    if (remove_button_array != undefined) {
        for(var i = 0; i < remove_button_array.length; i++) {
            let remove_button = remove_button_array.item(i);
            let parent = remove_button.parentElement;
            let margin = (parent.offsetWidth - 20);
            remove_button.style.marginLeft = margin + "px";
        }
    }
    
}

let submit = () => {
    let input_groups = document.getElementsByClassName('input-list-item');
    let matrix = [];
    for(var i = 0; i < input_groups.length; i++) {
        let group = input_groups.item(i);
        let result = group.querySelectorAll('input');
        let pos = result[0].value;
        let pop = result[1].value;
        let dil = result[2].value;
        matrix.push([dil, pop, pos]);
    }
    onSubmit(matrix);
}

let setSolutions = (solution1, solution2) => {
    let title1 = document.getElementById('output-mpn');
    title1.innerHTML = solution1;

    let title2 = document.getElementById('output-mpn-con');
    title2.innerHTML = solution2;
}