$( document ).ready(function() {

    var time = new Date();
    
    var currTime = moment(time).format('ddd, MMM Mo, h:mmA');
    $('#currTime').text(currTime)
    
    var events = JSON.parse(localStorage.getItem("events"));
    if (events == null) {
        events = []
        for (var i = 0; i < 24; i++){
            events.push('');
        }
    }

    var currHour = moment(time).format('H');

    // currHour = parseInt(currHour)

    // create callendar elements
    for (var i = 9; i < 18; i++){
        var rowDiv = $('<div>');
        rowDiv.addClass('row rowContainer');
        
        //create first column
        var col1 = $('<div>');
        
        //display hour choose am or pm
        if (i < 12) {
            if (i == 0) {
                col1.text('12 am');
            }
            else {
                col1.text(i + ' am');
            }
        }
        else {
            if (i == 12) {
                col1.text('12 pm');

            }
            else {
                col1.text(i - 12 + ' pm');
            }
        }

        col1.addClass('col-2 d-flex justify-content-center align-items-center col1');

        
        //create middle column
        var col2 = $('<textarea>');
        col2.attr('id','input' + (i + 1));
        col2.addClass('col-8 eventInput');
        
        //change background of middle column
        if (i < currHour) {
            col2.addClass('background-gray');
        }
        else if (i == currHour)  {
            col2.addClass('background-red');
        }
        else {
            col2.addClass('background-green');
        }

        col2.val(events[i])


        //create last column
        var col3 = $('<button>')
        col3.addClass('col-2 fa fa-lock saveButton');
        col3.attr('data-time',i + 1);

        rowDiv.append(col1,col2,col3);

        $('.callendarContainer').append(rowDiv);
    }
    
    $('.saveButton').on('click',function(){
        var hour = $(this).attr('data-time');
        
        var task = $('#input' + hour).val();

        events[hour - 1] = task;
        localStorage.setItem("events",JSON.stringify(events))
    })
});



