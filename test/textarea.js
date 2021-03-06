$(function () {         
  
   $.support.transition = false;
   var fx = $('#async-fixture'),
       v1 = 'abb&c"',
       v2 = "a!b<b>'c";
    
   module("textarea")
      
     test("textarea should contain '' if element is empty", function () {
        var e = $('<a href="#" data-type="textarea"></a>').appendTo('#qunit-fixture').editable()
        e.click()
        var p = e.data('popover').$tip;
        ok(p.find('textarea').length, 'textarea exists')
        ok(p.find('.editable-popover-textarea').length, 'class editable-popover-textarea exists')
        ok(!p.find('textarea').val().length, 'textrea is empty')        
        p.find('button[type=button]').click(); 
        ok(!p.is(':visible'), 'popover was removed')         
      })
     
     asyncTest("should load correct value and save new entered text (and value)", function () {
        var e = $('<a href="#" data-pk="1" data-url="post.php">'+v1+'</a>').appendTo(fx).editable({
             type: 'textarea',
             send: 'ifpk',
             success: function(data) {
                 return false;
             } 
          });

        e.click()
        var p = e.data('popover').$tip;
        ok(p.is(':visible'), 'popover visible');
        ok(p.find('textarea').length, 'textarea exists');
        ok(p.find('.editable-popover-textarea').length, 'class editable-popover-textarea exists');
        equal(p.find('textarea').val(), e.data('editable').value, 'textrea val equal text');         
        
        p.find('textarea').val(v2);
        p.find('form').submit(); 
        
        setTimeout(function() {
           ok(!p.is(':visible'), 'popover closed')
           equal(e.data('editable').value, v2, 'new text saved to value')
           equal(e.text().toLowerCase(), v2.toLowerCase(), 'new text shown') 
           e.remove();    
           start();  
        }, timeout);                       
      })            
  
     asyncTest("should replace <br> with newline (on show) and back (on save)", function () {
        var  v = '12<br>3&lt;i&gt;4<br />56',
             e = $('<a href="#" data-type="textarea" data-pk="1" data-url="post.php">'+v+'</a>').appendTo(fx).editable(),
             v1 = '12\n3<i>4\n56',
             vnew = "12\n3<b>4\n56\n\n78",
             vnew2 = "12<br>3&lt;b&gt;4<br>56<br><br>78";

        equal(e.data('editable').value, v1, '<br> replaced with new lines');               
             
        e.click();
        var p = e.data('popover').$tip;
        equal(p.find('textarea').val(), e.data('editable').value, 'textarea contains correct value');

        p.find('textarea').val(vnew)
        p.find('form').submit(); 
        
        setTimeout(function() {
           ok(!p.is(':visible'), 'popover closed')
           equal(e.data('editable').value, vnew, 'new text saved to value')
           equal(e.html().toLowerCase(), vnew2.toLowerCase(), 'new text shown') 
           e.remove();    
           start();  
        }, timeout);           
    })                     
   
})