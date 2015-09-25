function template(templateElemId){
    var htmlSection = document.getElementById(templateElemId).innerHTML;
    var template = Handlebars.compile(htmlSection);

  function render(target, template, data){
    var content = document.getElementById(target);
    content.innerHTML = template(data);
  }

  var events = [];

  return {
    show : function (targetElemId, data) {
        try{
            render(targetElemId, template, data);
            events.forEach(function(event){

                document
                    .getElementById(event.id)
                    .addEventListener(event.type, event.evt);

            });
        }
        catch(err){
            alert(err);
        }
        
        return this;
    },
    on : function(){
      events.push({type : arguments[0], id : arguments[1], evt : arguments[2] })
      return this;
    }
  }
}
