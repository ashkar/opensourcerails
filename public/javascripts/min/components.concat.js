
// handle screenshot add form
$j(document).ready(function() {
  if($j("#hosted_instances_add").notOnPage()){return;}

  $j("#hosted_instances_add form").submit(function() {
    var isSuccess = true;

    // reset errors
    $j("#hosted_instances_add .field").removeClass("withErrors");
    
    // Do some validation the long way. I really should be using a validation plugin or something
    if($j("#hosted_instances_add #hosted_instance_title").val() == "")
    {
      isSuccess = false;
      $j("#hosted_instances_add #hosted_instance_title").parents(".field").addClass("withErrors");
    }
    if($j("#hosted_instances_add #hosted_instance_url").val() == "")
    {
      isSuccess = false;
      $j("#hosted_instances_add #hosted_instance_url").parents(".field").addClass("withErrors");
    }
    if($j("#hosted_instances_add #hosted_instance_antispam").val() == "")
    {
      isSuccess = false;
      $j("#hosted_instances_add #hosted_instance_antispam").parents(".field").addClass("withErrors");
    }

    // see if we should allow the form to submit
    if(isSuccess)
    {
      $j(this).find(".progress").show();
      return true;
    }
    else
    {
      return false;
    }    
  });
});
$j(document).ready(function() {
  if($j("#project_grid").notOnPage()){return;}
  
  // hook up ajax paging
  $j("#project_grid .pagination a").livequery('click', function() {
    $j("#project_grid").load($j(this).attr("href")+"&ajax=true");    
    return false;
  });
  
  // wire up our ajax progress (just hides and shows .progress)
  $j.ajaxSetup({
    beforeSend: function() {
      $j("#project_grid .loading").show();
    },
    complete: function() {
      $j("#project_grid .loading").hide();
    }
  });  
  
  // Allow ESC to show debug information
  shortcut.add("LEFT",function() {
    $j("#project_grid .pagination *:first-child").click();
  });
  shortcut.add("RIGHT",function() {
    $j("#project_grid .pagination *:last-child").click();
  });

  // Set tooltips
  $j("#project_grid .pagination *:first-child").attr("title", "Shortcut: LEFT ARROW");
  $j("#project_grid .pagination *:last-child").attr("title", "Shortcut: RIGHT ARROW");
  
});$j(document).ready(function() {
  $j('#project_details .cancel').livequery("click", function(){
    $j(this).parents(".form-container").slideUp('slow');
    $j("#project_info .display").slideDown('slow');
    $j("#project_info .edit").fadeIn()
    return false;
  });
  
  // wire up ajax links
  $j('#project_info .edit').livequery("click", function(){
    $this = $j(this);

    $j("#project_info .display").slideUp('slow')
    $j("#project_info .form-container").load($this.attr("href")+"?format=js", null, function() {
      $j(this).slideDown('slow');
    });
    $this.fadeOut();
    return false;
  });

  // wire up ajax links
  $j('#project_info .restore').livequery("click", function(){
    $this = $j(this);
    $reload = $this.parents(".reload");

    var reload_url = $this.attr("href");
    $reload.find("#project_details").slideUp('slow', function() {
      $reload.empty();
      $reload.load(reload_url, null, function() {
        $j("#project_details").slideDown('slow');        
      });
    })
    return false;
  });

  
});
// screenshots
$j(document).ready(function() {
  if($j("#screenshots").notOnPage()){return;}

  $j("#screenshots .screenshot").hover(function() {
    $j(this).find(".delete").show();
  }, function() {
    $j(this).find(".delete").hide();
  });

  // handle screenshot clicks
  $j("#screenshots .screenshot a.show-screen").click(function() {
    $this = $j(this);
    
    // start the progress indicator
    $j(".image-loading").show();
    
    $j("#current_screenshot").fadeOut();

    // replace the view photo link
    $j("#current_screenshot_link").attr("href", $this.attr("href"));

    // set up the switch screenshot action
    $j("#current_screenshot_switch").show()
      .find("a")
      .attr("href", $this.parent().find("a.switch-default").attr("href"));
    
    var img = new Image();
    $j(img)
      .load(function() {
        $j(this).hide();
        $j("#current_screenshot").replaceWith(this);
        
        $j(this).attr("id", "current_screenshot");
        
        // start the progress indicator
        $j(".image-loading").hide();
        $j("#current_screenshot").fadeIn();
        
      })
      .attr("src", $this.attr("href"));
      
    
    return false;
  });
  
});

// handle screenshot add form
$j(document).ready(function() {
  if($j("#screenshots_add").notOnPage()){return;}

  $j("#screenshots_add form").submit(function() {
    $j(this).find(".progress").show();
  });
});

// handle screenshot add form
$j(document).ready(function() {
  if($j("#versions_add").notOnPage()){return;}

  $j("#versions_add form").submit(function() {
    var isSuccess = true;

    // reset errors
    $j("#versions_add .field").removeClass("withErrors");
    
    // Do some validation the long way. I really should be using a validation plugin or something
    if($j("#versions_add #version_title").val() == "")
    {
      isSuccess = false;
      $j("#versions_add #version_title").parents(".field").addClass("withErrors");
    }

    // see if we should allow the form to submit
    if(isSuccess)
    {
      $j(this).find(".progress").show();
      return true;
    }
    else
    {
      return false;
    }    
  });
});
