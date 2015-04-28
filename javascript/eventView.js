/*jslint node: true, browser: true */
"use strict";

function eventView() {
    var addMouseAndTouchUp = function (elementID, handler) {
            //utility function to add both mouseup and touchend events and prevent double events
            var element = document.getElementById(elementID),
                f = function (e) {
                    e.preventDefault();//stops mobile browsers faking the mouse events after touch events
                    handler(e);
                    return false;
                };
            element.addEventListener("mouseup", f, false);
            element.addEventListener("touchend", f, false);
        };
        
        this.showForm = function () {
            document.getElementById("formHolder").style.display = "block";
        };
        this.hideForm = function () {
            document.getElementById("formHolder").style.display = "none";
        };


        this.setButtonAction = function (button, callback) {
        //Generic method for using the local method AddMouseAndTouchUp to assigning the given call back 
        //as an eventlisteners to the given parameters
            addMouseAndTouchUp(button, callback);
        };
        
        this.init = function () {
    };
    
    this.addNewPost = function (name, description, date, time, location) {
        var eventHolder = document.getElementById("eventsHolder"),
            node = document.createElement("DIV"),
            node1 = document.createElement("DIV"),
            node2 = document.createElement("DIV"),
            node3 = document.createElement("DIV"),
            node4 = document.createElement("DIV"),
            node5 = document.createElement("DIV"),
            
            nnode = document.createTextNode(name),
            dnode = document.createTextNode(description),
            datenode = document.createTextNode(date),
            tnode = document.createTextNode(time),
            lnode = document.createTextNode(location);
            
            node.className = "eventPostDiv";
            node1.className = "eventPostName";
            node2.className = "eventPostDescr";
            node3.className = "eventPostTime";
            node4.className = "eventPostTime";
            node5.className = "eventPostLocation";
            
            node1.appendChild(nnode);
            node.appendChild(node1);
            node2.appendChild(dnode);
            node.appendChild(node2);
            node3.appendChild(datenode);
            node.appendChild(node3);
            node4.appendChild(tnode);
            node.appendChild(node4);
            node5.appendChild(lnode);
            node.appendChild(node5);
            eventHolder.appendChild(node);
            node.scrollIntoView();
    };

    this.setPostHandler = function (callback) {
        document.getElementById("eventform").addEventListener("submit", function (evt) {
            var name = document.getElementById("ename").value;
            document.getElementById("ename").value = "";
            var description = document.getElementById("edescription").value;
            document.getElementById("edescription").value = "";
            var date = document.getElementById("edate").value;
            document.getElementById("edate").value = "";
            var time = document.getElementById("etime").value;
            document.getElementById("etime").value = "";
            var location = document.getElementById("elocation").value;
            document.getElementById("elocation").value = "";
            evt.preventDefault();
            callback(name, description, date, time, location);
        });
    };

}