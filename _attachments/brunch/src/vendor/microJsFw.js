/** returns the element with the given id */
function id(_id){
    return document.getElementById(_id);
};
/** adds an eventlistener to the given element */
function event(name,elem,func){
    elem.addEventListener(name,func,false);
};
/** click on desktop and touchend on supported mobile*/
function action(elem,func){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.indexOf("iphone") != -1 || ua.indexOf("ipod") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("android") != -1)
        event("touchend",elem,func);
    else
        event("click",elem,func);
};
/** sets the inner html of the given element */
function html(elem,html){
    elem.innerHTML = html;
};
function hide(elem){
	elem.style.display = "none";
};
function show(elem){
	elem.style.display = "block";
};
/** do something over all the elements in the collection*/
function each(collection,func){
    for (var i=0; i < collection.length; i++)
        func(collection[i],i);
};
/** calls the function for each child elem with elem and index as params*/
function eachChildTag(elem,tagName,func){
    each(elem.getElementsByTagName(tagName),func);
};