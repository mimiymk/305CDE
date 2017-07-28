$(document).ready(function(){

    $("#r-submit").click(function(){
      var mylogin = $("#r-username").val();
      var mypassword = $("#r-pw1").val();
      var repassword = $("#r-pw2").val();
       alert (mylogin);
       alert (mypassword);
       
      if (mypassword==repassword) {
        alert ("right");
        //$("#htmlweb").html("hi");
        //$("#inputbox").val("bye");
        
      }else
        {
          alert ("false");
        }
     

      
    });
});