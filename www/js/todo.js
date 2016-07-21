var todo = {};
var cart = {};
var wish = {}; 
/** Read the new task and add it to the list */
todo.add = function(event) {
    // Read the task from the input
    var task=$('input').val();
    if (task) {
        // Add the task to array and refresh list
        todo.list[todo.list.length] = task;
        todo.refresh_list();
        // Clear the input
        $('input').val('');
    }
    event.prevetodoefault();
};

/** Remove the task which was marked as selected */
todo.remove = function() {
    // Remove from array and refresh list
    var item = todo.list[todo.selected];
    todo.list.splice(todo.selected,1);
    todo.refresh_list();
    return item;
};

/** Recreate the entire list from the available list of tasks */
todo.refresh_list = function() {
    var $tasks = $('#task_list'), i;
    // Clear the existing task list
    $tasks.empty();
    if (todo.list.length) {
        // Add the header
        $tasks.append('<li data-role="list-divider">Items added so far</li>');
        for (var i=0;i<todo.list.length;i++){
            // Append each task
            var li = '<li><a data-rel="dialog" data-task="' + i
                    + '" href="#confirm">' + todo.list[i] + '</a></li>'
            $tasks.append(li);
        }
    }
    // Add the header for addition of new tasks
    $tasks.append('<li data-role="list-divider">Next item here</li>');
    // Use jQuery Mobile's listview method to refresh
    $tasks.listview('refresh');
    // Store back the list
    localStorage.todo_list = JSON.stringify(todo.list || []);
};

// Initialize the index page
$(document).delegate('#indexmaster','pageinit', function() {
    // If no list is already present, initialize it
    if (!localStorage.todo_list) {
        localStorage.todo_list = "[]";
    }
    

    // Load the list by parsing the JSON from localStorage
    todo.list = JSON.parse(localStorage.todo_list);
    
    $('#add').bind('vclick', todo.add);
    $('#task_list').on('vclick', 'li a', function() {
        todo.selected = $(this).data('task');
    });
    // Refresh the list everytime the page is reloaded
    $('#indexmaster').bind('pagebeforeshow', todo.refresh_list);
    
});

// Bind the 'Done' and 'Not Done' buttons to task removal
$(document).delegate('#confirm', 'pageinit', function(){
    $('.remove_task').bind('vclick', todo.remove);
    $('.cart_list').bind('vclick', cart.add);
    $('.wish_list').bind('vclick', wish.add);

});


// Make the transition in reverse for the buttons on the done and notdone pages
$(document).delegate('#done, #notdone', 'pageinit', function(){
    // We reverse transition for any button linking to indexmaster page
    $('[href="#indexmaster"]').attr('data-direction','reverse');
});

//cart 
cart.add = function(event) {
   item = todo.remove();
    // Read the task from the input
    var carttask=item;
    if (carttask) {
        // Add the task to array and refresh list
        cart.list[cart.list.length] = carttask;
        cart.refresh_list();
        // Clear the input
        
    }
    event.prevetodoefault();
};

/** Remove the task which was marked as selected */
cart.remove = function() {
    // Remove from array and refresh list
    
    cart.list.splice(cart.selected,1);
    cart.refresh_list();
};

/** Recreate the entire list from the available list of tasks */
cart.refresh_list = function() {
    var $carttasks = $('#carttask_list'), i;
    // Clear the existing task list
    $carttasks.empty();
    if (cart.list.length) {
        // Add the header
        $carttasks.append('<li data-role="list-divider">Items added so far</li>');
        for (var icart=0;icart<cart.list.length;icart++){
            // Append each task
            var licart = '<li><a data-rel="dialog" data-task="' + icart
                    + '" href="#confirmcart">' + cart.list[icart] + '</a></li>'
            $carttasks.append(licart);
        }
    }
    // Add the header for addition of new tasks
    $carttasks.append('<li data-role="list-divider">add an item from master or wishlist here</li>');
    // Use jQuery Mobile's listview method to refresh
    $carttasks.listview('refresh');
    // Store back the list
    localStorage.cart_list = JSON.stringify(cart.list || []);
};

// Initialize the index page
$(document).delegate('#indexcart','pageinit', function() {
    // If no list is already present, initialize it
    if (!localStorage.cart_list) {
        localStorage.cart_list = "[]";
    }
    // Load the list by parsing the JSON from localStorage
    cart.list = JSON.parse(localStorage.cart_list);
    //$('#add').bind('vclick', todo.add);
    $('#carttask_list').on('vclick', 'li a', function() {
        cart.selected = $(this).data('carttask');
    });
    // Refresh the list everytime the page is reloaded
    $('#indexcart').bind('pagebeforeshow', cart.refresh_list);
});

// Bind the 'Done' and 'Not Done' buttons to task removal
$(document).delegate('#confirmcart', 'pageinit', function(){
    $('.remove_carttask').bind('vclick', cart.remove);
    //$('.cart_list').bind('vclick', cart.add);
    //$('.wish_list').bind('vclick', wish.add);

});


// Make the transition in reverse for the buttons on the done and notdone pages
$(document).delegate('#donecart, #notdonecart', 'pageinit', function(){
    // We reverse transition for any button linking to index page
    $('[href="#indexcart"]').attr('data-direction','reverse');
});
//wishlist

wish.add = function(event) {
    
   item = todo.remove();
    // Read the task from the input
    var wishtask=item;
    if (wishtask) {
        // Add the task to array and refresh list
        wish.list[wish.list.length] = wishtask;
        wish.refresh_list();
        // Clear the input
    }
    event.prevetodoefault();
};

/** Remove the task which was marked as selected */
wish.remove = function() {
    // Remove from array and refresh list
    
    wish.list.splice(wish.selected,1);
    wish.refresh_list();
};

/** Recreate the entire list from the available list of tasks */
wish.refresh_list = function() {
    var $wishtasks = $('#wishtask_list'), i;
    // Clear the existing task list
    $wishtasks.empty();
    if (wish.list.length) {
        // Add the header
        $wishtasks.append('<li data-role="list-divider">Items added so far</li>');
        for (var iwish=0;iwish<wish.list.length;iwish++){
            // Append each task
            var liwish = '<li><a data-rel="dialog" data-task="' + iwish
                    + '" href="#confirmwish">' + wish.list[iwish] + '</a></li>'
            $wishtasks.append(liwish);
        }
    }
    // Add the header for addition of new tasks
    $wishtasks.append('<li data-role="list-divider">add an item from master or wishlist here</li>');
    // Use jQuery Mobile's listview method to refresh
    $wishtasks.listview('refresh');
    // Store back the list
    localStorage.wish_list = JSON.stringify(wish.list || []);
};

// Initialize the index page
$(document).delegate('#indexwish','pageinit', function() {
    // If no list is already present, initialize it
    if (!localStorage.wish_list) {
        localStorage.wish_list = "[]";
    }
    // Load the list by parsing the JSON from localStorage
    wish.list = JSON.parse(localStorage.wish_list);
    //$('#add').bind('vclick', todo.add);
    $('#wishtask_list').on('vclick', 'li a', function() {
        wish.selected = $(this).data('wishtask');
    });
    // Refresh the list everytime the page is reloaded
    $('#indexwish').bind('pagebeforeshow', wish.refresh_list);
});

// Bind the 'Done' and 'Not Done' buttons to task removal
$(document).delegate('#confirmwish', 'pageinit', function(){
    $('.remove_wishtask').bind('vclick', wish.remove);
    //$('.cart_list').bind('vclick', cart.add);
    //$('.wish_list').bind('vclick', wish.add);

});


// Make the transition in reverse for the buttons on the done and notdone pages
$(document).delegate('#donewish, #notdonewish', 'pageinit', function(){
    // We reverse transition for any button linking to index page
    $('[href="#indexwish"]').attr('data-direction','reverse');
});
$(document).delegate('#index','pageinit', function() {

    // If no list is already present, initialize it
    if (!localStorage.todo_list) {
        localStorage.todo_list = "[]";
    }
    if (!localStorage.wish_list) {
        localStorage.wish_list = "[]";
    }
    if (!localStorage.cart_list) {
        localStorage.cart_list = "[]";
    }

    // Load the list by parsing the JSON from localStorage
    todo.list = JSON.parse(localStorage.todo_list);
    cart.list = JSON.parse(localStorage.cart_list);
    wish.list = JSON.parse(localStorage.wish_list);
    $('#task_list').on('vclick', 'li a', function() {
        todo.selected = $(this).data('task');
    });
    // Refresh the list everytime the page is reloaded
    $('#indexmaster').bind('pagebeforeshow', todo.refresh_list);
    $('#wishtask_list').on('vclick', 'li a', function() {
        wish.selected = $(this).data('wishtask');
    });
    // Refresh the list everytime the page is reloaded
    $('#indexwish').bind('pagebeforeshow', wish.refresh_list);
     $('#carttask_list').on('vclick', 'li a', function() {
        cart.selected = $(this).data('carttask');
    });
    // Refresh the list everytime the page is reloaded
    $('#indexcart').bind('pagebeforeshow', cart.refresh_list);


});

